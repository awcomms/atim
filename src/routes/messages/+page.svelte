<script lang="ts">
	import Message from '$lib/components/Message.svelte';
	import Pagination from '$lib/components/daisy/Pagination.svelte';
	import { Button } from '$lib/components/daisy/index.js';
	import axios from 'axios';

	// import { type PageData } from './$types';
	export let data,
		loading = false;
	let { documents, page, pages } = data;

	const remove = (id: string) => {
		console.debug('data', data);
		console.debug('ia');
		documents = documents.filter((i) => i.id !== id);
		console.debug('data2', data);
	};

	const get = async (p: number) => {
		console.log('e-p', p);
		loading = true;
		let res = await axios.get(`/messages?p=${p}`);
		console.debug('eres', res);
		({ page, pages, documents } = res.data);
		console.debug(page, pages, documents);
		loading = false;
	};
</script>

<div class="space-y-2">
	<div class="items-center grid grid-cols-2">
		<h1 class="font-bold">Tributes and Messages</h1>
		<Button href="/messages/add">send a message</Button>
	</div>

	<div class="space-y-4">
		{#each documents as m}
			<Message {m} on:remove={() => remove(m.id)} />
		{/each}
	</div>
	<Pagination on:move={({ detail }) => get(detail)} {page} pages={data.pages} />
</div>
