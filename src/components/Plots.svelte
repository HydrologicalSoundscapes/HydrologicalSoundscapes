<script>
    // import {monthlyBarPlot} from "../scripts/viz_and_sound"
    import {currentStation, currentStationPS} from "../scripts/appState"

    // export let station=null
    let plot_mean_container, plot_max_container
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
            } 
        }
    }
</script>




<div class="plot" bind:this={plot_mean_container}>

</div>
<div class="plot" bind:this={plot_max_container}>

</div>


<style>
    .plot {
        margin-right: 1rem;
    }
    
</style>