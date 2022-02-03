<script>
  import { onMount } from "svelte";
  import { Tutorial } from "../scripts/tutorial";
  import { uiTutorial } from "../scripts/appState";
  // import

  let highlight_element;
  let explaination_element;
  let tutorial;
  let has_previous_step = false,
    has_next_step = true;
  onMount(() => {
    tutorial = new Tutorial(highlight_element, explaination_element, () => {
      has_previous_step = !tutorial.hasPreviousStep();
      has_next_step = !tutorial.hasNextStep();
    });
    tutorial.setupStep();
  });
</script>

<!-- <svelte:window
  on:resize={() => {
    setupStep(step);
  }}
/> -->
<div class="container">
  <div class="highlight" bind:this={highlight_element} />
  <div class="details">
    <div>
      <div class="explaination" bind:this={explaination_element} />
      <!-- <div class="actions" hidden={$soundDownloadProgress !== 1}> -->
      <div class="actions">
        <button
          on:click={() => {
            tutorial.previousStep();
          }}
          disabled={has_previous_step}>Previous</button
        >
        <button
          on:click={() => {
            tutorial.nextStep();
          }}
          disabled={has_next_step}>Next</button
        >
        <button
          on:click={() => {
            tutorial.stop();
            $uiTutorial = false;
          }}>Exit</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 10001;
  }
  .highlight {
    position: absolute;
    box-shadow: 0 0 0 4px var(--color-secondary),
      0 0 0 100000px rgba(0, 0, 0, 0.5);
    /* box-shadow: 0 0 0 2px var(--color-secondary), 0 0 0 4px var(--color-primary),
      0 0 0 100000px rgba(0, 0, 0, 0.5); */
  }
  .details {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 2rem;
  }

  .details > div {
    background-color: white;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    padding: 1rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 5%;
  }
  .explaination {
    padding: 1rem;

    max-width: 400px;
    text-align: center;
  }
  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    color: white;
    font-weight: bold;
  }
  button:not([disabled]):hover {
    border: 1px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }
  button[disabled] {
    background-color: grey;
  }
</style>
