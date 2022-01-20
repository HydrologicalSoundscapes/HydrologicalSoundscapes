<script>
    import {ARRANGEMENTS} from "../scripts/sounds";
    import {configuration, uiOptionPanel} from "../scripts/appState"

</script>

<div class="container">
    <div class="options">
        <button class="close" on:click={()=>$uiOptionPanel=false}>
            <img src="/images/cross_thick.svg" alt="" width="30px">
        </button>
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
        padding: 1rem;
        width: 100%
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

        padding: 1rem;
        /* margin: 1rem; */

        border: 1px solid lightblue;
        border-radius: 3px;
    }

    button.close {
        all: unset;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        padding: 1rem;
    }
    input[type="range"] {
        width: 100%;
    }
</style>