<script>
	export let top_left_label = '',
		top_right_label = '',
		bottom_left_label = '',
		bottom_right_label = '',
		value = '',
        classes = "",
        error = false,
        placeholder = "",
		name = '';
</script>

<label class="form-control w-full max-w-xs">
	{#if top_left_label || top_right_label}
		<div class="label">
			{#if top_left_label}
				<span class="label-text">{top_left_label}</span>
			{/if}
			{#if top_right_label}
				<span class="label-text-alt">{top_right_label}</span>
			{/if}
		</div>
	{/if}
	<input on:keydown on:input bind:value type="text" {placeholder} {name} class:input-error={error} class="input input-bordered w-full max-w-xs {classes}" />
	{#if bottom_left_label || bottom_right_label}
		<div class="label">
			{#if bottom_left_label}
				<span class="label-text-alt">{bottom_left_label}</span>
			{/if}
			{#if bottom_right_label}
				<span class="label-text-alt">{bottom_right_label}</span>
			{/if}
		</div>
	{/if}
</label>
