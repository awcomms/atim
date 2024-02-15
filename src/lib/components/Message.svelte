<script lang="ts">
	export let m: { id: string; value: { m: string } };
	import { page } from '$app/stores';
	import { notify } from '$lib/util/notify';
	import { Button } from './daisy';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';

	import { Checkmark, Loading, X } from './icons';

	const dispatch = createEventDispatcher();

	let approve_loading = false,
		trash_loading = false;

	// a is an indication of what action to take on the message
	// "a" means "approve"
	// "t" means "trash" as in move to trash, not trash
	const approve = async () => {
		approve_loading = true;
		try {
			await axios.put(`/messages?i=${m.id}&a=1`);
			dispatch('remove');
		} catch (e) {
			notify('Error occured while trying to approve entry')
		}
		approve_loading = false;
	};
	const trash = async () => {
		trash_loading = true;
		try {
			await axios.put(`/messages?i=${m.id}&a=0`);
			dispatch('remove');
		} catch (e) {
			notify('Error occured while trying to trash entry')
		}
		trash_loading = false;
	};
</script>

<div class="grid grid-cols-3 gap-3">
	<p class="p-4 min-w-fit shadow-md bg-rose-300 rounded-lg items-center">{m.value.m}</p>
	{#if $page.data.in}
		<Button
			on:click={approve}
			icon={approve_loading ? Loading : Checkmark}
			circle
			name="id"
			value={m.id}
		/>
		<Button on:click={trash} icon={trash_loading ? Loading : X} circle name="id" value={m.id} />
	{/if}
</div>
