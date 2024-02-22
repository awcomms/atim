import { client } from '$lib/util/redis';
import { error, json } from '@sveltejs/kit';
import { message_index as index, items_per_page, message_id_prefix } from '$lib/constants';
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
	// const q = url.searchParams.get('q');
	const a = typeof url.searchParams.get('a') === "string";
	console.debug('all messages', await client.keys(`${message_id_prefix}*`))
	const res = await search({
		index,
		// ...(q && { B: Buffer.from(new Float32Array(await embed(q)).buffer) }),
		// page: Number(url.searchParams.get('p') || 0),
		page: 0,
		// query: locals.in && a ? '-(@a:1)' : '@a:1',
		options: { RETURN: ['m', 'a'] }
	});
	return json({ ...res, pages: Math.round(res.total / items_per_page) });
};
