<div class="container">
  <p>
    This is a sonification app that enables listening to hydrolgical regimes
    from all around the world.
  </p>
  <p>
    <!-- More than a thousand hydrometric stations from around the world are
    displayed on a map. They monitor the streamflow of a wide variety of
    catchments in terms of hydrological regimes. -->
    By clicking on one of the thousand hydrometric stations from around the world
    you can <span class="highlight"> visualize </span> its hydrological regime
    in bar charts and <span class="highlight">listen to </span> its corresponding
    melody created from the data.
  </p>
  <p>
    Four types of hydrological variables are used to characterize the
    hydrological regime:
  </p>
  <ul>
    <li>
      <span class="highlight"> Average streamflow (in m<sup>3</sup>/s) </span>
      <span> mapped to the speed of the music (beat per minute, bpm). </span>
    </li>
    <li>
      <span class="highlight">
        Mean monthly streamflow (in % of the sum of the 12 monthly values)
      </span>
      <span> mapped to the note/pich of a piano. </span>
    </li>
    <li>
      <span class="highlight">
        Monthly frequency of annual daily maxima (in %)
      </span>
      <span> mapped to the note/pitch of a bass. </span>
    </li>
    <li>
      <span class="highlight">
        Monthly frequency of annual 30-days averaged minima (in %)
      </span>
      <span> mapped to the note/pitch of a hang drum instrument. </span>
    </li>
  </ul>
  <p>
    It is strongly recommended to be equipped with good headphones to fully
    enjoy this app!
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
