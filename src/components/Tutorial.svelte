<script>
  import { onMount } from "svelte";
  import { Tutorial } from "../scripts/tutorial";
  import { uiTutorial } from "../scripts/appState";
  // import

  let highlight_element;
  let explaination_element;
  let nohighlight_element;
  let tutorial;
  let has_previous_step = false,
    has_next_step = true;
  let steps = [];
  onMount(() => {
    tutorial = new Tutorial(
      highlight_element,
      explaination_element,
      nohighlight_element,
      () => {
        has_previous_step = !tutorial.hasPreviousStep();
        has_next_step = !tutorial.hasNextStep();
      }
    );
    steps = Array(tutorial.length()).fill(false);
    tutorial.setupStep();
    steps[0] = true;
  });
</script>

<svelte:window
  on:resize={() => {
    tutorial.onResize();
  }}
/>
<div class="container">
  <div id="no-highlight" bind:this={nohighlight_element} />
  <div class="highlight" bind:this={highlight_element} />
  <div class="details">
    <div>
      <div class="explaination" bind:this={explaination_element} />
      <!-- <div class="actions" hidden={$soundDownloadProgress !== 1}> -->
      <div class="actions">
        <button
          on:click={() => {
            tutorial.previousStep();
            let step = tutorial.current();
            steps = steps.map((e, i) => i <= step);
          }}
          disabled={has_previous_step}>Previous</button
        >
        <button
          on:click={() => {
            tutorial.nextStep();
            let step = tutorial.current();
            steps = steps.map((e, i) => i <= step);
          }}
          disabled={has_next_step}>Next</button
        >
        <button
          on:click={() => {
            tutorial.stop();
            $uiTutorial = false;
          }}>Quit</button
        >
      </div>
      <div class="progress">
        {#each steps as step}
          <div class:done={step} />
        {/each}
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
  .progress {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  .progress > div {
    margin-top: 2rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: var(--color-primary);
  }
  .progress > div.done {
    background-color: var(--color-secondary);
  }
  .highlight {
    position: absolute;
    box-shadow: 0 0 0 4px var(--color-secondary),
      0 0 0 100000px rgba(0, 0, 0, 0.5);
  }
  #no-highlight {
    position: absolute;
    top: -100px;
    left: -100px;
    width: 0;
    height: 0;
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
    background-color: rgba(255, 255, 255, 0.75);
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
    /* font-weight: normal; */
  }
  button:not([disabled]):hover {
    border: 1px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }
  button[disabled] {
    background-color: var(--color-disabled);
  }
</style>
