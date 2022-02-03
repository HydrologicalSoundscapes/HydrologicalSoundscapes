<script>
  import { startSound, pauseSound, stopSound } from "../scripts/sounds";
  import {
    soundDownloadProgress,
    currentStation,
    currentStationPS,
  } from "../scripts/appState";

  let playing = false;
  let stopped = true;

  function start() {
    if (playing) {
      pause();
      return;
    }
    startSound();
    playing = true;
    stopped = false;
  }
  function pause() {
    if (stopped) return;
    pauseSound();
    playing = false;
    stopped = false;
  }
  function stop() {
    if (!stopped) {
      stopSound();
    }
    playing = false;
    stopped = true;
    $currentStationPS.meanMonthlyPS.plot.highlight(null);
    $currentStationPS.minMonthlyPS.plot.highlight(null);
    $currentStationPS.maxMonthlyPS.plot.highlight(null);
  }

  let size = 20;
</script>

<div
  class={`controller${
    $soundDownloadProgress === 1 && $currentStation ? "" : " not-ready"
  }`}
  id="sound-controller"
>
  <button on:click={start} class={playing ? "active" : ""}>
    {#if playing}
      <svg
        width={size}
        height={size}
        version="1.1"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke-width="200">
          <path d="m299.85 62.593v901.48" />
          <path d="m724.15 62.593v901.48" />
        </g>
      </svg>
    {:else}
      <svg
        width={size}
        height={size}
        version="1.1"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="m63.971 961.77 893.87-449.81-893.81-452.54z"
            stroke-width="100"
          />
        </g>
      </svg>
    {/if}
  </button>
  <button on:click={stop} class={stopped ? "active" : ""}>
    <svg
      width={size}
      height={size}
      version="1.1"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m63.298 61.4h898.97v898.97h-898.97z" stroke-width="100" />
      </g>
    </svg>
  </button>
</div>

<style>
  g {
    fill: var(--color-secondary);
    stroke: var(--color-secondary);
    stroke-linejoin: unset;
    stroke-linecap: round;
  }
  .controller {
    display: flex;
    justify-content: center;
    /* gap: 3px;
    padding: 0.25rem;
    gap: 3px;
    padding: 0.25rem; */
  }

  button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.5rem;
    border: none;

    background-color: transparent;

    cursor: pointer;
  }
  .not-ready > button {
    pointer-events: none;
    cursor: not-allowed;
  }

  .not-ready g {
    fill: var(--color-disabled);
    stroke: var(--color-disabled);
  }
  /* @media screen and (max-width: 800px) {
    .controller {
      gap: 0px;
      padding: 0;
    }
  } */
</style>
