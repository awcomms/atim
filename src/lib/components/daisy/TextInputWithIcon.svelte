<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let label: string | undefined = undefined,
		icon_left = false,
		icon_right = !icon_left,
		icon: SvelteComponent | undefined,
		// top_left_label = '',
		// top_right_label = '',
		// bottom_left_label = '',
		// bottom_right_label = '',
		value = '',
		classes = '',
		error = false,
		placeholder = '',
		name = '';
</script>

<label class="input input-bordered flex items-center gap-2">
	{#if icon && icon_left}<svelte:component this={icon} on:click />{/if}
	{#if label}{label}{/if}
	<input
		on:keydown
		on:input
		bind:value
		type="text"
		{placeholder}
		{name}
		class:input-error={error}
		class="grow {classes}"
	/>
	{#if icon && icon_right}<svelte:component this={icon} on:click />{/if}
</label>
