<script>
    import {ARRANGEMENTS} from "../scripts/sounds";
    import {configuration} from "../scripts/appState"
    import {slide} from "svelte/transition"
</script>

<div class="container" transition:slide>
    <div class="title">
        Parameters:
    </div>
    <div class="options">

        <label for="arrangement" class="main-label">Select the type of musical scale:</label>
        <div class="group"  id="arrangement">
            {#each ARRANGEMENTS as arr}
            <div class="option">
                <input type="radio" name="arrangement" id={arr.id} value={arr.id} bind:group={$configuration.arrangement}>
                <label for={arr.id}>{arr.label}</label>
            </div>
            {/each}
        </div>

        <label for="speed"  class="main-label">{`Playing speed: ${($configuration.bpm / 3).toFixed(0)}bpm`}</label>
        <div class="group" id="speed">
            <div class="group">
                <input type="checkbox" name="bpm-auto" id="bpm-auto" bind:checked={$configuration.bpm_auto}>
                <label for="bpm-auto">{`Should BPM be mapped to streamflow average?`}</label>
            </div>
            {#if !$configuration.bpm_auto}
            <label for="bpm">{`Select a speed (beat per minutes, bpm):`}</label>
            <div class="group">
                <input type="range" name="bpm" id="bpm" bind:value={$configuration.bpm} min="30" max="900">
            </div>
            {/if}
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

        background-color: var(--color-primary);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);

        padding: 1rem;
        font-size: 0.9rem;
    }
    .group {
        width: 100%;
    }
    .title {
        font-size: 1.2rem;
        border-bottom: 1px solid white;
    }
    .options {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;

        padding: 0.5rem;
    }
    .main-label {
        margin-top: 0.25rem;
    }
    input[type="range"] {
        width: 100%;
    }
</style>