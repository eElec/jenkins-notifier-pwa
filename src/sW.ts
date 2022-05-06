import { registerSW } from 'virtual:pwa-register';

export default function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		registerSW({
			onRegistered: (reg) => {
				if (reg === undefined) return;
				var serviceWorker;
				if (reg.installing) {
					serviceWorker = reg.installing;
				} else if (reg.waiting) {
					serviceWorker = reg.waiting;
				} else if (reg.active) {
					serviceWorker = reg.active;
				}

				if (serviceWorker) {
					if (serviceWorker.state == 'activated') {
						subscribe(reg);
					} else {
						serviceWorker.addEventListener('statechange', async function (e) {
							if ((<ServiceWorker>e.target)?.state == 'activated') {
								subscribe(reg);
							}
						});
					}
				}
			},
		});
	}
}

const subscribe = async (reg: ServiceWorkerRegistration) => {
	const { VITE_PUSH_SERVER, VITE_APPLICATION_KEY } = import.meta.env;

	const subscription = await reg?.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: VITE_APPLICATION_KEY,
	});
	if (subscription === undefined) return;

	try {
		await fetch(`${VITE_PUSH_SERVER}/jenkins/subscribe`, {
			method: 'POST',
			body: JSON.stringify({
				subscription,
				interval: parseInt(localStorage.getItem('interval') ?? '60000', 10),
			}),
			headers: {
				'content-type': 'application/json',
			},
		});
	} catch (err) {
		// Unsubscribe if api fails
		console.warn('⚠ Push Subscription Failed');
		subscription.unsubscribe();
	}
};
