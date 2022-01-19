<script>
    import {onMount} from "svelte"

    import {loadSamples, initSampler} from "./scripts/sounds"
    import {downloadDataset} from "./scripts/appState"

    import Map from "./components/Map.svelte"
    import Panel from "./components/Panel.svelte"

    
    function initToneJS() {
        initSampler()
        document.removeEventListener("click", initToneJS)
    }
    onMount(() => {
        downloadDataset()
        loadSamples()
        document.addEventListener("click", initToneJS)
    })

    const images_to_preload = [
        'arrow_down_thick.svg',     
        'arrow_up_thick.svg',       
        'map_marker_pin.png',       
        'map_marker_pin_blue.png',  
        'map_marker_pin_orange.png',
        'map_marker_pin_red.png',   
        'map_marker_shadow.png',    
        'options.svg',
        'pause.svg',
        'play.svg',
        'stop.svg'
    ]
</script>
<svelte:head>
    {#each images_to_preload as image}
      <!-- <link rel="preload" as="image" href={`images/${image}`} /> -->
      <link rel="prefetch" as="image" href={`images/${image}`} />
    {/each}
</svelte:head>
<main>
    <Panel />
    <Map />
</main>

<style>
    main {
        background-color: steelblue;
        position: relative;
    }
</style>