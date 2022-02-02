<script>
  import { onMount } from "svelte";

  import { loadSamples, initSampler } from "./scripts/sounds";
  import {
    downloadDataset,
    uiWelcomePanel,
    uiTutorial,
  } from "./scripts/appState";

  import Tutorial from "./components/Tutorial.svelte";
  import Welcome from "./components/Welcome.svelte";
  import Map from "./components/Map.svelte";
  import Panel from "./components/Panel.svelte";

  function initToneJS() {
    initSampler();
    document.removeEventListener("click", initToneJS);
  }
  onMount(() => {
    downloadDataset();
    loadSamples();
    document.addEventListener("click", initToneJS);
  });
</script>

<main>
  {#if $uiTutorial}
    <Tutorial />
  {/if}
  {#if $uiWelcomePanel}
    <Welcome />
  {/if}
  <Panel />
  <Map />
</main>

<style>
  main {
    position: relative;
  }
</style>
