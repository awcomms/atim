import { client } from '$lib/util/redis';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/messages?a=1')
	return await res.json()

};

export const actions: Actions = {
	approve: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		console.debug('i gotcha', id);
		await client.json.set(id, '$.a', 1);
	}
};
