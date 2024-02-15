import { KEY } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.in = event.cookies.get('in') === KEY;
	return resolve(event);
};
