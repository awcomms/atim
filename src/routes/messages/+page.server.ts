import { message_index as index } from '$lib/constants';
import { search } from '$lib/util/redis/search';

export const load = async () => {
	// const res = await client.ft.search(index, '*', {
	// 	LIMIT: { from: 0, size: items_per_page },
	// 	RETURN: ['m']
	// })
    const res = await search({index, page: 0})
    return {
        _: res.documents
    }
};