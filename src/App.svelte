<script>
  import { onMount } from "svelte";

  import { init_i18n } from "./scripts/i18n";
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
  onMount(async () => {
    await init_i18n();
    is_ready = true;
    downloadDataset();
    loadSamples();
    document.addEventListener("click", initToneJS);
  });

  let is_ready = false;
</script>

<main>
  {#if !is_ready}
    loading...
  {:else}
    {#if $uiTutorial}
      <Tutorial />
    {/if}
    {#if $uiWelcomePanel}
      <Welcome />
    {/if}
    <Panel />
    <Map />
  {/if}
</main>

<style>
  main {
    position: relative;
  }
</style>
