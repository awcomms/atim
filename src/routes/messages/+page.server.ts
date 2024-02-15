import { message_index as index, items_per_page } from '$lib/constants';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const res = await search({
		index,
		page: 0,
		query: locals.in ? '-(@a:[1 1])' : '*',
		options: { RETURN: ['m', 'a'] }
	});
	return {...res, pages: Math.round(res.total / items_per_page)};
};

export const actions: Actions = {
	approve: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		console.debug('i gotcha', id);
		await client.json.set(id, '$.a', 1);
	}
};
