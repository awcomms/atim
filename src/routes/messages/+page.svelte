<script lang="ts">
	import { Button } from '$lib/components/daisy/index.js';
	import { Check } from '$lib/components/icons/hero/index.js';

	// import { type PageData } from './$types';
	export let data
</script>

<h2>All messages</h2>
<Button href="/messages/add">send a message</Button>

<div class="space-y-4">
	{#each data._ as m}
		<div class="grid grid-cols-2 gap-3">
			<p class="p-4 shadow-xl bg-rose-300 rounded-lg items-center" >{m.value.m}</p>
			{#if data.in}
				<form method="post" action="?/approve"><Button icon={Check} circle name="id" value={m.id} /></form>
			{/if}
		</div>
{/each}
</div>
