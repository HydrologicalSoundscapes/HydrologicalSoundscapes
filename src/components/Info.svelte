<script>
  import About from "./About.svelte";
  import Credits from "./Credits.svelte";
  import { slide } from "svelte/transition";
</script>

<div class="container" transition:slide>
  <button />
  <h2>About</h2>
  <h3 hidden>Description</h3>
  <About />
  <!-- <div class="tutorial">
    <button>Do the tutorial</button>
  </div> -->
  <h3>Acknowledgment</h3>
  <Credits />
</div>

<style>
  .container {
    position: absolute;
    z-index: 9999;
    inset: auto 0 0 0;
    /* background-color: var(--color-background); */
    background-color: white;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
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
</style>
