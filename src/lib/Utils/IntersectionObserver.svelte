<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import { writable } from 'svelte/store';
	import { copyToClipboard } from '$lib/copyToClipboard';
	import CodeBlox from '$lib/CodeBlox.svelte';
	import { codeblock } from '$lib';
	import { onMount } from 'svelte';

	type ButtonTextKeys = 'svelte4' | 'svelte5';

	let buttonText = writable<Record<ButtonTextKeys, string>>({
		svelte4: 'Copy',
		svelte5: 'Copy'
	});

	const tabsSvelte4 = [
		{
			title: '+page.svelte',
			code: `let heroSection: HTMLElement;
let videoSection: HTMLElement;

onMount(() => {
		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				entries.forEach((entry) => {
					const target = entry.target as HTMLElement;
					target.style.opacity = entry.isIntersecting ? "1" : "0";
				});
			},
		);

		observer.observe(heroSection);
		observer.observe(videoSection);
	});
    
// HTML Markup
<section bind:this={heroSection} class="effex">
	<Hero />
</section>

<section bind:this={videoSection} class="effex">
	<Video />
</section>

// CSS
.effex {
    opacity: 0;
	transition: opacity 2s ease-in-out;
}
`
		}
	];

	const tabsSvelte5 = [
		{
			title: '+page.svelte',
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

	let heroSection: Element;
	let videoSection: Element;

	onMount(() => {
		const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				const target = entry.target as HTMLElement;
				target.style.opacity = entry.isIntersecting ? '1' : '0';
			});
		});

		observer.observe(heroSection);
		observer.observe(videoSection);
	});
</script>

<CodeBlox>
	<h2 slot="title">InsteresctorObservator</h2>

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
	<div slot="preview" class={codeblock}>
		<div bind:this={heroSection} class="effex text-xl">
			you will see this when you scroll into <img src="/favicon.png" />
		</div>

		<div bind:this={videoSection} class="effex italic">this preview isnt working the best lulz</div>
	</div>

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

<style>
	.effex {
		opacity: 0;
		transition: opacity 2s ease-in-out;
	}
</style>
