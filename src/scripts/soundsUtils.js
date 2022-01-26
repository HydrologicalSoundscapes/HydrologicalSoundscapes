import * as Tone from "tone"

/**
 * This class is a wrapper around Tone.Sampler class
 * to handle a drum kit where samples are not actual notes
 * but drumkit element. It handles the mapping between the drumkit
 * elements and actual notes reckognized by the Sampler class.
 */
export class DrumSampler{

    constructor() {
        this.sampler = new Tone.Sampler().toDestination()
        this.note_keys = [
            "A0","Bb0","B0","C1","Db1","D1","Eb1","E1","F1","Gb1","G1","Ab1",
            "A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2",
            "A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3",
            "A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4",
            "A4","Bb4","B4","C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5",
            "A5","Bb5","B5","C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6",
            "A6","Bb6","B6","C7","Db7","D7","Eb7","E7","F7","Gb7","G7","Ab7",
            "A7","Bb7","B7","C8"
        ]
        this.index=0
        this.notes={}
    }

    add(note, file, callback) {
        this.notes[note] = this.note_keys[this.index]
        this.index++
        this.sampler.add(this.notes[note], file, callback)
    }

    triggerAttackRelease(note, duration, time, velocity) {
        this.sampler.triggerAttackRelease(this.notes[note], duration, time, velocity)
    }

}

export function rescale(values, source, target) {
    function rescaler(value) {
        let p = (value - source[0])/(source[1]-source[0])
        return p * (target[1] - target[0]) + target[0]
    }
    return values.map(v=>rescaler(v))
}



export const SCALES = {
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
            {hihatclose_low: 1, snare_hi: 0.66, ridebell: 0, kick_drum: 0.66},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0.66, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 1, snare_hi: 0.66, ridebell: 0, kick_drum: 0.33},
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
            {hihatclose_low: 0, snare_hi: 0.33, ridebell: 1, kick_drum: 0.66},
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
            {hihatclose_low: 0, snare_hi: 0, ridebell: 1, kick_drum: 0.66},
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
            {hihatclose_low: 0, snare_hi: 1, ridebell: 1, kick_drum: 0.66},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0.66, ridebell: 0.66, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 0.33, kick_drum: 0},
            {hihatclose_low: 0.66, snare_hi: 0, ridebell: 0, kick_drum: 0},
            {hihatclose_low: 0, snare_hi: 0, ridebell: 1, kick_drum: 0},
            {hihatclose_low: 0.33, snare_hi: 0, ridebell: 0, kick_drum: 0.33},
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
function builPianoFiles() {
    // const notes_piano_med_files = {}
    const notes_piano_loud_files = {}
    NOTES_PIANO.forEach(n=>{
        notes_piano_loud_files[n] = `sounds/piano/${n.toLowerCase()}_loud.ogg`
        // notes_piano_med_files[n] = `sounds/piano/${n.toLowerCase()}_med.ogg`
        // if (MISSING_MED_NOTES.includes(n)) {
        //     notes_piano_med_files[n] = `sounds/piano/${n.toLowerCase()}_loud.ogg`
        // }
    })
    return notes_piano_loud_files
}

export const piano_files = builPianoFiles()

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


function builBassFiles() {
    const notes_bass_files = {}
    NOTES_BASS.forEach(n=>{
        notes_bass_files[n] = `sounds/bass/${n}.ogg`
    })
    return notes_bass_files
}

export const bass_files = builBassFiles()


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

function builHangDrumFiles() {
    const notes_hangdrum_files = {}
    NOTES_HANGDRUM.forEach(n=>{
        notes_hangdrum_files[n] = `sounds/hangdrum/${n}.ogg`
    })
    return notes_hangdrum_files
}

export const hangdrum_files = builHangDrumFiles()


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


function builDrumkitFiles() {
    const notes_drumkit_files = {}
    NOTES_DRUMKIT.forEach(n=>{
        notes_drumkit_files[n] = `sounds/drumkit/${n.replace(/\_/g, "-")}.ogg`
    })
    return notes_drumkit_files
}

export const drumkit_files = builDrumkitFiles()
