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
			title: 'ethereumStore.ts',
			code: `export interface EthereumAccount {
    provider: ethers.providers.Web3Provider | null;
    signer: ethers.Signer | null;
    address: string | null;
    accounts: string[] | null;
    balance: string;
    network: string | null;
    isConnected: boolean;
}

const initialState: EthereumAccount = {
    provider: null,
    signer: null,
    address: null,
    accounts: null,
    balance: '0',
    network: null,
    isConnected: false,
};

const createEthereumStore = () => {
    const { subscribe, set, update } = writable<EthereumAccount>(initialState);

    const connect = async () => {
        try {
            const { ethereum } = window as any;

            if (!ethereum || !ethereum.isMetaMask) {
                alert('Please install MetaMask.');
                return;
            }

            const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const network = await provider.getNetwork();

            if (network.chainId !== 8453) { // Mumbai testnet check
                alert('Please switch to the Base Mainnet.');
                return;
            }

            const address = await signer.getAddress();
            const balance = ethers.utils.formatEther(await signer.getBalance());

            set({
                provider,
                signer,
                address,
                accounts,
                balance,
                network: network.name,
                isConnected: true,
            });

            // Listen for account changes
            ethereum.on('accountsChanged', async (accounts: string[]) => {
                if (accounts.length === 0) {
                    // MetaMask is locked or the user has disconnected their account
                    set({ ...initialState });
                } else {
                    // When accounts change, reconnect with the new account
                    connect(); // This will refresh the connection with the new account
                }
            });

            // Listen for chain (network) changes
            ethereum.on('chainChanged', (chainId: string) => {
                // Reload the page (or reconnect) to ensure changes take effect
                // Optionally, you could just call \`connect()\` again to refresh without reloading
                window.location.reload();
            });

        } catch (error) {
            console.error('An error occurred during connection:', error);
            set({ ...initialState });
        }
    };

    return {
        subscribe,
        connect,
        disconnect: () => {
            const { ethereum } = window as any;
            if (ethereum && ethereum.removeListener) {
                ethereum.removeListener('accountsChanged', connect);
                ethereum.removeListener('chainChanged', () => window.location.reload());
            }
            set({ ...initialState });
        },
    };
};

export const ethereumStore = createEthereumStore();
`
		},
		{
			title: '+layout.svelte',
			code: `$: if ($ethereumStore.isConnected) {
	console.log('Connected to address:', $ethereumStore.address);
}

{#if !$ethereumStore.isConnected}
	<button
		on:click={() => ethereumStore.connect()}>
        Connect Metamask</button
	>
{/if}
            
{#if $ethereumStore.isConnected && $ethereumStore.address}
    <p>Connected as: {$ethereumStore.address.slice(0, 6)}...{$ethereumStore.address.slice(-4)}
{/if}`
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
	<h2 slot="title">Metamax+Ethers</h2>

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
