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
			code: `let rotateX = 0;
let rotateY = 0;

function handleMouseMove(event: MouseEvent) {
	const width = window.innerWidth;
	const height = window.innerHeight;

	const offsetX = event.clientX / width - 0.5;
	const offsetY = event.clientY / height - 0.5;
	rotateX = offsetY * 10; // Tilt vertically
	rotateY = offsetX * 10; // Tilt horizontally
}

onMount(() => {
	window.addEventListener('mousemove', handleMouseMove);

	return () => {
		window.removeEventListener('mousemove', handleMouseMove);
	};
});

// HTML Markup
<span
	style:transform={\`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`}
	class="effect perspective">
	    MeTaMaX
</span>

// CSS
	.perspective {
		display: inline-block;
		transition: transform 0.1s;
		transform-style: preserve-3d;
	}

    .effect {
        animation: glowAnimation 2s infinite alternate;
    }

    @keyframes glowAnimation {
        0% {
            text-shadow: 0 0 20px rgba(0, 174, 255, 0.5), 0 0 30px rgba(119, 0, 255, 0.5);
        }
        100% {
            text-shadow: 0 0 40px rgba(0, 174, 255, 0.7), 0 0 60px rgba(119, 0, 255, 0.7);
        }
    }

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

	let rotateX = 0;
	let rotateY = 0;

	function handleMouseMove(event: MouseEvent) {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const offsetX = event.clientX / width - 0.5;
		const offsetY = event.clientY / height - 0.5;
		rotateX = offsetY * 18; // Tilt vertically
		rotateY = offsetX * 18; // Tilt horizontally
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<CodeBlox>
	<h2 slot="title">METAMAXU EFFX</h2>

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
		<img
			src="/MetaMask_Fox.svg.png"
			class="mx-auto"
			style:transform={`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}
		/>
		<span
			style:transform={`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}
			class="effect perspective text-center text-9xl"
		>
			MeTaMaX
		</span>
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
	.perspective {
		display: inline-block;
		transition: transform 0.1s;
		transform-style: preserve-3d;
	}

	.effect {
		animation: glowAnimation 2s infinite alternate;
	}

    @keyframes glowAnimation {
        0% {
            text-shadow: 0 0 20px rgba(0, 174, 255, 0.5), 0 0 30px rgba(119, 0, 255, 0.5);
        }
        100% {
            text-shadow: 0 0 40px rgba(0, 174, 255, 0.7), 0 0 60px rgba(119, 0, 255, 0.7);
        }
    }

</style>
