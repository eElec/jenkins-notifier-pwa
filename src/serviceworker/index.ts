/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/// <reference lib="WebWorker" />
import db, { Job } from '../db';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

import { IJob, IJobResponse } from '../db/types';

declare let self: ServiceWorkerGlobalScope;

console.log('😀');

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

let timer: NodeJS.Timer | null = null;
// TODO: Sync interval with UI
let interval = 60000;

self.registration.pushManager.getSubscription().then((sub) => {
	if (sub === null && timer === null) {
		console.warn('⚠ Using Offline Timer');
		timer = setInterval(
			() => checkStatus(),
			interval >= 60000 ? interval : 60000
		);
	}
});

self.addEventListener('push', async (_) => {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
	try {
		checkStatus();
	} catch (err) {
		console.error(err);
	}
});

async function checkStatus() {
	const jobs = await db.job
		.filter((e) => {
			return !e.paused;
		})
		.toArray();
	if (jobs.length === 0) return;

	jobs.forEach(async (job) => {
		const resp = await job.getStatus(db);
		if (resp === null) return;
		processStatus(job, resp);
		db.job.update(job, { ...resp });
	});
}

function processStatus(job: Job, resp: IJobResponse) {
	if (!job || (job.number === resp.number && job.building === resp.building))
		return;

	if (job.number !== resp.number && resp.building) {
		self.registration.showNotification(
			`Job '${job.alias} #${resp.number}' Started`,
			{
				body: resp.estimatedDuration
					? `Estimated Duration: ${msToTime(resp.estimatedDuration)}`
					: undefined,
			}
		);
	} else if (!resp.building) {
		self.registration.showNotification(
			`Job '${job.alias} #${resp.number}' Completed`,
			{
				body: `Status: ${resp.result}`,
			}
		);
	}
}

// https://stackoverflow.com/a/9763769
function msToTime(s: number) {
	// Pad to 2 or 3 digits, default is 2
	var pad = (n: number, z = 2) => ('00' + n).slice(-z);
	return (
		pad((s / 3.6e6) | 0) +
		':' +
		pad(((s % 3.6e6) / 6e4) | 0) +
		':' +
		pad(((s % 6e4) / 1000) | 0) +
		'.' +
		pad(s % 1000, 3)
	);
}
