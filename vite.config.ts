import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin'],
			},
		}),
		VitePWA({
			includeAssets: [
				'favicon.svg',
				'favicon.ico',
				'robots.txt',
				'apple-touch-icon.png',
			],
			manifest: {
				name: 'Jenkins Notifier',
				description: 'Description of your app',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			srcDir: 'src/serviceworker',
			filename: 'index.ts',
			devOptions: {
				enabled: true,
				type: 'module',
			},
			workbox: {
				sourcemap: true,
			},
		}),
	],
	build: {
		rollupOptions: {
			input: {
				app: './index.html',
				'service-worker': './src/serviceworker/index.ts',
			},
			output: {
				entryFileNames: (assetInfo) => {
					return assetInfo.name === 'service-worker'
						? 'serviceWorker.js' // put service worker in root
						: '[name]-[hash].js'; // others in `assets/js/`
				},
			},
		},
	},
});
