import { REDIS } from '$env/static/private';
import { setup } from './setup';
import { createClient } from 'redis';

export const client = await createClient({ url: REDIS });

client.on('error', (e) => console.error('redis client error', e));
try {
	await client.connect();
} catch (e) {
	console.error('client connect error', e);
}
await setup();