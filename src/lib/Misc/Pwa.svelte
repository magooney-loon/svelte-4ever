<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import { writable } from 'svelte/store';
	import { copyToClipboard } from '$lib/copyToClipboard';
	import CodeBlox from '$lib/CodeBlox.svelte';
	import { codeblock } from '$lib';

	type ButtonTextKeys = 'svelte4' | 'svelte5';

	let buttonText = writable<Record<ButtonTextKeys, string>>({
		svelte4: 'Copy',
		svelte5: 'Copy'
	});

	const tabsSvelte4 = [
		{
			title: '/src/service-worker.js',
			code: `/// <reference types="@sveltejs/kit" />

import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = \`cache-\${version}\`;

const ASSETS = [
	...build, // the app itself
	...files  // everything in \`static\`
];

self.addEventListener('install', () => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	waitUntil(addFilesToCache());
});

self.addEventListener('activate', () => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', () => {
	// ignore POST requests etc
	if (request.method !== 'GET') return;

	async function respond() {
		const url = new URL(request.url);
		const cache = await caches.open(CACHE);

		// \`build\`/\`files\` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if (response.status === 200) {
				cache.put(request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(request);

			if (response) {
				return response;
			}

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request
			throw err;
		}
	}

	respondWith(respond());
});

self.addEventListener('message', event => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting()
	}
})`
		},
		{
			title: '+layout.svelte',
			code: `let updateReady = false;

	onMount(async () => {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					// New service worker is installed, but waiting activation
					updateReady = true;
				}
			});
		});
		setTimeout(() => {
			showLoadingScreen = false;
			showScreen = true;
		}, 900);
	});

	function SKIP_WAITING() {
		if (navigator.serviceWorker.controller) {
			// Send a message to the service worker to skip waiting
			const message = { type: 'SKIP_WAITING' };
			navigator.serviceWorker.controller.postMessage(message);
		}

		// Reload the page
		window.location.reload();
	}
    
// HTML Markup
{#if updateReady}		
	<button on:click={SKIP_WAITING}>Update Now</button>	
{/if}
`
		},
		{
			title: '/static/manifest.json',
			code: `{
    "theme_color": "#060d13",
    "background_color": "#060d13",
    "icons": [
        {
            "purpose": "maskable",
            "sizes": "512x512",
            "src": "/icon512_maskable.png",
            "type": "image/png"
        },
        {
            "purpose": "any",
            "sizes": "512x512",
            "src": "/icon512_rounded.png",
            "type": "image/png"
        }
    ],
    "screenshots": [
        {
          "src": "/pwa/promo_1.png",
          "sizes": "1280x920",
          "type": "image/jpg",
          "form_factor": "wide"
        },
        {
          "src": "/pwa/promo.webp",
          "sizes": "1280x920",
          "type": "image/jpg"
        }
      ],
    "orientation": "portrait-primary",
    "display": "standalone",
    "dir": "auto",
    "lang": "en-US",
    "description": "My Kool Program",
    "name": "KoolPro",
    "short_name": "KPRO",
    "start_url": "/",
    "id": "/"
}`
		}
	];

	const tabsSvelte5 = [
		{
			title: 'Tab1',
			code: `// im slow lrner plez wait ,O_O,`
		}
	];

	let activeTabSvelte4 = writable(tabsSvelte4[0]);
	let activeTabSvelte5 = writable(tabsSvelte5[0]);

	function handleCopy(key: ButtonTextKeys, code: string) {
		copyToClipboard(code)
			.then(() => {
				buttonText.update((b) => ({ ...b, [key]: 'Copied!' }));
				setTimeout(() => buttonText.update((b) => ({ ...b, [key]: 'Copy' })), 2000);
			})
			.catch((error) => {
				console.error('Failed to copy:', error);
				buttonText.update((b) => ({ ...b, [key]: 'Failed' }));
				setTimeout(() => buttonText.update((b) => ({ ...b, [key]: 'Copy' })), 2000);
			});
	}
</script>

<CodeBlox>
	<h2 slot="title">PWA worker</h2>

	<!-- Svelte 4 Tabs -->
	<div slot="tabs4" class="my-2 flex justify-center space-x-2">
		{#each tabsSvelte4 as tab (tab.title)}
			<button
				class="{tab === $activeTabSvelte4
					? 'active border-orange-600 text-white'
					: 'border-white/50 text-white/50'} rounded-sm border px-1 text-xs italic transition"
				on:click={() => activeTabSvelte4.set(tab)}
			>
				{tab.title}
			</button>
		{/each}
	</div>

	<!-- Svelte 4 Code -->
	<div slot="svelte4" class="relative">
		<Highlight language={typescript} code={$activeTabSvelte4.code} />
		<button
			on:click={() => handleCopy('svelte4', $activeTabSvelte4.code)}
			class="absolute right-2 top-2 rounded bg-orange-500 px-2 py-1 text-xs text-white transition-colors duration-300 hover:bg-orange-700"
		>
			{$buttonText.svelte4}
		</button>
	</div>

	<!-- PREVIEW -->
	<div slot="preview" class={codeblock}>nutting 2 c hier</div>

	<!-- Svelte 5 Tabs -->
	<div slot="tabs5" class="my-2 flex justify-center space-x-2">
		{#each tabsSvelte5 as tab (tab.title)}
			<button
				class="{tab === $activeTabSvelte5
					? 'active border-neutral-600 text-white'
					: 'border-white/50 text-white/50'} rounded-sm border px-1 text-xs italic transition"
				on:click={() => activeTabSvelte5.set(tab)}
			>
				{tab.title}
			</button>
		{/each}
	</div>

	<!-- Svelte 5 Code -->
	<div slot="svelte5" class="relative">
		<Highlight language={typescript} code={$activeTabSvelte5.code} />
		<button
			on:click={() => handleCopy('svelte5', $activeTabSvelte5.code)}
			class="absolute right-2 top-2 rounded bg-neutral-500 px-2 py-1 text-xs text-white transition-colors duration-300 hover:bg-neutral-700"
		>
			{$buttonText.svelte5}
		</button>
	</div>
</CodeBlox>
