<script lang="ts">
	export let page = 1;
	export let pages = 1;
	export let last: number | undefined = undefined;

	import { ArrowLeft, ArrowRight } from '$lib/components/icons';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

{#if pages > 1}
	<div class="join">
		{#if page !== 0}
			{#if pages > 2}
				<button on:click={() => dispatch('move', page - 1)} class="join-item btn"
					><svelte:component this={ArrowLeft} /></button
				>
			{:else}
				<button on:click={() => dispatch('move', 0)} class="join-item btn">1</button>
			{/if}

			<button class="join-item btn btn-disabled">...</button>
		{/if}
		<button class="join-item btn btn-active	">{page +1}</button>
		<button class="join-item btn btn-disabled">...</button>
		<button class="join-item btn" on:click={() => dispatch('move', pages)}>{pages}</button>
		{#if page !== pages}
			<button on:click={() => dispatch('move', page + 1)} class="join-item btn"
				><svelte:component this={ArrowRight} /></button
			>
		{:else}{/if}
	</div>
{/if}
