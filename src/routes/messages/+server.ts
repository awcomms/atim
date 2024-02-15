import { client } from '$lib/util/redis';
import { error, json } from '@sveltejs/kit';
import { message_index as index, items_per_page } from '$lib/constants';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/redis/search';

export const PUT: RequestHandler = async ({ locals, url }) => {
	try {
		if (!locals.in) throw error(401);
		const id = url.searchParams.get('i') as string;
		const a = url.searchParams.get('a') as string
		console.debug('id i', id);
		await client.json.set(id, `$.a`, a);
		return new Response();
	} catch (e) {
		console.error('server error for act: ', e);
		throw error(500);
	}
};

export const GET: RequestHandler = async ({ locals, url }) => {
	const res = await search({
		index,
		page: Number(url.searchParams.get('p') || 0),
		query: locals.in ? '-(@a:[1 1])' : '@a:[1 1]',
		options: { RETURN: ['m', 'a'] }
	});
	console.debug('rress', res)
	return json({ ...res, pages: Math.round(res.total / items_per_page) });
};
