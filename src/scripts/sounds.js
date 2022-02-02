import * as Tone from "tone"
import * as d3 from "d3"
import {soundDownloadProgress} from "./appState"
import {DrumSampler, piano_files, bass_files, hangdrum_files, drumkit_files, rescale} from "./soundsUtils"


const sampler_bass = new Tone.Sampler().toDestination()
const sampler_piano = new Tone.Sampler().toDestination()
const sampler_hangdrum = new Tone.Sampler().toDestination()
const sampler_drumkit = new DrumSampler()


export async function initSampler() {
    Tone.start()
    // Tone.Transport.bpm.value = 90
    Tone.Transport.loop=true;
    Tone.Transport.loopStart=0;
    Tone.Transport.loopEnd=`0:${12}`;
}

export function setBPM(bpm) {
    console.log("setting the BPM", bpm)
    Tone.Transport.bpm.set({value: bpm})
}

function getDecibels(volume) {
    return Math.log(volume**12)
}
export function setVolume(volume) {
    console.log("volume", volume)
    volume = getDecibels(volume)
    console.log("volume", volume)
    Tone.getDestination().volume.set({value: volume})
}

export async function loadSamples() {

    const all_files = [
        ...Object.values(piano_files),
        ...Object.values(bass_files),
        ...Object.values(hangdrum_files),
        ...Object.values(drumkit_files),
    ].reduce((obj, cur)=>({...obj, [cur]: "downloading"}), {})
    const n_total = Object.keys(all_files).length
    function monitorProgress(file) {
        if (all_files[file]) {
            all_files[file] = "done"
        } 
        let n = Object.values(all_files).filter(f=>f==="done").length
        soundDownloadProgress.update(()=>n/n_total)
    }
    for (let file in piano_files) {
        sampler_piano.add(file, piano_files[file], ()=>{
            monitorProgress(piano_files[file])
        })
    } 
    for (let file in bass_files) {
        sampler_bass.add(file, bass_files[file], ()=>{
            monitorProgress(bass_files[file])
        })
    } 

    for (let file in hangdrum_files) {
        sampler_hangdrum.add(file, hangdrum_files[file], ()=>{
            monitorProgress(hangdrum_files[file])
        })
    } 
    for (let file in drumkit_files) {
        sampler_drumkit.add(file, drumkit_files[file], ()=>{
            monitorProgress(drumkit_files[file])
        })
    } 
}


export function computeMeanMonthlyPart(data_medium, data_volume, highlight_function, scale, inverted_pitch=false) {

    // data normalization
    console.log("inverted_pitch", inverted_pitch)
    const target_range = inverted_pitch ?  [0.5, 1] : [0.6, 0.1]
    console.log("data_medium", data_medium)
    console.log("target_range", target_range)
    data_medium = rescale(data_medium, [0, 1], target_range)

    data_volume = rescale(data_volume, [d3.min(data_volume), d3.max(data_volume)], [0.1, 0.4])


    // mapping to a sound scale
    const n = scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    const parts = data_medium.map((d, j)=>{
        let note
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${scale[i]}`
                break
            }
        }
        return {time: `0:${j}`, note: note, velocity: data_volume[j], index: j}
    })

    // const pattern = PATTERNS.blues
    // const pattern = PATTERNS.arabic
    // create Part
    const part = new Tone.Part((time, value) => {
        const speed = 12/Tone.Transport.bpm.value*4*4
        sampler_piano.triggerAttackRelease(value.note, speed, time, value.velocity);

        // Object.keys(pattern[value.index]).map(drum_element=>{
        //     sampler_drumkit.triggerAttackRelease(drum_element, 20, time, pattern[value.index][drum_element])
        // })

        highlight_function(value.index)
    }, parts).start(0)

    return part
}
export function computeMaxMonthlyPart(data_max, highlight_function, scale) {

    const volume = rescale(data_max, [d3.min(data_max), d3.max(data_max)], [0.3, 0.6]).map((d, i)=>data_max[i]===0?0:d)
    data_max = rescale(data_max, [0, 1], [1,  0])
    
    // mapping to a sound scale
    const n = scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    const parts = data_max.map((d, j)=>{
        let note
        // if (!d) return null
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${scale[i]}`
                break
            }
        }
        // return {time: `0:${j}`, note: note, velocity: clamp((1-d)*0.5+0.5, 0.1, 0.5), index: j}
        return {time: `0:${j}`, note: note, velocity: volume[j], index: j}
    })
    console.log("steps bass", steps)
    console.log("scale bass", scale)
    console.log("parts bass", parts)
    // create Part
    const part = new Tone.Part((time, value) => {
        sampler_bass.triggerAttackRelease(value.note, 12/Tone.Transport.bpm.value*4*4, time, value.velocity);
        highlight_function(value.index)
    }, parts.filter(p=>p)).start(0)

    return part
}
export function computeMinMonthlyPart(data_min, highlight_function, scale) {

    const volume = rescale(data_min,  [d3.min(data_min), d3.max(data_min)], [0.2, 0.3]).map((d, i)=>data_min[i]===0?0:d)
    data_min = rescale(data_min, [0, 1], [0.01, 1])
    // console.log("data_min", data_min)

    // mapping to a sound scale
    const n = scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    // console.log("steps", steps)
    const parts = data_min.map((d, j)=>{
        let note
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${scale[i]}`
                break
            }
        }
        // return {time: `0:${j}`, note: note, velocity: clamp((1-d)*0.5+0.5, 0.1, 0.5), index: j}
        return {time: `0:${j}`, note: note, velocity: volume[j], index: j}
    })
    // console.log("parts", parts)
    // create Part
    const part = new Tone.Part((time, value) => {
        sampler_hangdrum.triggerAttackRelease(value.note, 12/Tone.Transport.bpm.value*4*16, time, value.velocity);
        highlight_function(value.index)
    }, parts.filter(p=>p)).start(0)

    return part
}

export function computeDrumMonthlyPart(pattern) {
    // parts 
    const parts = Array(12).fill("").map((_, j)=>{
        return {time: `0:${j}`, index: j}
    })
    // create Part
    const part = new Tone.Part((time, value) => {
        Object.keys(pattern[value.index]).map(drum_element=>{
            sampler_drumkit.triggerAttackRelease(drum_element, 20, time, pattern[value.index][drum_element])
        })
    }, parts).start(0)

    return part
}


export function startSound() {
    if ( Tone.Transport.state !== "started") Tone.Transport.start();
}
export function pauseSound() {
    if ( Tone.Transport.state === "started") Tone.Transport.pause();
}
export function stopSound() {
    if ( Tone.Transport.state !== "stopped") Tone.Transport.stop();
}