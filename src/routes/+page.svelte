<script lang="ts">
	import '../app.css';
	import Imgshufflerz from '$lib/Utils/Imgshufflerz.svelte';
	import Test from '$lib/test.svelte';
	import { onDestroy, onMount } from 'svelte';
	import ashes from 'svelte-highlight/styles/ashes';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import ToTop from '$lib/Utils/ToTop.svelte';
	import Seo from '$lib/Misc/Seo.svelte';
	import IntersectionObserver from '$lib/Utils/IntersectionObserver.svelte';
	import Flashlight from '$lib/Cool/Flashlight.svelte';
	import DotzAndLinez from '$lib/Cool/DotzAndLinez.svelte';
	import Metamax from '$lib/Cool/Metamax.svelte';
	import IsolateBeat from '$lib/Cool/IsolateBeat.svelte';
	import Spinner from '$lib/Utils/Spinner.svelte';
	import MetamaskStore from '$lib/Utils/MetamaskStore.svelte';
	import Pwa from '$lib/Misc/Pwa.svelte';
	import AntiClixJax from '$lib/Misc/AntiClixJax.svelte';
	import Player from '$lib/Player.svelte';
	import Scrollbar from '$lib/Misc/Scrollbar.svelte';
	import VercelAnalyitix from '$lib/Utils/VercelAnalyitix.svelte';

	const menuItems = ['Utils', 'Cool', 'Misc'];
	const selectedItem = writable(menuItems[0]);

	function selectItem(item: string) {
		selectedItem.set(item);
	}

	const scrollTop = writable(0);

	function scrollToTop() {
		if (typeof window !== 'undefined') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	}

	function updateScroll() {
		if (typeof window !== 'undefined') {
			scrollTop.set(window.scrollY);
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			updateScroll();
			window.addEventListener('scroll', updateScroll);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', updateScroll);
		}
	});
</script>

<svelte:head>
	{@html ashes}
	<title>Svelte • MyCodeBlox</title>
</svelte:head>
<body class="min-h-screen cursor-crosshair bg-orange-500 font-mono">
	<div
		class="mx-auto border-b border-orange-600 bg-neutral-700 p-2 text-center text-xl text-white/50 shadow-inner shadow-black"
	>
		Make a PR king <a
			href="https://www.cia.gov/"
			target="_blank"
			class="text-orange-500 hover:text-orange-400">@github</a
		>
		<div class="flex justify-center gap-2 py-2">
			{#each menuItems as item}
				<button
					class="{$selectedItem === item
						? 'animate-pulse bg-orange-500 text-white/80'
						: 'bg-gray-400/50 text-white/50 hover:bg-white/50 hover:text-white hover:shadow-black'} rounded-md border border-white/5 px-2 py-0.5 text-sm uppercase shadow-inner shadow-black/50 transition focus:outline-none focus:ring-1 focus:ring-black/20"
					on:click={() => selectItem(item)}
				>
					{item}
				</button>
			{/each}
		</div>
	</div>
	<Player />
	{#if $selectedItem === 'Utils'}
		<Imgshufflerz />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<ToTop />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<IntersectionObserver />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<MetamaskStore />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
    <VercelAnalyitix />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<Spinner />
	{/if}

	{#if $selectedItem === 'Cool'}
		<IsolateBeat />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<Metamax />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<Flashlight />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<DotzAndLinez />
	{/if}

	{#if $selectedItem === 'Misc'}
		<Scrollbar />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<AntiClixJax />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<Seo />
		<hr class="mx-auto w-1/2 animate-ping border border-orange-500" />
		<Pwa />
	{/if}

	{#if $scrollTop > 100}
		<button
			transition:scale
			class="fixed bottom-5 right-1/2 translate-x-1/2 cursor-pointer rounded bg-orange-700 px-2 py-1 text-xs text-white shadow-lg hover:bg-orange-800"
			on:click={scrollToTop}
		>
			↑ Top
		</button>
	{/if}
</body>
