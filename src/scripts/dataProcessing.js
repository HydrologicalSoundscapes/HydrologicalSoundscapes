import {scaleLog} from "d3"
import { BarChart } from "./plots";
import { computeMeanMonthlyPart, computeMaxMonthlyPart, computeMinMonthlyPart, ARRANGEMENTS } from "./sounds";

const MONTHS = [
    "January", "February", "Marsh", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]
export function meanMonthlyPS(station, old_PS=null, configuration) {
    console.log("configuration", configuration)
    const data_medium = station.data.monthly_medium
    const data_volume = station.data.monthly_volume
    const data_to_plot = data_medium.map((d, i)=>[MONTHS[i].slice(0, 3), d])
    const sound_scale_id = ARRANGEMENTS.find(a=>a.id===configuration.arrangement).piano
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200, yDomain: [0, 0.5], yFormat: ".0%",  marginLeft: 40, 
        })
        const part = computeMeanMonthlyPart(data_medium, data_volume, chart.highlight, sound_scale_id, configuration.inverted_pitch)
        if (!configuration.med) part.dispose()
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot, {yDomain: [0, 0.5]})
        old_PS.part.dispose()
        old_PS.plot.highlight(null)
        if (!configuration.med) return old_PS
        old_PS.part = computeMeanMonthlyPart(data_medium, data_volume, old_PS.plot.highlight, sound_scale_id, configuration.inverted_pitch)
        return old_PS
    }
}

export function maxMonthlyPS(station, old_PS, configuration) {
    const data_max = station.data.monthly_max
    const data_to_plot = data_max.map((d, i)=>[MONTHS[i].slice(0, 3), d])
    const sound_scale_id = ARRANGEMENTS.find(a=>a.id===configuration.arrangement).bass
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200,yDomain: [0, 1],yFormat: ".0%",  marginLeft: 40, 
        })
        const part = computeMaxMonthlyPart(data_max, chart.highlight, sound_scale_id)
        if (!configuration.max) part.dispose()
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot, {yDomain: [0, 1]})
        old_PS.part.dispose()
        old_PS.plot.highlight(null)
        if (!configuration.max) return old_PS
        old_PS.part = computeMaxMonthlyPart(data_max, old_PS.plot.highlight, sound_scale_id)
        return old_PS
    }
}

export function minMonthlyPS(station, old_PS, configuration) {
    const data_min = station.data.monthly_min
    const data_to_plot = data_min.map((d, i)=>[MONTHS[i].slice(0, 3), d])
    const sound_scale_id = ARRANGEMENTS.find(a=>a.id===configuration.arrangement).drum
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200,yDomain: [0, 1],yFormat: ".0%", marginLeft: 40, 
        })
        const part = computeMinMonthlyPart(data_min, chart.highlight, sound_scale_id)
        if (!configuration.min) part.dispose()
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot, {yDomain: [0, 1]})
        old_PS.part.dispose()
        old_PS.plot.highlight(null)
        if (!configuration.min) return old_PS
        old_PS.part = computeMinMonthlyPart(data_min, old_PS.plot.highlight, sound_scale_id)
        return old_PS
    }
}

export function sizePS(station, old_PS) {
    const size = station.data.size
    const size_log = {val: Math.log(size.val), min: Math.log(size.min), max: Math.log(size.max)}
    const rescale_target = [500, 120]
    const data_to_plot = [["", size.val]]
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            yType: scaleLog ,color: "lightblue", height: 700, width: 40, yDomain: [size.min, size.max],
            marginLeft: 30, marginRight: 0,
        })
        const bpm = rescale([size_log.val], [size_log.min, size_log.max], rescale_target)[0]
        return {
            plot: chart,
            bpm: bpm
        }
    } else {
        old_PS.plot.update(data_to_plot, {yDomain: [size.min, size.max]})
        old_PS.bpm = rescale([size_log.val], [size_log.min, size_log.max], rescale_target)[0]
        return old_PS
    }

}

export function rescale(values, source, target) {
    function rescaler(value) {
        let p = (value - source[0])/(source[1]-source[0])
        return p * (target[1] - target[0]) + target[0]
    }
    return values.map(v=>rescaler(v))
}
