<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let primary = false,
		secondary = false,
		accent = false,
		circle = false,
		square = false,
		href: string | undefined = undefined,
		icon: SvelteComponent | undefined = undefined,
		type: 'button' | 'submit' | 'reset' | null | undefined = undefined;
</script>

{#if href}
	<a
		{href}
		{...$$restProps}
		on:click
		on:dblclick
		{type}
		class="btn btn-outline class:btn-square={square} class:btn-circle={circle} class:btn-primary={primary} class:btn-secondary={secondary} class:btn-accent={accent}"
	>
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		<slot /></a
	>
{:else}
	<button
		{...$$restProps}
		on:click
		on:dblclick
		{type}
		class="btn btn-outline class:btn-square={square} class:btn-circle={circle} class:btn-primary={primary} class:btn-secondary={secondary} class:btn-accent={accent}"
	>
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		<slot /></button
	>
{/if}
