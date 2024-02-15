<script lang="ts">
	import '../style.css';
	import { notifications } from '$lib/stores';
	import Toast from '$lib/components/daisy/Toast.svelte';

	
</script>

<!-- {#each $notifications as n}
	<Toast {...n} />
{/each} -->

<div class="p-4">
	<slot />
</div>
