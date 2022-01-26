import * as Tone from "tone"
import * as d3 from "d3"
import {soundDownloadProgress} from "./appState"
import {rescale} from "./dataProcessing"
import {DrumSampler} from "./soundsUtils"

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
        "D1", "Eb1", "Gb1", "G1", "A1",  "C2",
        "D2", "Eb2", "Gb2", "G2", "A2",  "C3",
        "D3", "Eb3", "Gb3", "G3", "A3",  "C4",
        "D4", "Eb4", "Gb4", "G4", "A4", "C5",
        "D5", "Eb5", "Gb5", "G5", "A5",  "C6",
        "D6", "Eb6", "Gb6", "G6", "A6",  "C7", "D7"
    ],
    // Arabic_1_D: [
    //     "D1", "Eb1", "Gb1", "G1", "A1", "Bb1", "C2",
    //     "D2", "Eb2", "Gb2", "G2", "A2", "Bb2", "C3",
    //     "D3", "Eb3", "Gb3", "G3", "A3", "Bb3", "C4",
    //     "D4", "Eb4", "Gb4", "G4", "A4", "Bb4", "C5",
    //     "D5", "Eb5", "Gb5", "G5", "A5", "Bb5", "C6",
    //     "D6", "Eb6", "Gb6", "G6", "A6", "Bb6", "C7", "D7"
    // ],
    C_penta: [
        "C1", "D1", "E1", "G1", "A1", 
        "C2", "D2", "E2", "G2", "A2", 
        "C3", "D3", "E3", "G3", "A3", 
        "C4", "D4", "E4", "G4", "A4", 
        "C5", "D5", "E5", "G5", "A5", 
        "C6", "D6", "E6", "G6", "A6", 
        "C7", "D7", "E7", "G7", "A7", 
    ],
    C_G_bass: ["C2", "G2", "C3", "G3"],
    A_E_bass: ["A1", "E2", "A2", "E3"],
    D_A_bass: ["D2", "A2", "D3"],
    // C_chord: ["C3", "Eb3", "G3", "C4", "Eb4", "G4", "C5"],
    C_chord: ["C4", "E4", "G4", "C5"],
    A_chord: ["A3", "Db4", "E4", "A4"],
    Am_chord: ["A3", "C4", "E4", "A4", "C5"],
    D_chord: ["A3", "D4", "F4", "A4"]
}

export const ARRANGEMENTS = [
    {
        id: "Am", label: "Minor scale in A",
        piano: "Am", bass: "A_E_bass", drum: "Am_chord"
    },
    {
        id: "A", label: "Major scale in A",
        piano: "A", bass: "A_E_bass", drum: "A_chord"
    },
    {
        id: "C_penta", label: "Pentatonic scale in C",
        piano: "C_penta", bass: "C_G_bass", drum: "C_chord"
    },
    {
        id: "Arabic_1_D", label: "Arabic scale in D",
        piano: "Arabic_1_D", bass: "D_A_bass", drum: "D_chord"
    },
]

