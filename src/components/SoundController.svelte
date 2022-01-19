<script>
    import { onMount } from "svelte";
    import { startSound, pauseSound, stopSound } from "../scripts/sounds";
    import {soundDownloadProgress, uiOptionPanel, currentStation} from "../scripts/appState"
    
    let ready_steps = {"piano-loud": false, "piano-med": false, "bass": false}
    let ready = false
    onMount(()=>{
        document.addEventListener("tone-ready", (e) => {
            ready_steps[e.detail] = true
            ready = Object.entries(ready_steps).reduce((a, c)=> a && c[1], true)
        })
    })

    let playing=false
    let paused=false
    let stopped=true

    function start() {
        if (playing) return
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
    function options() {
        // stop()
        // options_panel = !options_panel
        $uiOptionPanel = !$uiOptionPanel
    }
    let options_panel=false
    let arrangement = "Am"

</script>

<div class="container">
<div class={`controller${$soundDownloadProgress===1&&$currentStation?"":" not-ready"}`}>
    <button on:click={start} class={playing?"active":""}>
        <img src="./images/play.svg" alt="play sound" width="25px">
    </button>
    <button on:click={pause} class={paused?"active":""}>
        <img src="./images/pause.svg" alt="pause sound" width="25px">
    </button>
    <button on:click={stop} class={stopped?"active":""}>
        <img src="./images/stop.svg" alt="stop sound" width="25px">
    </button>
    <button on:click={options} class={$uiOptionPanel?"active":""} >
        <img src="./images/options.svg" alt="stop sound" width="25px">
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
    /* .container { */
        /* width: 100%; */
    /* } */
    .controller {
        display: flex;
        justify-content: center;
        gap: 3px;
        padding: 0.25rem;
    }
    .not-ready > button {
        pointer-events: none;
        background-color: rgb(243, 243, 243);
        border: 1px solid rgb(243, 243, 243);
        color: grey;
        cursor:not-allowed;
    }
    button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0.5rem;
        border: 1px solid #add8e6;
        border-radius: 3px;
        background-color: white;

        cursor: pointer;
    }
    button:hover {
        background-color: rgb(226, 242, 248);
    }
    button.active {
        background-color: rgb(226, 242, 248);
    }
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