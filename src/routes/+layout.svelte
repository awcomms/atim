<script lang="ts">
	import '../style.css';
	import { notifications } from '$lib/util/notify';
	import Toast from '$lib/components/daisy/Toast.svelte';
	import { Nav } from '$lib/components/daisy';
</script>

{#each $notifications as n}
	<Toast {...n} />
{/each}

<Nav />

<div class="p-4">
	<slot />
</div>
