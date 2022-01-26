<script>
    import {currentStation, currentStationPS} from "../scripts/appState"
    import {slide} from "svelte/transition"
    let plot_mean_container, plot_max_container, plot_min_container, plot_size_container
    let initialized=false
    $: {
        console.log("$currentStation", $currentStation)
        if (plot_mean_container && plot_max_container && $currentStation && $currentStationPS) {
            console.log("$currentStationPlots", $currentStationPS)
            if (!initialized) {
                initialized = true
                plot_mean_container.append($currentStationPS.meanMonthlyPS.plot)
                plot_max_container.append($currentStationPS.maxMonthlyPS.plot)
                plot_min_container.append($currentStationPS.minMonthlyPS.plot)
                plot_size_container.append($currentStationPS.sizePS.plot)
            } 
        }
    }
    $:{
        console.log("*********************************")
        console.log($currentStation?.data.size)
        console.log(Math.log($currentStation?.data.size))
    }
</script>

<div class="container" transition:slide>
    {#if $currentStation}
        <!-- <div class="header">
            {$currentStation.info.label}
        </div> -->
        <div class="plots">
        <div class="mean">
            <label for="mean">Monthly streamflow average (in % of annual streamflow)</label>
            <div id="mean" class="plot" bind:this={plot_mean_container}>
    
            </div>
        </div>
        <div class="max">
            <label for="mean">Frequency of annual daily maxima</label>
            <div id="max" class="plot" bind:this={plot_max_container}>
            
            </div>
        </div>
        <div class="min">
            <label for="mean">Frequency of annual minima</label>
            <div id="min" class="plot" bind:this={plot_min_container}>
            
            </div>
        </div>
        <div class="size">
            <label for="size">Average streamflow (in m<sup>3</sup>/s)</label>
            <div id="size" class="plot" bind:this={plot_size_container}></div>
        </div>
        </div>

    {:else}
        <div class="no-data">
            <p>Click on a hydrometric station on the map</p>
        </div>
    {/if}
</div>


<style>
    .container {
        position: absolute;
        z-index: 9997;
        top: 60px;
        bottom: 0;
        max-height: calc(100vh - 60px); 
        overflow-y: auto;
        width: min(50%, 700px);
        background-color: var(--color-background);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        /* box-shadow: 5px -5px 20px 0 rgba(0, 0, 0, 0.5); */
    }
    .plots {
        display: grid;
        grid-template-columns: 1fr 6fr;
        grid-template-areas: 
        "size mean"
        "size max"
        "size min"
        ;
        align-items: center;
        justify-items: end;
        padding: 0.5rem;
    }
    .mean {
        grid-area: mean;
    }
    .max {
        grid-area: max;
    }
    .min {
        grid-area: min;
    }
    .min, .max, .mean {
        display: flex;
        flex-direction: column;
    }
    .size {
        grid-area: size;
        display: flex;
        position: relative
    }
    label {
        /* font-weight: bold; */
        color: var(--color-secondary);
        /* text-align: center; */
    }
    .size > label {
        writing-mode: vertical-lr; 
        transform: rotate(180deg);
        text-align: center;
    }
    @media screen and (max-width: 1200px) {
        .container {
            width: 100%;
            bottom: unset;
        }
        label {
            font-size: 0.8rem;
        }
    }
    /* .header {
        font-weight: bold;
        text-align: center;
        padding: 0.5rem;
    } */
    .plot {
        margin-right: 1rem;
    }
    .no-data {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
    }
    .no-data > p {
        text-align: center;
    }
</style>