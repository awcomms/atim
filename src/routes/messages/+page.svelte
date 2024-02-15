<script lang="ts">
	// import { type PageData } from './$types';
	export let data
</script>

{#each data._ as m}
	<p>$${JSON.stringify(m)}$$</p>
{/each}
