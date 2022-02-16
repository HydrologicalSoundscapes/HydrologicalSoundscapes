<script>
  import { _ } from "svelte-i18n";
</script>

<div class="container">
  <p>
    <!-- This is a sonification app that enables listening to hydrolgical regimes
    from all around the world. -->
    {$_("app_description.why")}
  </p>
  <p>
    <!-- More than a thousand hydrometric stations from around the world are
    displayed on a map. They monitor the streamflow of a wide variety of
    catchments in terms of hydrological regimes. -->
    {$_("app_description.how.1")}
    <span class="highlight">{$_("app_description.how.2")}</span>
    {$_("app_description.how.3")}
    <span class="highlight">{$_("app_description.how.4")}</span>
    {$_("app_description.how.5")}

    <!-- By clicking on one of the thousand hydrometric stations from around the world
    you can <span class="highlight"> visualize </span> its hydrological regime
    in bar charts and <span class="highlight">listen to </span> its corresponding
    melody created from the data. -->
  </p>
  <p>
    {$_("app_description.what")}
    <!-- Four types of hydrological variables are used to characterize the
    hydrological regime: -->
  </p>
  <ul>
    <li>
      <!-- <span class="highlight"> Average flow (in m<sup>3</sup>/s) </span> -->
      <span class="highlight"> {$_("app_description.average_flow.1")}</span>
      <!-- <span> mapped to the speed of the music (beat per minute, bpm). </span> -->
      <span> {$_("app_description.average_flow.2")} </span>
    </li>
    <li>
      <!-- <span class="highlight"> Monthly flow (in % of total annual flow) </span>
      <span> mapped to the note/pich of a piano. </span> -->
      <span class="highlight">
        {$_("app_description.monthly_mean_flow.1")}
      </span>
      <span> {$_("app_description.monthly_mean_flow.2")} </span>
    </li>
    <li>
      <!-- <span class="highlight">
        Monthly frequency of annual daily maxima (in %)
      </span>
      <span> mapped to the note/pitch of a bass. </span> -->
      <span class="highlight">
        {$_("app_description.monthly_max_flow.1")}
      </span>
      <span>{$_("app_description.monthly_max_flow.2")} </span>
    </li>
    <li>
      <!-- <span class="highlight">
        Monthly frequency of annual 30-days averaged minima (in %)
      </span>
      <span> mapped to the note/pitch of a hang drum instrument. </span> -->
      <span class="highlight">
        {$_("app_description.monthly_min_flow.1")}
      </span>
      <span>
        {$_("app_description.monthly_min_flow.2")}
        <a href={$_("app_description.monthly_min_flow.4")} target="_blank"
          >{$_("app_description.monthly_min_flow.3")}</a
        >
      </span>
    </li>
  </ul>
  <p>
    {$_("app_description.headphone")}
  </p>
</div>

<style>
  .container {
    font-size: 0.8rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  p {
    margin: 0;
    padding: 0;
  }
  ul {
    margin: 0;
    padding: 0.25rem 0 0.25rem 1.25rem;
  }
  li {
    line-height: 1.1;
    padding-bottom: 0.125rem;
  }
  .highlight {
    color: var(--color-primary);
  }
</style>
