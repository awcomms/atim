<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/daisy';
	import TextInput from '$lib/components/daisy/TextInput.svelte';
	import { notifications } from '$lib/util/notify';
</script>

<form method="post"
	use:enhance={() => () => {
			notify('Your message has been sent for review')
	}}
>
	<TextInput top_left_label="Tribute or condolence message" name="m" />
	<Button type="submit">submit</Button>
</form>
