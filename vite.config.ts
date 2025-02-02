import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import ssl from "@vitejs/plugin-basic-ssl"

export default defineConfig({
	plugins: [sveltekit(), ssl()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
