<script>
  import { ARRANGEMENTS, PATTERNS } from "../scripts/soundsUtils";
  import { configuration } from "../scripts/appState";
  import { slide } from "svelte/transition";
  import { _ } from "svelte-i18n";
</script>

<div class="container" transition:slide>
  <!-- <div class="title">Parameters:</div> -->
  <h2 hidden>Options</h2>

  <div class="options">
    <label for="volume" class="main-label">{`${$_("options.volume")}:`}</label>
    <input
      type="range"
      name="volume"
      id="volume"
      bind:value={$configuration.volume}
      min="0"
      max="1"
      step="0.01"
    />

    <label for="which" class="main-label"
      >{`${$_("options.toggle_instruments.label")}: `}</label
    >
    <div class="section" id="which">
      <div class="group">
        <input
          type="checkbox"
          name="which-med"
          id="which-med"
          bind:checked={$configuration.med}
        />
        <label for="which-med">{$_("options.toggle_instruments.piano")}</label>
      </div>
      <div class="group">
        <input
          type="checkbox"
          name="which-max"
          id="which-max"
          bind:checked={$configuration.max}
        />
        <label for="which-max">{$_("options.toggle_instruments.bass")}</label>
      </div>
      <div class="group">
        <input
          type="checkbox"
          name="which-min"
          id="which-min"
          bind:checked={$configuration.min}
        />
        <label for="which-min">{$_("options.toggle_instruments.hang")}</label>
      </div>
      <div class="group">
        <input
          type="checkbox"
          name="which-drum"
          id="which-drum"
          bind:checked={$configuration.drum}
        />
        <label for="which-drum">{$_("options.toggle_instruments.drum")}</label>
      </div>
    </div>

    <label for="arrangement" class="main-label">
      {$_("options.music_scales.label")}
    </label>
    <div class="section" id="arrangement">
      {#each ARRANGEMENTS as arr}
        <div class="option">
          <input
            type="radio"
            name="arrangement"
            id={arr.id}
            value={arr.id}
            bind:group={$configuration.arrangement}
          />
          <label for={arr.id}>{$_(`options.music_scales.${arr.id}`)}</label>
        </div>
      {/each}
    </div>

    <label for="drum" class="main-label"
      >{$_("options.drum_pattern.label")}</label
    >
    <div class="section" id="drum">
      {#each PATTERNS as pat}
        <div class="group">
          <input
            type="radio"
            name="drum-pattern"
            id={pat.id}
            value={pat.id}
            bind:group={$configuration.drum_pattern}
          />
          <label for={pat.id}>{$_(`options.drum_pattern.${pat.id}`)}</label>
        </div>
      {/each}
    </div>

    <label for="speed" class="main-label">
      {`${$_("options.tempo.label")}: ${($configuration.bpm / 3).toFixed(
        0
      )} bpm`}
    </label>
    <div class="section" id="speed">
      <div class="group">
        <input
          type="checkbox"
          name="bpm-auto"
          id="bpm-auto"
          bind:checked={$configuration.bpm_auto}
        />
        <label for="bpm-auto">{$_("options.tempo.mapped")}</label>
      </div>
      {#if !$configuration.bpm_auto}
        <label for="bpm">{`${$_("options.tempo.select")}: `}</label>
        <div class="group">
          <input
            type="range"
            name="bpm"
            id="bpm"
            bind:value={$configuration.bpm}
            min="180"
            max="600"
            step="3"
          />
        </div>
      {/if}
    </div>

    <label for="pitch" class="main-label">{$_("options.pitch_invert.1")}</label>
    <div class="section" id="pitch">
      <div class="group">
        <input
          type="checkbox"
          name="inverted-pitch"
          id="inverted-pitch"
          bind:checked={$configuration.inverted_pitch}
        />
        <label for="inverted-pitch">{$_("options.pitch_invert.2")}</label>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    position: absolute;
    z-index: 9998;
    top: 60px;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    right: 0;
    width: min(95%, 300px);

    background-color: var(--color-background-secondary);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);

    padding: 1rem;
    font-size: 0.9rem;
  }
  .section {
    width: 100%;
  }
  .group {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .options {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    /* padding: 0.5rem; */
  }
  .main-label {
    margin-top: 0.5rem;
    display: flex;
    justify-content: stretch;
    align-items: center;
    width: 100%;
  }
  .main-label::after {
    content: "";
    background-color: white;
    width: 100%;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    height: 1px;
    display: inline-block;
    flex-shrink: 100000000000000000;
  }
  input[type="range"] {
    width: 100%;
  }
</style>
