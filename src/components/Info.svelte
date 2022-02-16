<script>
  import LocaleSwitcher from "./LocaleSwitcher.svelte";
  import About from "./About.svelte";
  import Credits from "./Credits.svelte";
  import { slide } from "svelte/transition";
  import { uiTutorial, uiTutorialReady } from "../scripts/appState";
</script>

<div class="container" transition:slide>
  <div class="header">
    <img
      src="/images/hydrosound_icon_96.png"
      alt="Hydrological soundscapes icon"
    />
    <h2>Hydrological Soundscapes</h2>
  </div>
  <LocaleSwitcher />
  <h3>Description</h3>

  <About />
  <div class="tutorial">
    <p />
    <button
      on:click={() => {
        $uiTutorial = true;
      }}
      disabled={!$uiTutorialReady}>Tutorial</button
    >
  </div>
  <h3>Acknowledgment</h3>
  <Credits />
</div>

<style>
  h2 {
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
    color: var(--color-primary);
    line-height: 1;
  }
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
  }
  .header img {
    height: 40px;
  }
  .container {
    position: absolute;
    z-index: 9999;
    inset: auto 0 0 0;
    /* background-color: var(--color-background); */
    background-color: white;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    max-height: calc(100vh - 60px - 5px);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;

    overflow-y: auto;
  }

  h2,
  h3 {
    margin: 0;
    padding: 0.5rem 0;
  }

  h3 {
    font-size: 1rem;
    display: flex;
    justify-content: stretch;
    align-items: center;
    width: 100%;
  }

  h3::after {
    content: "";
    background-color: black;
    width: 100%;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    height: 1px;
    display: inline-block;
    flex-shrink: 100000000000000000;
  }
</style>
