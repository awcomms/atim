<script lang='ts'>
	import { Button, TextInput } from '$lib/components/daisy';
	import type { ActionData } from './$types';

    export let form: ActionData

    let wrong = form?.wrong
</script>

<form method="post">
	<TextInput type="password" on:input={() => wrong = false} error={wrong} name="i" />
	<Button type="submit">submit</Button>
</form>
