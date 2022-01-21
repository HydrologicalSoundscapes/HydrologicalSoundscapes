import * as Tone from "tone"
import * as d3 from "d3"
import {soundDownloadProgress} from "./appState"

const SCALES = {
    Am: [
        "A1", "B1", "C2", "D2", "E2", "F2", "G2", 
        "A2", "B2", "C3", "D3", "E3", "F3", "G3", 
        "A3", "B3", "C4", "D4", "E4", "F4", "G4",
        "A4", "B4", "C5", "D5", "E5", "F5", "G5",
        "A5", "B5", "C6", "D6", "E6", "F6", "G6",
        "A6", "B6", "C7", "D7", "E7", "F7", "G7",
    ],
    A: [
        "A1", "B1", "Db2", "D2", "E2", "Gb2", "Ab2", 
        "A2", "B2", "Db3", "D3", "E3", "Gb3", "Ab3", 
        "A3", "B3", "Db4", "D4", "E4", "Gb4", "Ab4",
        "A4", "B4", "Db5", "D5", "E5", "Gb5", "Ab5",
        "A5", "B5", "Db6", "D6", "E6", "Gb6", "Ab6",
        "A6", "B6", "Db7", "D7", "E7", "Gb7", "Ab7",
    ],
    Arabic_1_D: [
        "D1", "Eb1", "Gb1", "G1", "A1", "Bb1", "C2",
        "D2", "Eb2", "Gb2", "G2", "A2", "Bb2", "C3",
        "D3", "Eb3", "Gb3", "G3", "A3", "Bb3", "C4",
        "D4", "Eb4", "Gb4", "G4", "A4", "Bb4", "C5",
        "D5", "Eb5", "Gb5", "G5", "A5", "Bb5", "C6",
        "D6", "Eb6", "Gb6", "G6", "A6", "Bb6", "C7", "D7"
    ],
    C_penta: [
        "C1", "D1", "E1", "G1", "A1", 
        "C2", "D2", "E2", "G2", "A2", 
        "C3", "D3", "E3", "G3", "A3", 
        "C4", "D4", "E4", "G4", "A4", 
        "C5", "D5", "E5", "G5", "A5", 
        "C6", "D6", "E6", "G6", "A6", 
        "C7", "D7", "E7", "G7", "A7", 
    ],
    C_G_bass: ["C2", "G2", "C3", "G3", "C4"],
    A_E_bass: ["A1", "E2", "A2", "E3", "A3", "E4"],
    D_A_bass: ["D2", "A2", "D3", "A3", "D4"]
}

export const ARRANGEMENTS = [
    {
        id: "Am", label: "A minor",
        piano: "Am", bass: "A_E_bass"
    },
    {
        id: "A", label: "A major",
        piano: "A", bass: "A_E_bass"
    },
    {
        id: "C_penta", label: "Pentatonic in C",
        piano: "C_penta", bass: "C_G_bass"
    },
    {
        id: "Arabic_1_D", label: "Arabic scale in D",
        piano: "Arabic_1_D", bass: "D_A_bass"
    },
]

/**
 * Piano samples:
 * sampled notes range from A0 to C8:
 * A0, Bb0, B0, C1, Db1 ... A7, Bb7, B7, C8
 * Credits: 
 * > Downloaded from  https://freesound.org/people/neatonk/packs/9133/ (2022-01-17)
 * > Licence: http://creativecommons.org/licenses/by/3.0/
 * > Please visite samples creators web site: http://theremin.music.uiowa.edu/
 */
const NOTES_PIANO = [
    "A0","Bb0","B0","C1","Db1","D1","Eb1","E1","F1","Gb1","G1","Ab1",
    "A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2",
    "A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3",
    "A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4",
    "A4","Bb4","B4","C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5",
    "A5","Bb5","B5","C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6",
    "A6","Bb6","B6","C7","Db7","D7","Eb7","E7","F7","Gb7","G7","Ab7",
    "A7","Bb7","B7","C8"
]
const MISSING_MED_NOTES = ["A0", "Bb0", "Gb7"]
const notes_piano_med_files = {}
const notes_piano_loud_files = {}
NOTES_PIANO.forEach(n=>{
    notes_piano_loud_files[n] = `sounds/piano/${n.toLowerCase()}_loud.ogg`
    notes_piano_med_files[n] = `sounds/piano/${n.toLowerCase()}_med.ogg`
    if (MISSING_MED_NOTES.includes(n)) {
        notes_piano_med_files[n] = `sounds/piano/${n.toLowerCase()}_loud.ogg`
    }
})

/**
 * Bass samples
 * sampled notes ranges from E1 to Gb4
 * Credits: 
 * > Downloaded from https://freesound.org/people/pjcohen/packs/21521/ (2022-01-18)
 * > Licence: Creative Commons 0: http://creativecommons.org/publicdomain/zero/1.0/
 */
 const NOTES_BASS = [
                                          "E1","F1","Gb1","G1","Ab1",
    "A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2",
    "A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3",
    "A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4",
]
const notes_bass_files = {}
NOTES_BASS.forEach(n=>{
    notes_bass_files[n] = `sounds/bass/${n}.ogg`
})


