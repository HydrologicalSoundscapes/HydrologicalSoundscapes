<script>
  import { onMount } from "svelte";

  let step = 0;
  let element;
  onMount(() => {
    element = document.querySelector("#toggle-options");
    element.getBoundingClientRect();
  });
</script>

<div class="container">
  <div class="highlight" />
</div>

<style>
  .container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    /* background-color: lightblue; */
    z-index: 10001;
  }
  .highlight {
    background-color: rgba(240, 128, 128, 0.466);
  }
</style>
