<script lang="ts">
	import Message from '$lib/components/Message.svelte';
	import Pagination from '$lib/components/daisy/Pagination.svelte';
	import { Button, TextInputWithIcon } from '$lib/components/daisy';
	import PencilSquare from '$lib/components/icons/hero/PencilSquare.svelte';
	import { Search } from '$lib/components/icons';
	import axios from 'axios';

	// import { type PageData } from './$types';
	export let data,
		query = '',
		loading = false;
	let { documents, page, pages } = data;

	const remove = (id: string) => {
		console.debug('data', data);
		console.debug('ia');
		documents = documents.filter((i) => i.id !== id);
		console.debug('data2', data);
	};

	const get = async (p: number = page) => {
		loading = true;
		let res = await axios.get(`/messages?p=${p}&q=${query}`);
		({ page, pages, documents } = res.data);
		console.debug(page, pages, documents);
		loading = false;
	};
</script>

<div class="space-y-2">
	<div class="items-center space-y-2">
		<h1 class="font-bold">Tributes and goodwill messages</h1>
		<p>
			This page is dedicated to tributes to Madam Atim Bassey Hogan, condolences to her loved ones,
			and general goodwill messages with respect to the life of Madam Atim. Any member of the
			general public is welcome to post a message, which will be reviewed before conditionally being
			displayed here
		</p>
		<Button icon={PencilSquare} href="/messages/add">send a message</Button>
		<TextInputWithIcon placeholder="Search" on:click={get} on:keydown={({key}) => {if (key === 'Enter') get()}} icon={Search} bind:value={query} />
	</div>

	<div class="space-y-4">
		{#each documents as m (m.id)}
			<Message {m} on:remove={() => remove(m.id)} />
		{/each}
	</div>
	<Pagination on:move={({ detail }) => get(detail)} {page} pages={data.pages} />
</div>
