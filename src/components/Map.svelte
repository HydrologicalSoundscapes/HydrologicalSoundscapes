<script>
  import L from "leaflet";
  import LM from "leaflet.markercluster";
  import {
    datasetStore,
    currentStation,
    centerStation,
    mapStore,
  } from "../scripts/appState";
  import { onMount } from "svelte";

  let current_station_index = null;

  const icon_anchor = [0.5, 1];
  const icon_size = 30;

  let map;
  let marker_cluster;
  let markers = [];
  let icon_default;
  let icon_selected;
  let icon_already_selected;
  let icon_hidden;
  onMount(() => {
    initMap();
  });
  function initMap() {
    map = L.map("map", { zoomControl: false, zoomAnimation: true }).setView(
      [51.505, -0.09],
      3
    );
    $mapStore = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      updateWhenZooming: false,
    }).addTo(map);
    new L.Control.Zoom({ position: "bottomright" }).addTo(map);
    icon_default = L.divIcon({
      html: ` <svg width="30" height="30" version="1.1" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <path d="m26.551 1.2067-11.722 26.703-11.838-26.705z" fill="#5790db" stroke="#000" stroke-linecap="square"/>
</svg>
`,
      iconSize: [icon_size, icon_size],
      className: "",
      iconAnchor: [icon_size * icon_anchor[0], icon_size * icon_anchor[1]],
    });
    icon_selected = L.divIcon({
      html: `<svg width="30" height="30" version="1.1" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <path d="m26.551 1.2067-11.722 26.703-11.838-26.705z" fill="#e99c0e" stroke="#000" stroke-linecap="square"/>
</svg>`,
      iconSize: [icon_size, icon_size],
      className: "",
      iconAnchor: [icon_size * icon_anchor[0], icon_size * icon_anchor[1]],
    });
    icon_hidden = L.divIcon({
      html: `<svg id="pin-example" width="30" height="30" version="1.1" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <path d="m26.551 1.2067-11.722 26.703-11.838-26.705z" fill="transparent" stroke="transparent" stroke-linecap="square"/>
</svg>`,
      iconSize: [icon_size, icon_size],
      className: "",
      iconAnchor: [icon_size * icon_anchor[0], icon_size * icon_anchor[1]],
    });
    icon_already_selected = L.divIcon({
      html: `<svg id="pin-example" width="30" height="30" version="1.1" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <path d="m26.551 1.2067-11.722 26.703-11.838-26.705z" fill="#1b487eff" stroke="#000" stroke-linecap="square"/>
</svg>`,
      iconSize: [icon_size, icon_size],
      className: "",
      iconAnchor: [icon_size * icon_anchor[0], icon_size * icon_anchor[1]],
    });
  }
  function computeMaxClusterRadius(z) {
    if (z < 6) {
      return 80;
    }
    return 1;
  }

  function populateMap(stations, selected_index) {
    marker_cluster = new LM.MarkerClusterGroup({
      maxClusterRadius: computeMaxClusterRadius,
      showCoverageOnHover: false,
    });
    stations.forEach((station, i) => {
      let marker = L.marker([station.info.lat, station.info.lon], {
        icon: icon_default,
      });
      markers.push(marker);
      marker.on("click", (e) => {
        if (i !== current_station_index) {
          if (current_station_index !== null) {
            let icon = icon_default;
            if ($datasetStore[current_station_index].info.has_been_selected) {
              icon = icon_already_selected;
            }
            markers[current_station_index].setIcon(icon);
          }

          current_station_index = i;
          marker.setIcon(icon_selected);
          console.log("########################################");
          console.log("selecting a new station ==>", station);
          station.info.has_been_selected = true;
          $currentStation = station;
          marker_cluster.removeLayer(marker);
          marker.addTo(map);
        }
      });
      if (selected_index === i) {
        map.$example_pin = {
          marker: marker,
          icon_default,
          icon_selected,
        };
      }
      marker_cluster.addLayer(marker);
    });
    map.addLayer(marker_cluster);
  }
  $: {
    if ($centerStation && $datasetStore && map) {
      map.setView([$centerStation.info.lat, $centerStation.info.lon], 3, {
        animate: false,
      });
      populateMap($datasetStore, $centerStation.info.index);
      const example_pin = L.marker(
        [$centerStation.info.lat, $centerStation.info.lon],
        {
          icon: icon_hidden,
        }
      ).addTo(map);
      example_pin._icon.id = "pin-example";
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
    crossorigin=""
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
    crossorigin=""
  />
</svelte:head>

<div id="map" />

<style>
  #map {
    height: 100vh;
  }
</style>
