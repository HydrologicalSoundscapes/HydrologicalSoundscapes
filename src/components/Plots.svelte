<script>
  import { currentStation, currentStationPS } from "../scripts/appState";
  import { slide } from "svelte/transition";
  let plot_mean_container,
    plot_max_container,
    plot_min_container,
    plot_size_container;
  let initialized = false;
  $: {
    if (
      plot_mean_container &&
      plot_min_container &&
      plot_max_container &&
      plot_size_container &&
      $currentStation &&
      $currentStationPS
    ) {
      if (!initialized) {
        initialized = true;
        plot_mean_container.append($currentStationPS.meanMonthlyPS.plot);
        plot_max_container.append($currentStationPS.maxMonthlyPS.plot);
        plot_min_container.append($currentStationPS.minMonthlyPS.plot);
        plot_size_container.append($currentStationPS.sizePS.plot);
      }
    } else {
      initialized = false;
      if (plot_mean_container) plot_mean_container.innerHTML = "";
      if (plot_max_container) plot_max_container.innerHTML = "";
      if (plot_min_container) plot_min_container.innerHTML = "";
      if (plot_size_container) plot_size_container.innerHTML = "";
    }
  }
</script>

<div
  class="container"
  class:station={!!$currentStation}
  transition:slide
  id="plots-panel"
>
  <!-- {#if $currentStation} -->
  <div class="data">
    <div class="header">
      {$currentStation ? $currentStation.info.label : ""}
    </div>
    <div class="plots">
      <div class="mean">
        <label for="mean">Monthly flow (in % of total annual flow)</label>
        <div id="mean" class="plot" bind:this={plot_mean_container} />
      </div>
      <div class="max">
        <label for="mean">Annual largest flood falls in ...</label>
        <div id="max" class="plot" bind:this={plot_max_container} />
      </div>
      <div class="min">
        <label for="mean">Annual lowest flow falls in ...</label>
        <div id="min" class="plot" bind:this={plot_min_container} />
      </div>
      <div class="size">
        <label for="size">Average flow (in m<sup>3</sup>/s)</label>
        <div id="size" class="plot" bind:this={plot_size_container} />
      </div>
    </div>
  </div>
  <!-- {:else} -->
  <div class="no-data">
    <p>Click on a hydrometric station on the map</p>
  </div>
  <!-- {/if} -->
</div>

<style>
  .header {
    /* position: absolute;
    inset: 0 auto auto auto; */
    background-color: var(--color-primary);
    color: white;
    font-weight: bold;
    padding: 0.125rem 0.25rem;
    border-radius: 0 0 5px 5px;
    text-align: center;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  }
  /* .container > div {
    display: none;
  }
  .container.station div:not(.no-data) {
    display: none;
  } */
  .container {
    position: absolute;
    z-index: 9997;
    top: 60px;
    bottom: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    /* width: min(50%, 700px); */
    width: 700px;
    background-color: var(--color-background);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);

    display: flex;
    flex-direction: column;
    align-items: center;
    /* box-shadow: 5px -5px 20px 0 rgba(0, 0, 0, 0.5); */
  }
  .container > div {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container > .no-data {
    visibility: visible;
  }
  .container.station > .data {
    visibility: visible;
  }
  .container.station > .no-data {
    visibility: hidden;
  }
  .plots {
    display: grid;
    grid-template-columns: 13% 87%;
    grid-template-areas:
      "size mean"
      "size max"
      "size min";
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
  .min,
  .max,
  .mean {
    display: flex;
    flex-direction: column;
  }
  .size {
    grid-area: size;
    display: flex;
    position: relative;
  }
  label {
    color: var(--color-secondary);
  }
  .size > label {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    text-align: center;
  }
  @media screen and (max-width: 950px) {
    .container {
      width: 100%;
      bottom: unset;
    }
  }
  @media screen and (max-width: 700px) {
    .header {
      font-size: 3vw;
    }
    label {
      /* font-size: 0.8rem; */
      font-size: 2.5vw;
    }
  }
  .plot {
    margin-right: 5%;
  }
  .plot#size {
    margin-right: 10%;
  }
  .no-data {
    position: absolute;
    inset: 0;
    justify-content: center;
    font-size: 0.9rem;
  }
</style>
