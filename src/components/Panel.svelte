<script>
    import {uiOptionPanel, uiPlotPanel} from "../scripts/appState"
    import Plots from "./Plots.svelte"
    import Options from "./Options.svelte"
    import Header from "./Header.svelte"
    import Loading from "./Loading.svelte";
    
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