import { create_id } from '$lib/util/message/create_id';
import { client } from '$lib/util/redis';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const m = data.get('m') as string;
		client.json.set(await create_id(), '$', { m });
	}
};
