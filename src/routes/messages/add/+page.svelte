<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/daisy';
	import TextInput from '$lib/components/daisy/TextInput.svelte';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';

	let suggestion = '',
		show_suggestion = false,
		loading = false,
		value = '';
</script>

<div class="space-y-2">
	<p>
		Here you may submit a tribute, condolence or goodwill message with respect to the life and death
		of Madam Atim Bassey Hogan
	</p>
	<TextInput
		on:input={() => (show_suggestion = false)}
		bind:value
		placeholder="You may type in a tribute or message"
		top_left_label="Tribute or condolence message"
		name="t"
	/>
	<Button type="submit">send</Button>
	<Button
		on:click={async () => {
			const res = await axios.get(`messages/add?t=${value}`);
			console.info('rd', res.data);
			if (!res.data) {
				notify('Your message has been sent for review');
			} else {
				suggestion = res.data;
			}
		}}
		href="/messages"
		type="submit">see all messages</Button
	>

	{#if suggestion}
		{#if show_suggestion}
			<div class="space-y-2">
				<p>
					The following is an AI generated correction to your post, you are advised to use this
					instead
				</p>
				<p class="p-3 rounded-xl bg-rose-300 shadow-inner"></p>
				<Button
					on:click={async () => {
						await axios.put('/messages/add', suggestion);
						notify('Your message has been sent for review');
					}}>accept</Button
				>
				<Button on:click={() => (show_suggestion = false)}>ignore suggestion</Button>
			</div>
		{:else}
			<Button on:click={() => (show_suggestion = true)}>show previous suggestion</Button>{/if}
	{/if}
</div>
