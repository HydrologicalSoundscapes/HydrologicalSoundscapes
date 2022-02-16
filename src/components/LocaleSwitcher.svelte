<script>
  import { _, locale } from "svelte-i18n";
  import { languages } from "../scripts/i18n";
</script>

<div class="container">
  <label for="language"> {$_("languages.select")}: </label>
  <select name="language" id="language" bind:value={$locale}>
    {#each languages as l}
      <option value={l.id} selected={$locale === l.id}
        >{`${l.label} - ${$_(`languages.${l.id}`)}`}</option
      >
    {/each}
  </select>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  label,
  option {
    font-size: 0.9rem;
  }
  /* label, */
  select {
    flex-grow: 1;
    margin: 0.125rem 0 0.125rem 0.25rem;
    border: 1px solid var(--color-primary);
    border-radius: 0;
    max-width: 300px;
  }
</style>
