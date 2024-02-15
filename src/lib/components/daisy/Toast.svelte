<script lang="ts">
	export let text: string,
		timeout = 3600,
		show = true;

	setTimeout(() => {
		show = false;
	}, timeout);
</script>

{#if show}
	<div class="toast toast-top toast-center">
		<div class="alert alert-info">
			<span>{text}</span>
		</div>
	</div>
{/if}
