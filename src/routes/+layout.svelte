<script lang="ts">
	import '../style.css';
	import { notifications } from '$lib/util/notify';
	import Toast from '$lib/components/daisy/Toast.svelte';
	import { Nav } from '$lib/components/daisy';
	import {onMount} from 'svelte'
	import { dev } from '$app/environment'

 onMount(()=>{	navigator.serviceWorker.register('/service-worker.js', {type: dev ? 'module' : 'classic'}).then((swr) => {
		swr.pushManager.subscribe().then((ps) => console.info('ps', ps));
	});})
</script>

{#each $notifications as n}
	<Toast {...n} />
{/each}

<Nav />

<div class="p-4">
	<slot />
</div>
