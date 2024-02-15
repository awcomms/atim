<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/daisy';
	import TextInput from '$lib/components/daisy/TextInput.svelte';
	import { notifications, notify } from '$lib/util/notify';
</script>

<form method="post"
	use:enhance={() => () => {
			notify('Your message has been sent for review')
	}}
>
	<div class="space-y-2">
		<p>Here you may submit a tribute, condolence or goodwill message with respect to the life and death of Madam Atim Bassey Hogan</p>
		<TextInput placeholder="You may type in a tribute or message" top_left_label="Tribute or condolence message" name="m" />
		<Button type="submit">send</Button>
		<Button href="/messages" type="submit">see all messages</Button>
	</div>
</form>
