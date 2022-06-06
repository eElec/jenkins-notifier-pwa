/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src/'),
			'@db': path.resolve(__dirname, './src/db'),
			'@sw': path.resolve(__dirname, './src/serviceworker'),
			'@test': path.resolve(__dirname, './test'),
		},
	},
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
				short_name: 'Jenkins Notifier',
				description: 'Job status tracking and notifier for jenkins',
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
		sourcemap: mode === 'development',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './test/setup.ts'
	}
}));
