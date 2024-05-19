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
			title: 'Carousel.svelte',
			code: `let currentIndex = 0;
	let images = ['/favicon.png', 'github.png', 'MetaMask_Fox.svg.png'];

    function changeSlide(direction: string) {
		if (direction === 'prev') {
			currentIndex = (currentIndex - 1 + images.length) % images.length;
		} else {
			currentIndex = (currentIndex + 1) % images.length;
		}
	}

	onMount(() => {
		const interval = setInterval(() => changeSlide('next'), 3000);
		return () => clearInterval(interval);
	})
    
    //HTML MARKUP
<div class="relative h-64 w-full">
    {#each images as image, index}
		<div
			class="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
			style={\`opacity: \${currentIndex === index ? 1 : 0};\`}
			>
			<img src={image} alt={\`Carousel Image \${index + 1}\`} class="h-full object-contain" />
		</div>
	{/each}

	<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
		<button
			on:click={() => changeSlide('prev')}
			class="animate-pulse border border-white/50 bg-black/70 text-xl text-green-600/80"
			>❮</button>
			<button
			on:click={() => changeSlide('next')}
			class="animate-pulse border border-white/50 bg-black/70 text-xl text-green-600/80"
			>❯</button>
	</div>
</div>`
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

	let currentIndex = 0;
	let images = ['/favicon.png', 'github.png', 'MetaMask_Fox.svg.png'];

	function changeSlide(direction: string) {
		if (direction === 'prev') {
			currentIndex = (currentIndex - 1 + images.length) % images.length;
		} else {
			currentIndex = (currentIndex + 1) % images.length;
		}
	}

	onMount(() => {
		const interval = setInterval(() => changeSlide('next'), 3000);
		return () => clearInterval(interval);
	});
</script>

<CodeBlox>
	<h2 slot="title">Carousel</h2>

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
		<div class="relative h-64 w-full">
			{#each images as image, index}
				<div
					class="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
					style={`opacity: ${currentIndex === index ? 1 : 0};`}
				>
					<img src={image} alt={`Carousel Image ${index + 1}`} class="h-full object-contain" />
				</div>
			{/each}

			<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
				<button
					on:click={() => changeSlide('prev')}
					class="btn btn-circle animate-pulse border border-white/50 bg-black/70 text-xl text-green-600/80"
					>❮</button
				>
				<button
					on:click={() => changeSlide('next')}
					class="btn btn-circle animate-pulse border border-white/50 bg-black/70 text-xl text-green-600/80"
					>❯</button
				>
			</div>
		</div>
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
