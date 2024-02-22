<script lang="ts">
	import Message from '$lib/components/Message.svelte';
	import Pagination from '$lib/components/daisy/Pagination.svelte';
	import { Button, TextInputWithIcon } from '$lib/components/daisy';
	import PencilSquare from '$lib/components/icons/hero/PencilSquare.svelte';
	import { Search, Loading } from '$lib/components/icons';
	import axios from 'axios';

	// import { type PageData } from './$types';
	export let data,
		a = true,
		query = '',
		loading = false;
	let { documents, page, pages } = data;

	$: console.log(a)

	const remove = (id: string) => {
		documents = documents.filter((i) => i.id !== id);
	};

	const get = async (p: number = page) => {
		loading = true;
		let res = await axios.get(`/messages?p=${p}&q=${query}${data.in && a ? '&a=' : ''}`);
		({ page, pages, documents } = res.data);
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
		<TextInputWithIcon
			placeholder="Search"
			on:click={get}
			on:keydown={({ key }) => {
				if (key === 'Enter') get();
			}}
			icon={Search}
			bind:value={query}
		/>
	</div>

	{#if data.in}
		<div class="grid grid-cols-2 items-center">
			<p>Showing only {a ? 'approved' : 'unapproved'} messages</p>
			<Button
				on:click={async () => {
					a = !a;
					await get();
				}}>View {a ? 'unapproved' : 'approved'} messages</Button
			>
		</div>
	{/if}

	{#if loading}
		<div class="items-center"><Loading /></div>
	{:else}
		<div class="grid grid-cols-2 gap-3 items-center">
			{#each documents as m (m.id)}
				{JSON.stringify(m)}
				<Message {m} on:remove={() => remove(m.id)} />
			{/each}
		</div>
	{/if}
	<Pagination on:move={({ detail }) => get(detail)} {page} pages={data.pages} />
</div>
