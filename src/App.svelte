<script>
  import { onMount } from "svelte";

  import { loadSamples, initSampler } from "./scripts/sounds";
  import { downloadDataset } from "./scripts/appState";

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
  <Panel />
  <Map />
</main>

<style>
  main {
    position: relative;
  }
</style>
