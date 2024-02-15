<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/daisy';
	import TextInput from '$lib/components/daisy/TextInput.svelte';
	import { notifications } from '$lib/stores';
</script>

<form method="post"
	use:enhance={() => () => {
		$notifications = [...$notifications, { text: 'Your message has been sent for review' }];
	}}
>
	<TextInput top_left_label="Tribute or condolence message" name="m" />
	<Button type="submit">submit</Button>
</form>
