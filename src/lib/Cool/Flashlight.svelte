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
			title: '+layout.svelte',
			code: `let blob: HTMLDivElement;

onMount(() => {
  window.onpointermove = (event) => {
	const { clientX, clientY } = event;

	blob.animate(
	  {
		left: \${clientX}px,
		top: \${clientY}px,
	  },
	  { duration: 3000, fill: "forwards" },
	);
  };
});

// HTML Markup
<div id="background">
  <div id="blob" class="blur-3xl" bind:this={blob}></div>
  <div id="blur"></div>
</div>

// CSS
@keyframes rotate {
	from {
      rotate: 0deg;
    }

    50% {
      scale: 1 1.5;
    }

    to {
      rotate: 360deg;
    }
  }

  #background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  #blob {
    background-color: rgba(255, 255, 255, 0.192);
    height: 34vmax;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(to right, aquamarine, mediumpurple);
    animation: rotate 20s infinite;
    opacity: 0.45;
  }

  #blur {
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 45%;
    backdrop-filter: blur(12vmax);
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

	let blob: HTMLDivElement;
	let previewContainer: HTMLDivElement;

	onMount(() => {
		previewContainer.addEventListener(
			'pointermove',
			(event: { clientX: number; clientY: number }) => {
				const rect = previewContainer.getBoundingClientRect();
				const x = event.clientX - rect.left; // x position within the element.
				const y = event.clientY - rect.top; // y position within the element.

				blob.style.left = `${x}px`;
				blob.style.top = `${y}px`;
			}
		);
	});
</script>

<CodeBlox>
	<h2 slot="title">MouiseFlashlishtgts</h2>

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
	<div slot="preview" class={codeblock} bind:this={previewContainer}>
		its not working ze best in diz preview wind0w
		<div id="background">
			<div id="blob" class="blur-3xl" bind:this={blob}></div>
			<div id="blur"></div>
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

<style>
	@keyframes rotate {
		from {
			rotate: 0deg;
		}

		50% {
			scale: 1 1.5;
		}

		to {
			rotate: 360deg;
		}
	}

	#background {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden; /* Ensures that nothing spills outside */
	}

	#blob {
		background-color: rgba(255, 255, 255, 0.192);
		height: 9vmax;
		aspect-ratio: 1;
		position: absolute;
		border-radius: 50%;
		background: linear-gradient(to right, aquamarine, mediumpurple);
		animation: rotate 20s infinite;

		transition:
			left 0.3s,
			top 0.3s; /* Smooth transition for movement */
	}

	#blur {
		height: 100%;
		width: 100%;
		position: absolute;
		opacity: 45%;
		backdrop-filter: blur(12vmax);
	}
</style>
