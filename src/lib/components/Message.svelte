<script lang="ts">
	export let m: { id: string; value: { m: string, a: 0 | 1 } };
	import { page } from '$app/stores';
	import { notify } from '$lib/util/notify';
	import { Button } from './daisy';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';

	import { Checkmark, Loading, X } from './icons';

	const dispatch = createEventDispatcher();

	let approve_loading = false
		// trash_loading = false
		;

	// a is an indication of what action to take on the message
	// "a" means "approve"
	// "t" means "trash" as in move to trash, not trash
	const approve = async () => {
		approve_loading = true;
		try {
			await axios.put(`/messages?i=${m.id}&a=${Number(!m.value.a)}`);
			dispatch('remove');
		} catch (e) {
			notify('Error occured while trying to approve entry')
		}
		approve_loading = false;
	};
	// const trash = async () => {
	// 	trash_loading = true;
	// 	try {
	// 		await axios.put(`/messages?i=${m.id}&a=0`);
	// 		dispatch('remove');
	// 	} catch (e) {
	// 		notify('Error occured while trying to trash entry')
	// 	}
	// 	trash_loading = false;
	// };
</script>

<div class="grid grid-cols-2 gap-3">
	<p class="p-4 min-w-fit shadow-md bg-rose-300 rounded-lg items-center">{m.value.m}</p>
	{#if $page.data.in}
		<Button
			on:click={approve}
			icon={approve_loading ? Loading : m.value.a ? X : Checkmark}
			circle
			name="id"
			value={m.id}
		/>
		
	{/if}
</div>
