<script>
  import { uiPlotPanel, uiOptionPanel, uiInfoPanel } from "../scripts/appState";
  import SoundController from "./SoundController.svelte";

  let svg_size = 25;
</script>

<div class="container">
  <div class="left">
    <div class="title" id="logo-title">
      <img
        src="/images/hydrosound_icon_96.png"
        alt="Hydrological soundscapes icon"
      />
      <span>Hydrological Soundscapes</span>
    </div>
  </div>
  <div class="center">
    <SoundController />
  </div>
  <div class="right">
    <button on:click={() => ($uiPlotPanel = !$uiPlotPanel)}>
      <svg
        id="toggle-plots"
        width={svg_size}
        height={svg_size}
        version="1.1"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke-width="250" class:active={$uiPlotPanel}>
          <path d="m215.55 957.62v-521.97" />
          <path d="m515.63 957.62v-886.91" />
          <path d="m815.72 957.62v-659.53" />
        </g>
      </svg>
    </button>
    <button on:click={() => ($uiOptionPanel = !$uiOptionPanel)}>
      <svg
        id="toggle-options"
        width={svg_size}
        height={svg_size}
        version="1.1"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke-width="100"
          stroke-linecap="round"
          class:active={$uiOptionPanel}
        >
          <path d="m77.706 260.62h868.84" />
          <path
            d="m371.72 264.66a56.569 56.569 0 0 1-56.569 56.569 56.569 56.569 0 0 1-56.569-56.569 56.569 56.569 0 0 1 56.569-56.569 56.569 56.569 0 0 1 56.569 56.569z"
          />
          <path d="m77.706 509.12h868.84" />
          <path
            d="m842.45 513.16a56.569 56.569 0 0 1-56.569 56.569 56.569 56.569 0 0 1-56.569-56.569 56.569 56.569 0 0 1 56.569-56.569 56.569 56.569 0 0 1 56.569 56.569z"
          />
          <path d="m77.706 757.61h868.84" />
          <path
            d="m476.77 761.65a56.569 56.569 0 0 1-56.569 56.569 56.569 56.569 0 0 1-56.569-56.569 56.569 56.569 0 0 1 56.569-56.569 56.569 56.569 0 0 1 56.569 56.569z"
          />
        </g>
      </svg>
    </button>
    <button on:click={() => ($uiInfoPanel = !$uiInfoPanel)}>
      <svg
        id="toggle-about"
        width={svg_size}
        height={svg_size}
        version="1.1"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class:active={$uiInfoPanel}>
          <path
            d="m617.19 249.88a86.737 86.737 0 0 1-86.737 86.737 86.737 86.737 0 0 1-86.737-86.737 86.737 86.737 0 0 1 86.737-86.737 86.737 86.737 0 0 1 86.737 86.737z"
          />
          <path
            d="m338.6 442.16 8.0452-40.743s94.176-41.74 134.56-39.08c40.384 2.6608 94.407 18.712 106.64 71.175 9.1494 39.246-13.157 126.27-30.288 189.25-12.304 45.233-29.657 114.74-24.609 137.36 5.048 22.616 23.02 27.087 38.175 28.27 17.037 1.3304 67.832-13.636 67.832-13.636l-9.4649 42.239s-65.623 27.273-85.815 32.594c-20.192 5.3215-100.64 10.31-130.93-23.947-30.115-34.062-38.491-59.202-22.085-128.38 16.406-69.179 32.496-122.06 43.854-168.62 11.358-46.563 11.831-81.485-5.5212-92.794-16.973-11.061-36.598-9.4789-56.474-4.9889-12.883 2.9103-33.916 11.308-33.916 11.308z"
          />
          <path
            d="m977.14 512.57a465.71 465.71 0 0 1-465.71 465.71 465.71 465.71 0 0 1-465.71-465.71 465.71 465.71 0 0 1 465.71-465.71 465.71 465.71 0 0 1 465.71 465.71z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="64"
            style="paint-order:fill markers stroke"
          />
        </g>
      </svg>
    </button>
  </div>
</div>

<style>
  .container {
    position: absolute;
    z-index: 9999;
    width: 100%;
    height: 60px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;

    padding: 0 1rem 0 0.5rem;

    /* background-color: var(--color-background); */
    background-color: white;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }
  .container > .center {
    justify-self: center;
  }
  .container > .right {
    justify-self: end;
  }

  .title {
    color: var(--color-primary);
    font-size: 1.5rem;
    font-weight: bold;
    justify-self: start;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }
  .title > span {
    line-height: 1;
  }
  .title > img {
    height: 40px;
  }
  .right {
    justify-self: end;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  g {
    fill: var(--color-primary);
    stroke: var(--color-primary);
    stroke-linejoin: unset;
  }
  g.active {
    fill: var(--color-secondary);
    stroke: var(--color-secondary);
  }

  @media screen and (max-width: 800px) {
    .container {
      padding: 0 0.5rem 0 0.25rem;
    }
    .title {
      font-size: 0.9rem;
      gap: 0.125rem;
    }

    .title > img {
      height: 25px;
    }

    .right {
      gap: 0.5rem;
    }
  }
</style>
