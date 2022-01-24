<script>
    import { startSound, pauseSound, stopSound } from "../scripts/sounds";
    import {soundDownloadProgress, currentStation} from "../scripts/appState"

    let playing=false
    let paused=false
    let stopped=true

    function start() {
        if (playing) {
            pause()
            return
        }
        startSound()
        playing=true
        paused=false
        stopped=false
    }
    function pause() {
        if (stopped) return
        pauseSound()
        playing=false
        paused=true
        stopped=false
    }
    function stop() {
        if (!stopped) stopSound()
        playing=false
        paused=false
        stopped=true
    }

    let size = 20
</script>

<div class="container">
<div class={`controller${$soundDownloadProgress===1&&$currentStation?"":" not-ready"}`}>
    <button on:click={start} class={playing?"active":""}>
        {#if playing}
            <svg width={size} height={size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <g stroke-width="200">
                <path d="m299.85 62.593v901.48"/>
                <path d="m724.15 62.593v901.48"/>
            </g>
            </svg>
        {:else}
            <svg width={size} height={size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" >
                <path d="m63.971 961.77 893.87-449.81-893.81-452.54z" stroke-width="100"/>
            </svg>
        {/if}

    </button>
    <!-- <button on:click={pause} class={paused?"active":""}>
        <svg width={size} height={size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="lightblue" stroke-linecap="round" stroke-width="100">
            <path d="m299.85 62.593v901.48"/>
            <path d="m724.15 62.593v901.48"/>
        </g>
        </svg>
    </button> -->
    <button on:click={stop} class={stopped?"active":""}>
        <svg width={size} height={size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="m63.298 61.4h898.97v898.97h-898.97z" stroke-width="100"/>
        </svg>
    </button>
</div>
{#if $soundDownloadProgress!==1}
<div class="progress-bar" >
    <div class="progress" style={`width: ${$soundDownloadProgress * 100}%;`}></div>
    <div class="text">{`Loading... ${($soundDownloadProgress * 100).toFixed(0)}%`}</div>
    
</div>
{/if}
</div>
<style>
    g, path {
        fill: var(--color-secondary);
        stroke: var(--color-secondary);
        stroke-linejoin:unset;
        stroke-linecap: round;
    }
    /* .container { */
        /* width: 100%; */
    /* } */
    .controller {
        display: flex;
        justify-content: center;
        gap: 3px;
        padding: 0.25rem;
    }

    button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0.5rem;
        border: none;
        /* border: 1px solid #add8e6; */
        /* border-radius: 3px; */
        background-color: transparent;

        cursor: pointer;
    }
    .not-ready > button {
        pointer-events: none;
        /* background-color: rgb(243, 243, 243);
        border: 1px solid rgb(243, 243, 243);
        color: grey; */
        cursor: not-allowed;
    }
    /* button:hover > :global(svg) {
        fill: red;
    }
    button.active > :global(path) {
        stroke: orange;
    } */
    .progress-bar {
        position: relative;
        height: 2rem;
        /* background-color: lightcoral; */
        border: 1px solid lightblue;
        border-radius: 3px;
    }
    .progress-bar > .text {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        padding: 0.25rem;
    }
    .progress-bar > .progress {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        background-color: lightblue;
    }

</style>