<script lang="ts">
	export let primary = false,
		secondary = false,
		accent = false,
		type: 'button' | 'submit' | 'reset' | null | undefined = undefined;
</script>

<button
	on:click
	on:dblclick
	{type}
	class="btn btn-outline class:btn-primary={primary} class:btn-secondary={secondary} class:btn-accent={accent}"
	><slot /></button
>
