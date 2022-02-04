<script>
  import { soundDownloadProgress } from "../scripts/appState";
</script>

{#if $soundDownloadProgress !== 1}
  <div class="container">
    <div class="progress-bar">
      <div
        class="progress"
        style={`width: ${$soundDownloadProgress * 100}%;`}
      />
      <div class="text">
        {`Loading sound sample files... ${(
          $soundDownloadProgress * 100
        ).toFixed(0)}%`}
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10005;
    background-color: var(--color-background);
  }
  .progress-bar {
    position: relative;
    height: 1.5rem;
    border-bottom: 1px solid var(--color-secondary);
    border-top: 1px solid var(--color-secondary);
  }
  .progress-bar > .text {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    padding: 0.125rem;
    font-size: 0.8rem;
  }
  .progress-bar > .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-secondary);
  }
</style>
