import { BarChart } from "./plots";
import { computeMeanMonthlyPart, computeMaxMonthlyPart, computeMinMonthlyPart, ARRANGEMENTS } from "./sounds";

const MONTHS = [
    "January", "February", "Marsh", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]
export function meanMonthlyPS(station, old_PS=null, arrangement_id) {
    const data_medium = station.data.monthly_medium
    const data_volume = station.data.monthly_volume
    const data_to_plot = data_medium.map((d, i)=>[MONTHS[i].slice(0, 3), d])
    const sound_scale_id = ARRANGEMENTS.find(a=>a.id===arrangement_id).piano
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200, yDomain: [0, 0.5],
        })
        const part = computeMeanMonthlyPart(data_medium, data_volume, chart.highlight, sound_scale_id)
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot, {yDomain: [0, 0.5]})
        old_PS.part.dispose()
        old_PS.part = computeMeanMonthlyPart(data_medium, data_volume, old_PS.plot.highlight, sound_scale_id)
        return old_PS
    }
}

export function maxMonthlyPS(station, old_PS, arrangement_id) {
    const data_max = station.data.monthly_max
    const data_to_plot = data_max.map((d, i)=>[MONTHS[i].slice(0, 3), d])
    const sound_scale_id = ARRANGEMENTS.find(a=>a.id===arrangement_id).bass
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200,yDomain: [0, 1],
        })
        const part = computeMaxMonthlyPart(data_max, chart.highlight, sound_scale_id)
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot, {yDomain: [0, 1]})
        old_PS.part.dispose()
        old_PS.part = computeMaxMonthlyPart(data_max, old_PS.plot.highlight, sound_scale_id)
        return old_PS
    }
}

export function minMonthlyPS(station, old_PS, arrangement_id) {
    const data_min = station.data.monthly_min
    const data_to_plot = data_min.map((d, i)=>[MONTHS[i].slice(0, 3), d])
    const sound_scale_id = ARRANGEMENTS.find(a=>a.id===arrangement_id).drum
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200,yDomain: [0, 1],
        })
        const part = computeMinMonthlyPart(data_min, chart.highlight, sound_scale_id)
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot, {yDomain: [0, 1]})
        old_PS.part.dispose()
        old_PS.part = computeMinMonthlyPart(data_min, old_PS.plot.highlight, sound_scale_id)
        return old_PS
    }
}
