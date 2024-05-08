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
			title: '+layout.svelte',
			code: `import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { track } from '@vercel/analytics';
    
    inject({ mode: dev ? 'development' : 'production' });
    
    let hasSentOneHourTrack = false;
	let hasSentFiveHoursTrack = false;

	function startTracking() {
		// Track after 1 hour
		setTimeout(() => {
			if (!hasSentOneHourTrack) {
				track('User Active for 1 Hour');
				hasSentOneHourTrack = true;
			}
		}, 3600000); // 1 hour in milliseconds

		// Track after 5 hours
		setTimeout(() => {
			if (!hasSentFiveHoursTrack) {
				track('User Active for 5 Hours');
				hasSentFiveHoursTrack = true;
			}
		}, 18000000); // 5 hours in milliseconds
	}

	function setupBeforeUnloadListener() {
		window.addEventListener('beforeunload', (event) => {
			// Perform any necessary checks or logging here
			// Note: Custom messages are mostly ignored by modern browsers,
			// but you can still perform synchronous operations like logging to the console.
			console.log('User is leaving the webpage.');

			// Uncomment below if you have a quick, synchronous action to perform:
			// if (!hasSentOneHourTrack) {
			//     // Attempt to log or perform a quick action
			//     // Direct tracking calls here are unreliable and likely won't work as intended
			// }
		});
	}

	onMount(() => {
		startTracking();
		setupBeforeUnloadListener();
	});
    `
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
	<h2 slot="title">Vercelu Analytixez</h2>

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
