import { message_index as index } from '$lib/constants';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
	// const res = await client.ft.search(index, '*', {
	// 	LIMIT: { from: 0, size: items_per_page },
	// 	RETURN: ['m']
	// })
    const res = await search({index, page: 0, query: locals.in ? "-(@a:[1 1])" :  "@a:[1 1]", options: {RETURN: ['m']}})
    return {
        _: res.documents
    }
};

export const actions: Actions = {
    approve: async ({request}) => {
        const data = await request.formData()
        const id = data.get('id') as string
        await client.json.set(id, '$.a', 1)
    }
}