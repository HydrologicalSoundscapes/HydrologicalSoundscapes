<script>
    import {currentStation, uiOptionPanel, currentStationPS} from "../scripts/appState"
    import SoundController from "./SoundController.svelte"
    import Plots from "./Plots.svelte"
    import Options from "./options.svelte"
    // export let station=null
    let panel_opened = true

    $: {
        console.log("selected station is: ", $currentStation)
        console.log("selected PS is: ", $currentStationPS)
    }
</script>


<div class="wrapper">
    <div class="header">
        <div class="title">
            Hydrological
            <br>
            Soundscapes
        </div>
        <SoundController />
        <div class="toggle-panel">
            <button on:click={()=>panel_opened=!panel_opened}>
                {#if panel_opened}
                    <img src="./images/arrow_up_thick.svg" alt="close main panel" width="50px">
                {:else}
                    <img src="./images/arrow_down_thick.svg" alt="open main panel" width="50px">
                {/if}
            </button>
        </div>
    </div>

    {#if $uiOptionPanel}
        <Options />
    {/if}
    {#if panel_opened}
        <div class="content">
            {#if $currentStation}
                <div class="header">
                    {$currentStation.info.label}
                </div>
                <!-- <Plots station={$appStateStore.station}/> -->
                <Plots/>
            {:else}
            <div class="no-data">
                <p>Click on a hydrometric station on the map</p>
            </div>
            {/if}
        </div>
    {/if}
    

</div>

<style>

    .wrapper {
        --margin: 12px;

        position: absolute;
        z-index: 9999;
        top: var(--margin);
        right: var(--margin);

        width: min(900px, 50%);
        background-color: rgba(255, 255, 255, 0.9);

        border-radius: 3px;
        box-shadow: 5px -5px 20px 0 rgba(0, 0, 0, 0.5);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (max-width: 1200px) {
        .wrapper {

            left: calc(var(--margin)*2+30px);
            right: var(--margin);
            width: calc(100% - var(--margin) * 3 - 30px);
            /* height: calc(50% - var(--margin) * 2); */
        }
    }


    .no-data {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .no-data > p {
        text-align: center;
    }

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        border-bottom: 1px solid lightblue;
        padding: 0.5rem;
    }
    /* .header > * {
        width: 100%;
        flex-shrink: 1;
    } */
    .title {
        color: lightblue;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        /* width: 100%; */
    }
    .toggle-panel  {
        display: flex;
        justify-content: flex-end;
        padding-right: 0.5rem;
        /* width: 100%; */
    }
    button {
        all: unset;
        cursor: pointer;
    }

</style>