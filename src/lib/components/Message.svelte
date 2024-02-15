<script lang="ts">
	export let m: { id: string; value: { m: string } };
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores';
	import { Button } from './daisy';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';

	import { Check, Loading, Trash } from './icons';

	const dispatch = createEventDispatcher();

	let approve_loading = false,
		trash_loading = false;

	// a is an indication of what action to take on the message
	// "a" means "approve"
	// "t" means "trash" as in move to trash, not trash
	const approve = async () => {
		approve_loading = true;
		try {
			await axios.put(`/messages?i=${m.id}&a=a`);
			dispatch('remove');
		} catch (e) {
			$notifications = [
				...$notifications,
				{ text: 'Error occured while trying to approve entry', timeout: 3600 }
			];
		}
		approve_loading = false;
	};
	const trash = async () => {
		trash_loading = true;
		try {
			await axios.put(`/messages?i=${m.id}&a=`);
			dispatch('remove');
		} catch (e) {
			$notifications = [
				...$notifications,
				{ text: 'Error occured while trying to trash entry', timeout: 3600 }
			];
		}
		trash_loading = false;
	};
</script>

<div class="grid grid-cols-3 gap-3">
	<p class="p-4 min-w-fit shadow-md bg-rose-300 rounded-lg items-center">{m.value.m}</p>
	{#if $page.data.in}
		<Button
			on:click={approve}
			icon={approve_loading ? Loading : Check}
			circle
			name="id"
			value={m.id}
		/>
		<Button on:click={trash} icon={trash_loading ? Loading : Trash} circle name="id" value={m.id} />
	{/if}
</div>
