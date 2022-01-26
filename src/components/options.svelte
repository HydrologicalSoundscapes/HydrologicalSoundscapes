<script>
    import {ARRANGEMENTS, PATTERNS} from "../scripts/sounds";
    import {configuration} from "../scripts/appState"
    import {slide} from "svelte/transition"
</script>

<div class="container" transition:slide>
    <div class="title">
        Parameters:
    </div>
    <div class="options">

        <label for="volume"  class="main-label">{`General volume:`}</label>
        <input type="range" name="volume" id="volume" bind:value={$configuration.volume} min="0" max="1" step="0.01">

        <label for="arrangement" class="main-label">{`Select a music scale:`}</label>
        <div class="section"  id="arrangement">
            {#each ARRANGEMENTS as arr}
            <div class="option">
                <input type="radio" name="arrangement" id={arr.id} value={arr.id} bind:group={$configuration.arrangement}>
                <label for={arr.id}>{arr.label}</label>
            </div>
            {/each}
        </div>

        <label for="drum"  class="main-label">{`Select a drum pattern: `}</label>
        <div class="section" id="drum">
            {#each PATTERNS as pat}
                <div class="group">
                    <input type="radio" name="drum-pattern" id={pat.id} value={pat.id} bind:group={$configuration.drum_pattern}>
                    <label for={pat.id}>{pat.label}</label>
                </div>
            {/each}
        </div>

        <label for="pitch"  class="main-label">{`Low/high pitch mapping:`}</label>
        <div class="section" id="pitch">
            <div class="group">
                <input type="checkbox" name="inverted-pitch" id="inverted-pitch" bind:checked={$configuration.inverted_pitch}>
                <label for="inverted-pitch">{`Inverted pitch (piano only)`}</label>
            </div>
        </div>

        <label for="speed"  class="main-label">{`Playing speed: ${($configuration.bpm / 3).toFixed(0)}bpm`}</label>
        <div class="section" id="speed">
            <div class="group">
                <input type="checkbox" name="bpm-auto" id="bpm-auto" bind:checked={$configuration.bpm_auto}>
                <label for="bpm-auto">{`Mapped to streamflow average`}</label>
            </div>
            {#if !$configuration.bpm_auto}
            <label for="bpm">{`Select a speed:`}</label>
            <div class="group">
                <input type="range" name="bpm" id="bpm" bind:value={$configuration.bpm} min="90" max="900">
            </div>
            {/if}
        </div>

        <label for="which"  class="main-label">{`Toggle sounds origines: `}</label>
        <div class="section" id="which">
            <div class="group">
                <input type="checkbox" name="which-med" id="which-med" bind:checked={$configuration.med}>
                <label for="which-med">{`Average streamflow (piano)`}</label>
            </div>
            <div class="group">
                <input type="checkbox" name="which-max" id="which-max" bind:checked={$configuration.max}>
                <label for="which-max">{`Max streamflow (bass)`}</label>
            </div>
            <div class="group">
                <input type="checkbox" name="which-min" id="which-min" bind:checked={$configuration.min}>
                <label for="which-min">{`Min streamflow (hang drum)`}</label>
            </div>
            <div class="group">
                <input type="checkbox" name="which-drum" id="which-drum" bind:checked={$configuration.drum}>
                <label for="which-drum">{`Drums`}</label>
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
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);

        padding: 1rem;
        font-size: 0.9rem;
    }
    .section {
        width: 100%;
    }
    .group {
        width: 100%;
        display: flex;
        /* flex-direction: column; */
        align-items: center;
    }
    .title {
        font-size: 1.2rem;
        width: 100%;
        text-align: center;
        /* border-bottom: 1px solid white; */
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
        margin-top: 0.5rem;
        display: flex;
        justify-content: stretch;
        align-items: center;
        width: 100%;
    }
    .main-label::after {
        content: '';
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