export const PATTERNS = [
    {
        id: "blues", label: "Blues", 
        pattern: [
            {hihatclose_low: 1, snare_hi: 0.66, ridebell: 0, kick_drum: 1},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0.66, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0.66, ridebell: 0, kick_drum: 0.66},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0.66, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
        ]
    }, 
    {
        id: "arabic", label: "Arabic",
        pattern: [
            {hihatclose_low: 0, snare_hi: 0.33, ridebell: 1, kick_drum: 1},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.33, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0.33, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.66, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 1, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.33, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0.33, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0.66, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
        ]
    },
    {
        id: "flamenco", label: "Flamenco",
        pattern: [
            {hihatclose_low: 0, snare_hi: 0, ridebell: 1, kick_drum: 1},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0.33, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0.33, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0.33, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0.33, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0.33, ridebell: 0, kick_drum: 0},
        ]
    },
    {
        id: "funk", label: "Funk",
        pattern: [
            {hihatclose_low: 0, snare_hi: 1, ridebell: 1, kick_drum: 1},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0.66, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.33, kick_drum: 0},
            {hihatclose_low: 0.66, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 1, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0.66},
            {hihatclose_low: 0, snare_hi: 0.66, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 1, kick_drum: 0},
            {hihatclose_low: 0.66, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.33, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
        ]
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
 const NOTES_HANGDRUM = [
                    "C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3",
    "A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4",
    "A4","Bb4","B4","C5",
]
const notes_hangdrum_files = {}
NOTES_HANGDRUM.forEach(n=>{
    notes_hangdrum_files[n] = `sounds/hangdrum/${n}.ogg`
})

/**
 * Drumkit samples
 * Credits: 
 * > Downloaded from https://freesound.org/people/jesterdyne/packs/5303/ on 2022-01-26
 * > Licence: http://creativecommons.org/licenses/by/3.0/
 * > File "kick-drum" is from https://freesound.org/people/ScreamStudio/sounds/410149/
 */
const NOTES_DRUMKIT = [
    'bd1',               'bd2',
    'bd3',               'bd4',
    'bd5',               'bd6',
    'china_hi',          'china_low',
    'cowbell_hi',        'cowbell_hihi',
    'crash1_hi',         'crash1_hihi',
    'crash2_hi',         'crash2_hihi',
    'hihatclose_hi',     'hihatclose_low',
    'hihat_hi',          'hihat_low',
    'hihat_mid',         'openhihat_hi',
    'openhihat_mid',     'ride_hi',
    'ride_mid',          'ridebell',
    'snare_hi',          'snare_low_mid',
    'snare_low',         'snare_mid',
    'splash1_hi',        'splash1_hihi',
    'splash2_hi',        'splash2_hihi',
    'stahloverbassdrum', "kick_drum"
  ]
const notes_drumkit_files = {}
NOTES_DRUMKIT.forEach(n=>{
    notes_drumkit_files[n] = `sounds/drumkit/${n.replace(/\_/g, "-")}.ogg`
})

const sampler_bass = new Tone.Sampler().toDestination()
const sampler_piano_loud = new Tone.Sampler().toDestination()
const sampler_hangdrum = new Tone.Sampler().toDestination()
const sampler_drumkit = new DrumSampler()


export async function initSampler() {
    Tone.start()
    Tone.Transport.bpm.value = 90
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
        ...Object.values(notes_bass_files),
        ...Object.values(notes_piano_loud_files),
        ...Object.values(notes_hangdrum_files),
        ...Object.values(notes_drumkit_files),
        // ...Object.values(NOTES_DRUMKIT),
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
    for (let file in notes_hangdrum_files) {
        sampler_hangdrum.add(file, notes_hangdrum_files[file], ()=>{
            monitorProgress(notes_hangdrum_files[file])
        })
    } 
    for (let file in notes_drumkit_files) {
        sampler_drumkit.add(file, notes_drumkit_files[file], ()=>{
            monitorProgress(notes_drumkit_files[file])
        })
    } 
}


export function computeMeanMonthlyPart(data_medium, data_volume, highlight_function, sound_scale_id="Am", inverted_pitch=false) {

    // scale
    const sound_scale = SCALES[sound_scale_id]

    // data normalization
    console.log("inverted_pitch", inverted_pitch)
    const target_range = inverted_pitch ?  [0.5, 1] : [0.6, 0.1]
    console.log("data_medium", data_medium)
    console.log("target_range", target_range)
    data_medium = rescale(data_medium, [0, 1], target_range)

    data_volume = rescale(data_volume, [d3.min(data_volume), d3.max(data_volume)], [0.1, 0.4])


    // mapping to a sound scale
    const n = sound_scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    const parts = data_medium.map((d, j)=>{
        let note
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${sound_scale[i]}`
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
        sampler_piano_loud.triggerAttackRelease(value.note, speed, time, value.velocity);

        // Object.keys(pattern[value.index]).map(drum_element=>{
        //     sampler_drumkit.triggerAttackRelease(drum_element, 20, time, pattern[value.index][drum_element])
        // })

        highlight_function(value.index)
    }, parts).start(0)

    return part
}
export function computeMaxMonthlyPart(data_max, highlight_function, sound_scale_id="A_E_bass") {
    // scale
    const sound_scale = SCALES[sound_scale_id]

    const volume = rescale(data_max, [d3.min(data_max), d3.max(data_max)], [0.3, 0.6]).map((d, i)=>data_max[i]===0?0:d)
    data_max = rescale(data_max, [0, 1], [1,  0])
    
    // mapping to a sound scale
    const n = sound_scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    const parts = data_max.map((d, j)=>{
        let note
        // if (!d) return null
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${sound_scale[i]}`
                break
            }
        }
        // return {time: `0:${j}`, note: note, velocity: clamp((1-d)*0.5+0.5, 0.1, 0.5), index: j}
        return {time: `0:${j}`, note: note, velocity: volume[j], index: j}
    })
    // console.log("parts", parts)
    // create Part
    const part = new Tone.Part((time, value) => {
        sampler_bass.triggerAttackRelease(value.note, 12/Tone.Transport.bpm.value*4*4, time, value.velocity);
        highlight_function(value.index)
    }, parts.filter(p=>p)).start(0)

    return part
}
export function computeMinMonthlyPart(data_min, highlight_function, sound_scale_id="A_chord") {
    // console.log("data_min", data_min)
    // console.log("SCALES[sound_scale_id]", SCALES[sound_scale_id])
    // scale
    const sound_scale = SCALES[sound_scale_id]

    const volume = rescale(data_min,  [d3.min(data_min), d3.max(data_min)], [0.2, 0.3]).map((d, i)=>data_min[i]===0?0:d)
    data_min = rescale(data_min, [0, 1], [0.01, 1])
    // console.log("data_min", data_min)

    // mapping to a sound scale
    const n = sound_scale.length
    const steps = Array(n+1).fill(0).map((e, i)=> i * 1/n)
    // console.log("steps", steps)
    const parts = data_min.map((d, j)=>{
        let note
        for (let i = 0; i < n; i++) {
            if (d > steps[i] && d <= steps[i+1]) {
                note = `${sound_scale[i]}`
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

export function computeDrumMonthlyPart(drum_pattern_id) {
    const pattern = PATTERNS.find(p=>p.id===drum_pattern_id).pattern
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