/**
 * Hang drum samples
 * sampled notes ranges from C3 to C5
 * Credits: 
 * > Downloaded from 
 * > Licence: Creative Commons 0
 * > modified by B. Renard
 */
 const NOTES_DRUM = [
                    "C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3",
    "A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4",
    "A4","Bb4","B4","C5",
]
const notes_drum_files = {}
NOTES_DRUM.forEach(n=>{
    notes_drum_files[n] = `sounds/drum/${n}.ogg`
})


const sampler_bass = new Tone.Sampler().toDestination()
const sampler_piano_loud = new Tone.Sampler().toDestination()
const sampler_drum = new Tone.Sampler().toDestination()
// const sampler_piano_med = new Tone.Sampler().toDestination()

export async function initSampler() {
    Tone.start()
    Tone.Transport.bpm.value = 325
    Tone.Transport.loop=true;
    Tone.Transport.loopStart=0;
    Tone.Transport.loopEnd=`0:${12}`;
}

export function setBPM(bpm) {
    console.log("setting the BPM", bpm)
    // Tone.Transport.bpm.value = bpm
    Tone.Transport.bpm.rampTo(bpm, 0.5);

}

export async function loadSamples() {

    const all_files = [
        ...Object.values(notes_bass_files),
        ...Object.values(notes_piano_loud_files),
        ...Object.values(notes_drum_files),
        // ...Object.values(notes_piano_med_files),
    ].reduce((obj, cur)=>({...obj, [cur]: "downloading"}), {})
    const n_total = Object.keys(all_files).length
    function monitorProgress(file) {
        if (all_files[file]) {
            all_files[file] = "done"
        } 
        let n = Object.values(all_files).filter(f=>f==="done").length
        soundDownloadProgress.update(()=>n/n_total)
    }

    for (let file in notes_bass_files) {
        sampler_bass.add(file, notes_bass_files[file], ()=>{
            monitorProgress(notes_bass_files[file])
        })
    } 
    for (let file in notes_piano_loud_files) {
        sampler_piano_loud.add(file, notes_piano_loud_files[file], ()=>{
            monitorProgress(notes_piano_loud_files[file])
        })
    } 
    for (let file in notes_drum_files) {
        sampler_drum.add(file, notes_drum_files[file], ()=>{
            monitorProgress(notes_drum_files[file])
        })
    } 
    // for (let file in notes_piano_med_files) {
    //     sampler_piano_med.add(file, notes_piano_med_files[file], ()=>{
    //         monitorProgress(notes_piano_med_files[file])
    //     })
    // } 
}

export function computeMeanMonthlyPart(discharge, coeff_var, highlight_function, sound_scale_id="Am") {
    console.log("................................")

    // scale
    const sound_scale = SCALES[sound_scale_id]

    // data normalization
    const discharge_sum = d3.sum(discharge)
    const discharge_normalized = discharge.map(d=>(1-d/discharge_sum) - 0.25)
    console.log("discharge_normalized", discharge_normalized)

    const coeff_var_max = d3.max(coeff_var)
    const coeff_var_min = d3.min(coeff_var)
    const coeff_var_normalized = coeff_var.map(d=>(d-coeff_var_min)/(coeff_var_max-coeff_var_min)*0.8+0.1)
    console.log("coeff_var_normalized", coeff_var_normalized)

    // mapping to a sound scale
    const n = sound_scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    const parts = discharge_normalized.map((d, j)=>{
        let note
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${sound_scale[i]}`
                break
            }
        }
        return {time: `0:${j}`, note: note, velocity: coeff_var_normalized[j], index: j}
    })
    console.log("parts", parts)

    // create Part
    // if (main_part) main_part.dispose()
    const part = new Tone.Part((time, value) => {
        // console.log("time => ", time)
        sampler_piano_loud.triggerAttackRelease(value.note, 0.5, time, value.velocity);
        highlight_function(value.index)
    }, parts).start(0)

    return part
}
export function computeMaxMonthlyPart(max_frequencies, highlight_function, sound_scale_id="A_E_bass") {
    // scale
    const sound_scale = SCALES[sound_scale_id]

    // data normalization
    // const Q_sum = d3.sum(monthly_values)
    const max_frequencies_normalized = max_frequencies.map(d=>{
        let val = 1-d
        if (val === 0) return null
        if (val === 1) return null
        return val
    })
    console.log("max_frequencies_normalized", max_frequencies_normalized)

    // mapping to a sound scale
    const n = sound_scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    const parts = max_frequencies_normalized.map((d, j)=>{
        let note
        if (!d) return null
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${sound_scale[i]}`
                break
            }
        }
        // return {time: `0:${j}`, note: note, velocity: clamp((1-d)*0.5+0.5, 0.1, 0.5), index: j}
        return {time: `0:${j}`, note: note, velocity: (1-d)*0.8+0.2, index: j}
    })
    console.log("parts", parts)
    // create Part
    // if (max_part) max_part.dispose()
    const part = new Tone.Part((time, value) => {
        sampler_bass.triggerAttackRelease(value.note, 20, time, value.velocity);
        highlight_function(value.index)
    }, parts.filter(p=>p)).start(0)

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