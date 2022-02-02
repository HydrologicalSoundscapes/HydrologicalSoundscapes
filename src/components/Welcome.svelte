<script>
  import { uiWelcomePanel } from "../scripts/appState";
  import About from "./About.svelte";
</script>

<div class="container">
  <div class="header">
    <img
      src="/images/hydrosound_icon_96.png"
      alt="Hydrological soundscapes icon"
    />
    <h2>Welcome to Hydrological Soundscapes!</h2>
  </div>
  <div class="content">
    <p>
      Here, not only will you be able to <span class="highlight"> see </span>
      hydrological regimes in bar charts but also
      <span class="highlight"> listen </span> to their music.
    </p>
    <About />
    <p>
      You can go through a quick tutorial on how to use the app or get started
      immediatly.
    </p>
  </div>

  <div class="actions">
    <button on:click={() => ($uiWelcomePanel = false)}>Tutorial</button>
    <button on:click={() => ($uiWelcomePanel = false)}>Get started</button>
  </div>
</div>

<style>
  .container {
    position: absolute;
    inset: 0;
    max-height: 100vh;
    background-color: rgba(255, 255, 255, 0.95);
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
  }
  p,
  span {
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
  .actions {
    padding-top: 1rem;
    padding-bottom: 3rem;
    display: flex;
    justify-content: center;
    gap: 5%;
  }
  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    color: white;
    font-weight: bold;
  }
  button:hover {
    border: 1px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }
</style>
