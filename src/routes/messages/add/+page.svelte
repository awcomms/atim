<script lang="ts">
	import { Button } from '$lib/components/daisy';
	import type { Snapshot } from './$types';
	import TextInput from '$lib/components/daisy/TextInput.svelte';
	import { Send, Loading } from '$lib/components/icons';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';

	let suggestion = '',
		show_suggestion = true,
		check_loading = false,
		send_loading = false,
		value = '';

	export const snapshot: Snapshot = {
		capture: () => ({ suggestion, show_suggestion, value }),
		restore: (v) => {
			({ suggestion, show_suggestion, value } = v);
		}
	};

	const send = async () => {
		check_loading = true;
		try {
			const res = await axios.get(`/messages/add?t=${value}`);
			console.info('rd', res.data);
			if (!res.data) {
				notify('Your message has been sent for review');
			} else {
				suggestion = res.data;
			}
		} catch (e) {
			console.error(e);
			notify('encountered an error while sending');
		}
		check_loading = false;
	};
</script>

<div class="space-y-2">
	<p>
		Here you may submit a tribute, condolence or goodwill message with respect to the life and death
		of Madam Atim Bassey Hogan
	</p>
	<TextInput
		on:keydown={({ key }) => {
			if (key === 'Enter') send();
		}}
		bind:value
		placeholder="You may type in a tribute or message"
		top_left_label="Tribute or condolence message"
		name="t"
	/>
	<Button on:click={send} icon={check_loading ? Loading : Send}>send</Button>
	<Button href="/messages" type="submit">see all messages</Button>

	{#if suggestion}
		{#if show_suggestion}
			<div class="space-y-2">
				<p>
					The following is an AI generated correction to your post, you are advised to use this
					instead
				</p>
				<p class="p-3 rounded-xl bg-rose-300 shadow-inner">{suggestion}</p>
				<Button
					icon={send_loading ? Loading : Send}
					on:click={async () => {
						send_loading = true;
						try {
							await axios.put('/messages/add', suggestion);
							show_suggestion = false;
							notify('Your message has been sent for review');
						} catch (e) {
							console.error(e);
							notify('encountered an error while sending');
						}
						send_loading = false;
					}}>accept</Button
				>
				<Button on:click={() => (show_suggestion = false)}>hide suggestion</Button>
			</div>
		{:else}
			<Button on:click={() => (show_suggestion = true)}>show previous suggestion</Button>{/if}
	{/if}
</div>
