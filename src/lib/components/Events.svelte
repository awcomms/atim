<script lang="ts">
	import Event from './Event.svelte';

	export let name: string;
	export let events: { name: string; date: Date; time: boolean }[];
</script>

<div class="space-y-4">
	<p class="text-2xl font-bold tracking/tighter leading/none">{name}</p>

	<div class="ml-4 space-y-4">
		{#each events as event}
			<Event {...event} />
		{/each}
	</div>
</div>
