import { client } from '$lib/util/redis';
import { error, json } from '@sveltejs/kit';
import { message_index as index, items_per_page } from '$lib/constants';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/redis/search';
import { embed } from '$lib/util/embedding/embed';

export const PUT: RequestHandler = async ({ locals, url }) => {
	try {
		if (!locals.in) throw error(401);
		const id = url.searchParams.get('i') as string;
		const a = url.searchParams.get('a') as string;
		console.debug('id, a', id, a);
		await client.json.set(id, `$.a`, Number(a));
		return new Response();
	} catch (e) {
		console.error('server error for act: ', e);
		throw error(500);
	}
};

export const GET: RequestHandler = async ({ locals, url }) => {
	const q = url.searchParams.get('q');
	const a = url.searchParams.get('a') as string;
	console.debug('a', a)
	const options = {
		index,
		...(q && { B: Buffer.from(new Float32Array(await embed(q)).buffer) }),
		page: Number(url.searchParams.get('p') || 0),
		// query: `@a:[${a} ${a}]`,
		// query: '*',
		options: { RETURN: ['m', 'a'] }
	};
	if (a === ('1' || '0') && locals.in) options.query = `@a:[${a} ${a}]`;
	const res = await search(options);
	return json({ ...res, pages: Math.round(res.total / items_per_page) });
};
