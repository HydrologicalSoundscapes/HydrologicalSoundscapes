<script>
  import { _ } from "svelte-i18n";
  import {
    uiWelcomePanel,
    uiTutorial,
    uiTutorialReady,
  } from "../scripts/appState";
  import About from "./About.svelte";
</script>

<div class="disable-page" />
<div class="container">
  <div class="header">
    <img
      src="/images/hydrosound_icon_96.png"
      alt="Hydrological soundscapes icon"
    />
    <h2>{`${$_("welcome")} ${$_("title")}!`}</h2>
  </div>
  <div>
    <About />
  </div>
  <div class="actions">
    <p>
      You can go through a quick tutorial on how to use the app or get started
      immediatly.
    </p>

    <div class="buttons">
      <button
        on:click={() => {
          $uiWelcomePanel = false;
          $uiTutorial = true;
        }}
        disabled={!$uiTutorialReady}>Tutorial</button
      >
      <button on:click={() => ($uiWelcomePanel = false)}>Get started</button>
    </div>
  </div>
</div>

<style>
  .disable-page {
    position: absolute;
    inset: 0;
    z-index: 10000;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .container {
    position: absolute;
    inset: auto 0 0 0;
    max-height: 100vh;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    max-height: calc(100vh - 60px - 5px);

    z-index: 10001;
    padding: 1rem;
    overflow-y: auto;
  }
  .container > div {
    max-width: 800px;
    margin: auto;
  }
  p {
    max-width: 700px;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0;
    font-size: 0.8rem;
  }
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
  .buttons {
    padding-top: 1rem;
    padding-bottom: 2rem;
    display: flex;
    justify-content: center;
    gap: 5%;
  }
</style>
