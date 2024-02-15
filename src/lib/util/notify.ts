import { browser } from '$app/environment';
import { arrayStore } from '$lib/util/store';

interface Notification {
    text: string,
    timeout?: number
}

interface Button {}

export type CustomNotification = Notification & {
	button?: Button & {
		text?: string;
		act: () => void;
	};
	clear_on_input?: boolean;
};

export const notify = (message: string | CustomNotification) => {
	if (browser) {
		const n: CustomNotification = typeof message === 'string' ? { text: message, timeout: 3600 } : message;
		// n.caption = new Date().toLocaleString();
		// if (!n.kind) n.kind = 'success';
		if (
			!n.timeout
			// && n.kind === 'success'
		)
			n.timeout = 1000;
		// n.lowContrast = true;
		// TODO? timeout
		notifications.update((ns) => [...ns, n]);
		setTimeout(() => {
			notifications.update((ns) => ns.filter((nf) => nf !== n));
		}, n.timeout);
	}
};

export const notifications = arrayStore<CustomNotification>('notifications', []);
