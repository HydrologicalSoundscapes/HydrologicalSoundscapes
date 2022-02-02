<script>
  import { uiPlotPanel, uiOptionPanel } from "../scripts/appState";
  import SoundController from "./SoundController.svelte";

  let svg_size = 28;
</script>

<div class="container">
  <div class="left">
    <div class="title">
      <img
        src="/images/hydrosound_icon_96.png"
        alt="Hydrological soundscapes icon"
      />
      <span>Hydrological Soundscapes</span>
    </div>
  </div>
  <SoundController />
  <div class="right">
    <button on:click={() => ($uiPlotPanel = !$uiPlotPanel)}>
      <svg
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
    <button
      on:click={() => ($uiOptionPanel = !$uiOptionPanel)}
      class={$uiOptionPanel ? "active" : ""}
    >
      <svg
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

    background-color: var(--color-background);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }
  .title {
    color: var(--color-primary);
    /* color:  black; */
    font-size: 1.5rem;
    font-weight: bold;
    justify-self: start;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    /* background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUwMCIgaGVpZ2h0PSIxMDI0IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1NTAwIDEwMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTk5YzBlIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Im0zNTIuMzUgNzM1LjA5djIzNS42NSIgc3Ryb2tlLXdpZHRoPSIxMDAiLz48cGF0aCBkPSJtNTU0LjA5IDU5OS4ydjM3MS41NCIgc3Ryb2tlLXdpZHRoPSIxMDAiLz48ZyBzdHJva2Utd2lkdGg9IjEwMCI+PHBhdGggZD0ibTc2OS41OCAyODAuMDF2NjkwLjczIi8+PHBhdGggZD0ibTk4MC41IDE3MC45M3Y3OTkuOCIvPjxwYXRoIGQ9Im0xMTgyLjIgMzk5LjIzdjU3MS41MSIvPjxwYXRoIGQ9Im0xMzk3LjcgNjM1LjV2MzM1LjI0Ii8+PHBhdGggZD0ibTE2MDQuMSA4MDEuMTh2MTczLjA0Ii8+PHBhdGggZD0ibTE4MDUuOCA0NTYuMTV2NTE0LjU4Ii8+PHBhdGggZD0ibTIwMjEuMyA1NS44MzF2OTE0LjkxIi8+PHBhdGggZD0ibTIyMzIuMiAyNjMuODJ2NzA2LjkxIi8+PC9nPjxwYXRoIGQ9Im0yNDMzLjkgNDQwLjE0djUzMC42IiBzdHJva2Utd2lkdGg9IjEwMCIvPjxwYXRoIGQ9Im0yNjQ5LjQgNDg5LjY3djQ4MS4wNyIgc3Ryb2tlLXdpZHRoPSIxMDAiLz48cGF0aCBkPSJtMjg2MC4zIDUwNS45N3Y0NjQuNzYiIHN0cm9rZS13aWR0aD0iMTAwIi8+PHBhdGggZD0ibTMwNjIuMSA1MzQuMzF2NDM2LjQyIiBzdHJva2Utd2lkdGg9IjEwMCIvPjxnIHN0cm9rZS13aWR0aD0iMTAwIj48cGF0aCBkPSJtMzI3Ny42IDYyMy4wOHYzNDcuNjYiLz48cGF0aCBkPSJtMzQ4OC41IDcwOC4xNnYyNjIuNTgiLz48cGF0aCBkPSJtMzY5MC4yIDgyNy42NXYxNDMuMDgiLz48cGF0aCBkPSJtMzkwNS43IDg2OS4yOXYxMDEuNDUiLz48cGF0aCBkPSJtNDExMi4xIDkxMS45M3Y1OC44MDciLz48L2c+PHBhdGggZD0ibTQzMTMuOCA3MDkuMTZ2MjYxLjU4IiBzdHJva2Utd2lkdGg9IjEwMCIvPjxnIHN0cm9rZS13aWR0aD0iMTAwIj48cGF0aCBkPSJtNDUyOS4zIDI2Ny4ydjcwMy41NCIvPjxwYXRoIGQ9Im00NzQwLjIgOTYuODM1djg3My45Ii8+PHBhdGggZD0ibTQ5NDEuOSA0NDYuNTV2NTI0LjE5Ii8+PC9nPjxwYXRoIGQ9Im01MTU3LjQgNjgwLjM0djI5MC40IiBzdHJva2Utd2lkdGg9IjEwMCIvPjxwYXRoIGQ9Im01MzUwIDkxMS45M3Y1OC44MDciIHN0cm9rZS13aWR0aD0iMTAwIi8+PHBhdGggZD0ibTE0MS40NCA4MDEuMTh2MTczLjA0IiBzdHJva2Utd2lkdGg9IjEwMCIvPjwvZz48L3N2Zz4K');
        background-size: contain;
        background-repeat: no-repeat;
        text-shadow: 0 0 5px black;
        height: 50px;

        display: flex;
        align-items: flex-end; */
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

  @media screen and (max-width: 1000px) {
    .title {
      font-size: 1rem;
    }
    .title > img {
      height: 30px;
    }
  }
  /* @media screen and (max-width: 950px) {
        .title {
            font-size: 1.25rem;
        }
    } */
</style>
