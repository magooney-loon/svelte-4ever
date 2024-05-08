<script>
	import { codeblock } from '$lib';
</script>

<div class="border-b border-black bg-neutral-800 shadow-xl shadow-black">
	<div class="max-w-1/3 mx-auto px-4 py-12 ">
		<h2 class="text-center text-3xl font-extrabold tracking-tight text-gray-200 sm:text-4xl">
			<slot name="title" />
		</h2>
		<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
			<!-- Repeat  -->
			<div class="group relative">
				<div class="mb-2 flex justify-center">
					<div>
						<h3 class="text-sm text-gray-700">
							<span class="font-medium uppercase text-gray-100">Svelte 4</span>
						</h3>
					</div>
				</div>
				<slot name="tabs4" />

				<code class={codeblock}>
					<slot name="svelte4" />
				</code>
			</div>

			<!-- Repeat  -->
			<div class="group relative">
				<div class="mb-2 flex justify-center">
					<div>
						<h3 class="text-sm text-gray-700">
							<span class="font-medium uppercase text-gray-100">Preview</span>
						</h3>
					</div>
				</div>
				<div class={codeblock}>
					<slot name="preview" />
				</div>
			</div>
			<!-- Repeat  -->
			<div class="group relative">
				<div class="mb-2 flex justify-center">
					<div>
						<h3 class="text-sm text-gray-700">
							<span class="font-medium uppercase text-gray-100">Svelte 5</span>
						</h3>
					</div>
				</div>
				<slot name="tabs5" />

				<code class={codeblock}>
					<slot name="svelte5" />
				</code>
			</div>
		</div>
	</div>
</div>
