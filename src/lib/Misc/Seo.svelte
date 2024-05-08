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
			code: `let canonicalURL = "https://www.urkewl.url";

onMount(() => {
    canonicalURL = window.location.origin + window.location.pathname;
});

// HTML Markup
<svelte:head>
	<title>CoolName - Home</title>
	<link rel="canonical" href={canonicalURL} />
	<meta name="title" content="CoolName Fill Title " />
	<meta
		name="description"
		content="CoolName ... fill thiz plez"
	/>
	<meta
		name="keywords"
		content="fill, thiz, liek, diz, pliz"
	/>
	<meta name="robots" content="index, follow" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="30 days" />
	<meta name="author" content="team@CoolName.dev" />
	<meta
		property="og:title"
		content="CoolName - The Future Fill Title"
	/>
	<meta property="og:site_name" content="CoolName Fill Title" />
	<meta property="og:url" content="https://www.CoolName.io/" />
	<meta
		property="og:description"
		content="CoolName ... fill thiz plez"
	/>
	<meta property="og:type" content="product" />
	<meta
		property="og:image"
		content="https://opengraph.b-cdn.net/..."
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="CoolName.io" />
	<meta property="twitter:url" content="https://www.CoolName.io/" />
	<meta
		name="twitter:title"
		content="CoolName - The Future "
	/>
	<meta
		name="twitter:description"
		content="CoolName ... fill thiz plez"
	/>
	<meta
		name="twitter:image"
		content="https://opengraph.b-cdn.net/..."
	/>
</svelte:head>`
		},
		{
			title: '/static/robots.txt',
			code: `User-agent: *
Disallow: /api/
Disallow: /auth/
Allow: /

Sitemap: https://www.CoolName.io/sitemap.xml`
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
	<h2 slot="title">SEOboilerplate</h2>

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
