import { BarChart } from "./plots";
import { computeMeanMonthlyPart, computeMaxMonthlyPart, ARRANGEMENTS } from "./sounds";

export function meanMonthlyPS(station, old_PS=null, arrangement_id) {
    // FIXME: should data be formatted differently before use?
    const data_raw = station.data.Q_month_mean
    const data_to_plot = Array(data_raw.info.length).fill([null, null]).map((d, i)=>{
        return [data_raw.data.month_index[i], data_raw.data.discharge[i]]
    })
    const discharge = station.data.Q_month_mean.data.discharge
    const coeff_var = station.data.Q_month_cv.data.cv
    const sound_scale_id = ARRANGEMENTS.filter(a=>a.id===arrangement_id)[0].piano // FIXME: dangerous, assum filters will always word
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200,
        })
        const part = computeMeanMonthlyPart(discharge, coeff_var, chart.highlight, sound_scale_id)
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot)
        old_PS.part.dispose()
        old_PS.part = computeMeanMonthlyPart(discharge, coeff_var, old_PS.plot.highlight, sound_scale_id)
        return old_PS
    }
}

export function maxMonthlyPS(station, old_PS, arrangement_id) {
    const data_raw = station.data.Q_monthly_freq_daily_max
    const data_to_plot = Array(data_raw.info.length).fill([null, null]).map((d, i)=>{
        return [data_raw.data.month_index[i], data_raw.data.freq_daily_max[i]]
    })
    const max_frequencies = station.data.Q_monthly_freq_daily_max.data.freq_daily_max
    const sound_scale_id = ARRANGEMENTS.filter(a=>a.id===arrangement_id)[0].bass
    if (!old_PS) {
        const chart = BarChart(data_to_plot, {
            x: (d, i) => d[0],
            y: (d, i) => d[1],
            color: "lightblue", height: 200,
        })
        const part = computeMaxMonthlyPart(max_frequencies, chart.highlight, sound_scale_id)
        return {
            plot: chart,
            part: part
        }
    } else {
        old_PS.plot.update(data_to_plot)
        old_PS.part.dispose()
        old_PS.part = computeMaxMonthlyPart(max_frequencies, old_PS.plot.highlight, sound_scale_id)
        return old_PS
    }
}
