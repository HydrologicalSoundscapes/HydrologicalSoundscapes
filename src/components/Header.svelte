<script>
    import {uiPlotPanel, uiOptionPanel} from "../scripts/appState"
    import SoundController from "./SoundController.svelte"

    let svg_size=28
</script>

<div class="container">
    <div class="left">
        <div class="title">
            Hydrological Soundscapes
        </div>
    </div>
    <SoundController />
    <div class="right">
        <button on:click={()=>$uiOptionPanel=!$uiOptionPanel} class={$uiOptionPanel?"active":""} >
            <!-- <img src="./images/options.svg" alt="stop sound" width="25px"> -->
            <svg width={svg_size} height={svg_size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <g stroke-width="100" stroke-linecap="round" class:active={$uiOptionPanel}>
                 <path d="m77.706 260.62h868.84"/>
                 <path d="m371.72 264.66a56.569 56.569 0 0 1-56.569 56.569 56.569 56.569 0 0 1-56.569-56.569 56.569 56.569 0 0 1 56.569-56.569 56.569 56.569 0 0 1 56.569 56.569z" />
                 <path d="m77.706 509.12h868.84"/>
                 <path d="m842.45 513.16a56.569 56.569 0 0 1-56.569 56.569 56.569 56.569 0 0 1-56.569-56.569 56.569 56.569 0 0 1 56.569-56.569 56.569 56.569 0 0 1 56.569 56.569z" />
                 <path d="m77.706 757.61h868.84"/>
                 <path d="m476.77 761.65a56.569 56.569 0 0 1-56.569 56.569 56.569 56.569 0 0 1-56.569-56.569 56.569 56.569 0 0 1 56.569-56.569 56.569 56.569 0 0 1 56.569 56.569z" />
                </g>
            </svg> 
        </button>
        <button on:click={()=>$uiPlotPanel=!$uiPlotPanel}>
            <!-- {#if $uiPlotPanel}
                <svg width={svg_size} height={svg_size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path d="m957.59 778.05-444.12-538.56-453.42 538.56z"  stroke-width="100"/>
                  </svg>
            {:else}
                <svg width={svg_size} height={svg_size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path d="m62.08 265.76 444.12 538.56 453.42-538.56z" stroke-width="100"/>
                </svg>
            {/if} -->
            <svg width={svg_size} height={svg_size} version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <g stroke-width="250" class:active={$uiPlotPanel}>
                    <path d="m215.55 957.62v-521.97"/>
                    <path d="m515.63 957.62v-886.91"/>
                    <path d="m815.72 957.62v-659.53"/>
                </g>
            </svg> 
        </button>
    </div>
</div>

<style>
    .container {
        position: absolute;
        z-index: 9999;
        width: 100%;
        height: 60px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        /* display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap; */
        
        padding: 0 0.99rem;

        background-color: var(--color-background);
        /* box-shadow: 2px -2px 5px 0 rgba(0, 0, 0, 0.5); */
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    }
    .title {
        color: var(--color-primary);
        font-size: 1.25rem;
        font-weight: bold;
        /* text-align: center; */
        justify-self: start;
    }
    .right {
        justify-self: end;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    g {
        fill: var(--color-primary);
        stroke: var(--color-primary);
        stroke-linejoin:unset        ;
        /* stroke-linecap: round; */
    }
    g.active {
        fill: var(--color-secondary);
        stroke: var(--color-secondary);
    }

    @media screen and (max-width: 1200px) {
        .title {
            font-size: 1rem;
        }
    }
</style>