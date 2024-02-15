import { embed } from '$lib/util/embedding/embed.js';
import { create_id } from '$lib/util/message/create_id.js';
import { openai } from '$lib/util/openai';
import { client } from '$lib/util/redis/index.js';
import { error, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET = async ({ url, fetch }) => {
	try {
		const body = url.searchParams.get('t');
		const res = openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `Correct the following for grammatical accuracy, if there is no need for correction respond only with the word "none": """${body}"""`
				}
			],
			seed: 432,
			model: 'gpt-3.5-turbo-0125'
		});
		const res_text = (await res).choices[0].message.content;
		if (!res_text || res_text?.toLowerCase() === 'none') {
            await fetch('/messages/add', {method: "PUT", body})
			return new Response()
		}
		return text(res_text);
	} catch (e) {
		console.error('message check error', e);
		throw error(500);
	}
};

export const PUT: RequestHandler = async ({ request }) => {
	try {
		const m = await request.text();
		await client.json.set(await create_id(), '$', { v: await embed(m), m });
		return new Response();
	} catch (e) {
		console.error(e);
		throw error(500);
	}
};
