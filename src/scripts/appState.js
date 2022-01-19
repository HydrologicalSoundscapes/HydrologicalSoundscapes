import {writable, derived, get} from "svelte/store"
import {meanMonthlyPS, maxMonthlyPS} from "./dataProcessing"
import {setBPM} from "./sounds"

/**
 * Download state for all sound files (between 0 and 1)
 */
export const soundDownloadProgress = writable(0)


/**
 * Download state for all sound files (between 0 and 1)
 */
export const currentStation = writable(null)

/**
 * Sound arrangement
 */
export const configuration = writable({
    arrangement: "Am",
    bpm: 300,
})

/**
 * Plots and Sounds (parts), derived from the selected station
 */
export const currentStationPS = derived([currentStation, configuration],
    ([$currentStation, $configuration]) => {
    console.log("Deriving plots and sounds...", $currentStation, $configuration)
    if (!$currentStation) return {}
    const stationPS = get(currentStationPS)
    console.log("stationPS", stationPS)
    // const a = $arrangement
    // stationPS.a = a
    // console.log("$configuration.arrangement.bpm", $configuration.arrangement.bpm)
    setBPM($configuration.bpm)
    stationPS.meanMonthlyPS = meanMonthlyPS($currentStation, stationPS.meanMonthlyPS, $configuration.arrangement)
    stationPS.maxMonthlyPS = maxMonthlyPS($currentStation, stationPS.maxMonthlyPS, $configuration.arrangement)
    return stationPS
    },
{})

// export const fake = derived([currentStation, arrangement], ([$currentStation, $arrangement])=>{
//     console.log("Fake Deriving plots and sounds...", $currentStation, $arrangement)
//     // return `ARRANGEMENT => ${$arrangement} && ${$currentStation?.info?.label}`
//     return `ARRANGEMENT => ${"BRETAGNE"} && ${$currentStation?.info?.label}`
// }, "")

/**
 * Contains the whole dataset.
 * The store includes two convenient functions:
 * - get a station given its ID
 * - get the information of all stations (FIXME: I think it is useless in the end...)
 */
function buildDatasetStore() {
    const {subscribe, set, update} = writable([])
    function getStationById(station_id) {
        const dataset = get(datasetStore)
        const station = dataset.filter(s=>s.info.id===station_id)
        return station.length===1?station[0]:null
    } 
    function getStationsInfo() {
        const dataset = get(datasetStore)
        return dataset.map(s=>s.info)
    }
    return {subscribe, set, update, getStationById, getStationsInfo}
}
export const datasetStore = buildDatasetStore()

/**
 * Download dataset and initialize associated store
 */
export async function downloadDataset() {
    // For large dataset, I might need to monitor the download 
    // to display a progress bar to the user...
    const file = await fetch("./example_data_2.json")
    const dataset = await file.json()
    // setTimeout(()=>
    datasetStore.set(dataset)
}



export const uiOptionPanel = writable(true)