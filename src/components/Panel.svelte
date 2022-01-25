<script>
    import {uiOptionPanel, uiPlotPanel, currentStationPS} from "../scripts/appState"
    import Plots from "./Plots.svelte"
    import Options from "./Options.svelte"
    import Header from "./Header.svelte"
    import Loading from "./Loading.svelte";

    $: {
        // this is needed to enforce change in sounds when plots are hidden
        console.log("$currentStationPS", $currentStationPS)
    }
</script>

<div class="wrapper">
    <Header />

    {#if $uiOptionPanel}
        <Options />
    {/if}
    {#if $uiPlotPanel}
        <Plots />
    {/if}

    <Loading />
</div>

<style>
</style>