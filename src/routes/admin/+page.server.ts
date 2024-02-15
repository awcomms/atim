import { KEY, PASSWORD } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.in) return redirect(302, '/messages');
	return;
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
            console.debug('h')
            const data = await request.formData();
		const i = data.get('i');
		if (i === PASSWORD) {
			cookies.set('in', KEY, { path: '/' });
			locals.in = true;
            console.debug('h2')
			return redirect(302, '/messages'); //TODO
		} else {
			return fail(401, { wrong: true });
		}
	}
};
