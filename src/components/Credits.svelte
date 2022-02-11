<div class="container">
  <div class="block">
    <div class="financial">
      This project has received funding from ...
      <!-- the European Union’s Horizon 2020
    research and innovation programme under the Marie Sklodowska-Curie grant
    agreement No
    <a href="https://cordis.europa.eu/project/id/835496">835496</a>. -->
    </div>
    <div class="data">The hydrological data used in this app are from ...</div>
  </div>
  <div class="block">
    <div class="materials">
      Piano and bass samples sounds are from <a
        href="http://theremin.music.uiowa.edu/"
        target="_blank">http://theremin.music.uiowa.edu/</a
      >
    </div>
    <div class="src">
      This app is Open Source and available under the MIT (?) licence. Source
      code is available on <a
        href="https://github.com/IvanHeriver/HydrologicalSoundscapes"
        target="_blank">Github</a
      >
    </div>
    <div class="origine">
      This app was imagined by <a href="https://globxblog.inrae.fr/about">
        Benjamin Renard
      </a>
      who expored hydrological data sonification quite a bit using R (see for example
      the
      <a href="https://github.com/benRenard/sequenceR"> sequenceR </a> package).
      It came to life thanks to his motivation and initiative.
    </div>
    <div class="sonification">
      The data sonification was for the most part based on previous work from
      Benjamin Renard to which Ivan Horner brought some contributions.
    </div>
    <div class="ihdev">
      The app was coded by <a href="https://ihdev.fr" target="_blank">
        Ivan Horner (ihdev.fr)
      </a>, free-lance developer dedicated to the valorization and vulgarization
      of science.
    </div>
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
</style>
