<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import { writable } from 'svelte/store';
	import { copyToClipboard } from '$lib/copyToClipboard';
	import CodeBlox from '$lib/CodeBlox.svelte';
	import { codeblock } from '$lib';
	import { onDestroy, onMount } from 'svelte';

	type ButtonTextKeys = 'svelte4' | 'svelte5';

	let buttonText = writable<Record<ButtonTextKeys, string>>({
		svelte4: 'Copy',
		svelte5: 'Copy'
	});

	const tabsSvelte4 = [
		{
			title: 'background.svelte',
			code: `let canvas: HTMLCanvasElement;
	const numParticles = 360;
	let particles: any[] = [];
	let lines: { start: any; end: any; opacity: number }[] = [];
	let lineAdditionRate = 1000;
    let particleUpdateInterval;
    let lineAdditionInterval;

	function createParticles() {
		for (let i = 0; i < numParticles; i++) {
			particles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - 0.5) * 2,
				vy: (Math.random() - 0.5) * 2
			});
		}
	}

	function addLines() {
		if (lines.length < 9) {
			let start = particles[Math.floor(Math.random() * particles.length)];
			let end = particles[Math.floor(Math.random() * particles.length)];
			lines.push({ start, end, opacity: 0.5 }); // Lower initial opacity for barely visible lines
		}
	}

	function drawParticles() {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw particles
		particles.forEach((particle, index) => {
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, 1, 0, 2 * Math.PI);
			ctx.fillStyle = index % 2 === 0 ? '#4fd1c5' : '#805ad5';
			ctx.fill();
		});

		// Draw and update lines
		lines.forEach((line) => {
			ctx.beginPath();
			ctx.moveTo(line.start.x, line.start.y);
			ctx.lineTo(line.end.x, line.end.y);
			ctx.strokeStyle = \`rgba(128, 90, 213, \${line.opacity})\`;
			ctx.stroke();
			line.opacity -= 0.005; // Slower fade out
		});

		// Remove lines that have faded out
		lines = lines.filter((line) => line.opacity > 0);
	}

	function updateParticles() {
    particles = particles.map((particle) => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;

        // Wrap particles horizontally
        if (newX < 0) newX = window.innerWidth + newX;
        else if (newX > window.innerWidth) newX = newX - window.innerWidth;

        // Wrap particles vertically
        if (newY < 0) newY = window.innerHeight + newY;
        else if (newY > window.innerHeight) newY = newY - window.innerHeight;

        return { ...particle, x: newX, y: newY };
    });

    drawParticles();
}


onMount(() => {
    if (typeof window !== 'undefined') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
        particleUpdateInterval = setInterval(updateParticles, 1000 / 30);
        lineAdditionInterval = setInterval(addLines, lineAdditionRate);

        window.addEventListener('resize', handleResize);
    }
});

function handleResize() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawParticles();
    }
}

onDestroy(() => {
    if (typeof window !== 'undefined') {
        clearInterval(particleUpdateInterval);
        clearInterval(lineAdditionInterval);

        window.removeEventListener('resize', handleResize);
    }
});
    
// HTML Markup
<canvas class="z-0" bind:this={canvas}></canvas>

// CSS
canvas {
	position: fixed;
	top: 0;
	left: 0;
    background-color:black;
}
`
		}
	];

	const tabsSvelte5 = [
		{
			title: 'background.svelte',
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

	let canvas: HTMLCanvasElement;
	const numParticles = 360;
	let particles: any[] = [];
	let lines: { start: any; end: any; opacity: number }[] = [];
	let lineAdditionRate = 1000; // New lines added every 1000 milliseconds
	let particleUpdateInterval: number | undefined; // Reference for particle update interval
	let lineAdditionInterval: number | undefined; // Reference for line addition interval
	function createParticles() {
		for (let i = 0; i < numParticles; i++) {
			particles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - 0.5) * 2,
				vy: (Math.random() - 0.5) * 2
			});
		}
	}

	function addLines() {
		// Ensure at most 9 lines are present at any time
		if (lines.length < 9) {
			let start = particles[Math.floor(Math.random() * particles.length)];
			let end = particles[Math.floor(Math.random() * particles.length)];
			lines.push({ start, end, opacity: 0.5 }); // Lower initial opacity for barely visible lines
		}
	}

	function drawParticles() {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw particles
		particles.forEach((particle, index) => {
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, 1, 0, 2 * Math.PI);
			ctx.fillStyle = index % 2 === 0 ? '#4fd1c5' : '#805ad5';
			ctx.fill();
		});

		// Draw and update lines
		lines.forEach((line) => {
			ctx.beginPath();
			ctx.moveTo(line.start.x, line.start.y);
			ctx.lineTo(line.end.x, line.end.y);
			ctx.strokeStyle = `rgba(128, 90, 213, ${line.opacity})`;
			ctx.stroke();
			line.opacity -= 0.005; // Slower fade out
		});

		// Remove lines that have faded out
		lines = lines.filter((line) => line.opacity > 0);
	}

	function updateParticles() {
		particles = particles.map((particle) => {
			let newX = particle.x + particle.vx;
			let newY = particle.y + particle.vy;

			// Wrap particles horizontally
			if (newX < 0) newX = window.innerWidth + newX;
			else if (newX > window.innerWidth) newX = newX - window.innerWidth;

			// Wrap particles vertically
			if (newY < 0) newY = window.innerHeight + newY;
			else if (newY > window.innerHeight) newY = newY - window.innerHeight;

			return { ...particle, x: newX, y: newY };
		});

		drawParticles();
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			createParticles();
			particleUpdateInterval = setInterval(updateParticles, 1000 / 30);
			lineAdditionInterval = setInterval(addLines, lineAdditionRate);

			window.addEventListener('resize', handleResize);
		}
	});

	function handleResize() {
		if (canvas) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			drawParticles();
		}
	}

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			clearInterval(particleUpdateInterval);
			clearInterval(lineAdditionInterval);

			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<CodeBlox>
	<h2 slot="title">d0tz&&Linez</h2>

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
		<canvas class="z-0 w-full h-screen" bind:this={canvas}></canvas> not the best preview agen >.>
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
	canvas {
		background-color: black;
		top: 0;
		left: 0;
	}
</style>
