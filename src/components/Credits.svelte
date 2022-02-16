<script>
  import { _ } from "svelte-i18n";
</script>

<div class="container">
  <div class="block">
    <div class="funding">
      <p>
        {$_("app_credits.funding.1")}
        <a href="https://cordis.europa.eu/project/id/835496" target="_blank"
          >{$_("app_credits.funding.2")}</a
        >
      </p>
      <img src="./images/eu_icon.svg" alt="European Union Logo" height="100" />
    </div>
    <div class="data">
      {$_("app_credits.data.1")}
      <a href="https://doi.org/10.1594/PANGAEA.887470" target="_blank">
        {$_("app_credits.data.2")}
      </a>
    </div>
  </div>
  <div class="block">
    <div class="materials">
      {$_("app_credits.samples")}
      <a href="http://theremin.music.uiowa.edu/" target="_blank"
        >http://theremin.music.uiowa.edu/
      </a>
    </div>
    <div class="src">
      This app is Open Source and available under the MIT (?) licence. Source
      code is available on <a
        href="https://github.com/IvanHeriver/HydrologicalSoundscapes"
        target="_blank">Github</a
      >
    </div>
    <div class="designed">
      {$_("app_credits.designed.1")}
      Ivan Horner
      {$_("app_credits.designed.2")}
      <a href="https://globxblog.inrae.fr/" target="_blank">Benjamin Renard</a>
    </div>
    <div class="coded">
      {$_("app_credits.coded")}
      <a href="https://ihdev.fr" target="_blank"> Ivan Horner (ihdev.fr) </a> ; {$_(
        "app_credits.source"
      )}
      <a href="https://github.com/IvanHeriver/HydrologicalSoundscapes">
        Github
      </a>
    </div>
    <div class="source" />
  </div>
</div>

<style>
  .container {
    font-size: 0.8rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .block {
    display: flex;
    flex-direction: column;
    /* width: min(50% - 0.25rem, 700px); */
  }
  div {
    font-size: 0.8rem;
  }
  .funding {
    display: flex;
    align-items: center;
  }
  .funding p {
    max-width: 500px;
  }
</style>
