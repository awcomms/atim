<script lang='ts'>
    export let name: string
    export let date: Date
    export let time: boolean
</script>

<div class="rounded-xl p-2 border-solid border-black border-2 bg-rose-900 shadow-xl">
    <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
            <p>{date.getDate()} {new Intl.DateTimeFormat("en-US", {month: "long"}).format(date)}</p>
            {#if time}
                <p>{date.toLocaleTimeString()}</p>
            {/if}
        </div>
        <p>{name}</p>
    </div>
</div>