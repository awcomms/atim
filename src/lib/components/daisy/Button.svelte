<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let primary = false,
		secondary = false,
		accent = false,
		circle = false,
		square = false,
		outline = false,
		icon_left = false,
		icon_right = !icon_left,
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
		class="btn class:btn-outline={outline} class:btn-square={square} class:btn-circle={circle} class:btn-primary={primary} class:btn-secondary={secondary} class:btn-accent={accent}"
	>
		{#if icon && icon_left}
			<svelte:component this={icon} />
		{/if}
		<slot />{#if icon && icon_right}
			<svelte:component this={icon} />
		{/if}</a
	>
{:else}
	<button
		{...$$restProps}
		on:click
		on:dblclick
		{type}
		class="btn btn-outline class:btn-square={square} class:btn-circle={circle} class:btn-primary={primary} class:btn-secondary={secondary} class:btn-accent={accent}"
	>
		{#if icon && icon_left}
			<svelte:component this={icon} />
		{/if}
		<slot />{#if icon && icon_right}
			<svelte:component this={icon} />
		{/if}</button
	>
{/if}
