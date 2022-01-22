<script>
    // import {monthlyBarPlot} from "../scripts/viz_and_sound"
    import {currentStation, currentStationPS} from "../scripts/appState"
    // import {panPiano} from "../scripts/sounds"
    // export let station=null
    let plot_mean_container, plot_max_container, plot_min_container
    // let plot
    let initialized=false
    $: {
        console.log("$currentStation", $currentStation)
        if (plot_mean_container && plot_max_container && $currentStation && $currentStationPS) {
            console.log("$currentStationPlots", $currentStationPS)
            // plot = monthlyBarPlot(station)
            if (!initialized) {
                initialized = true
                plot_mean_container.append($currentStationPS.meanMonthlyPS.plot)
                plot_max_container.append($currentStationPS.maxMonthlyPS.plot)
                plot_min_container.append($currentStationPS.minMonthlyPS.plot)
            } 
        }
    }
    // let panning
</script>


<!-- <button on:click={()=>panPiano(panning)}>Pan Pian</button>
<div>Panning: {panning}</div>
<input type="range" name="bpm" id="bpm" bind:value={panning} min="-1" max="1" step="0.05"> -->


<div class="plot" bind:this={plot_mean_container}>

</div>
<div class="plot" bind:this={plot_max_container}>

</div>
<div class="plot" bind:this={plot_min_container}>

</div>


<style>
    .plot {
        margin-right: 1rem;
    }
    
</style>