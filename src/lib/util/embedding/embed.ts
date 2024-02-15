import { openai } from '../openai';
// import { remote } from './remote';

// export const embed = async (v: string, b?: boolean) => {
//     return await remote(v, b)
// }

export const embed = async (input: string) =>
	openai.embeddings
		.create({ model: 'text-embedding-3-large', input })
		.then((r) => r.data[0].embedding);
