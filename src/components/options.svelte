<script>
    import {ARRANGEMENTS} from "../scripts/sounds";
    import {configuration} from "../scripts/appState"

</script>

<div class="container">
    <div class="options">
        <label for="arrangement">Select the type of harmonics:</label>
        <div class="group"  id="arrangement">
            {#each ARRANGEMENTS as arr}
            <div class="option">
                <input type="radio" name="arrangement" id={arr.id} value={arr.id} bind:group={$configuration.arrangement}>
                <label for={arr.id}>{arr.label}</label>
            </div>
            {/each}
        </div>
        <br>
        <label for="bpm">{`Select a BPM: ${$configuration.bpm}bpm`}</label>
        <div class="group">
            <input type="range" name="bpm" id="bpm" bind:value={$configuration.bpm} min="100" max="1000">
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

        background-color: var(--color-background);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);

        padding: 1rem;
        font-size: 0.9rem;
    }
    .group {
        width: 100%;
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

    input[type="range"] {
        width: 100%;
    }
</style>