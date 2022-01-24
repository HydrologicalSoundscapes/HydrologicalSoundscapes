<script>
    import L from "leaflet"
    import {datasetStore, currentStation} from "../scripts/appState"
    import { onMount } from "svelte";

    let current_station_index = null

    let map, markers=[], icon_default, icon_selected
    onMount(()=>{
        map = L.map("map", {zoomControl: false}).setView([51.505, -0.09], 3)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
        icon_default = L.icon({
            iconUrl: "./images/map_marker_pin_blue.png",
            shadowUrl: "./images/map_marker_shadow.png",
            iconSize: [50, 50],
            shadowSize: [50, 50],
            iconAnchor: [15, 47],
            shadowAnchor: [15, 47],
            popupAnchor: [0, -50]

        })
        icon_selected = L.icon({
            iconUrl: "./images/map_marker_pin_orange.png",
            shadowUrl: "./images/map_marker_shadow.png",
            iconSize: [50, 50],
            shadowSize: [50, 50],
            iconAnchor: [15, 47],
            shadowAnchor: [15, 47],
            popupAnchor: [0, -50]

        })
    })
    function populateMap(stations) {
        stations.forEach((station, i) => {
            console.log("station", station)
            let marker = L.marker([station.info.lat, station.info.lon], {icon: icon_default})
            markers.push(marker)
            marker.addTo(map)
            .on("click", (e)=>{
                if (i !== current_station_index) {
                    current_station_index = i
                    markers.forEach(m=>m.setIcon(icon_default))
                    marker.setIcon(icon_selected)
                    console.log("########################################")
                    console.log("selecting a new station ==>", station)
                    currentStation.update(prev => station)
                }
            })
        })
    }
    $: {
        populateMap($datasetStore)
    }

</script>

<svelte:head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
</svelte:head>

<div id="map"></div>

<style>
    #map {
        height: 100vh;
    }
</style>