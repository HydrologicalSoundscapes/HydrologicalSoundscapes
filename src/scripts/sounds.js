import * as Tone from "tone";
import * as d3 from "d3";
import { soundDownloadProgress } from "./appState";
import {
  DrumSampler,
  piano_files,
  bass_files,
  hangdrum_files,
  drumkit_files,
  rescale,
} from "./soundsUtils";

/**
 * Initializing the instrument sampler.
 * Note that I user a custom class for drum to map the
 * different sounds to note letters (see soundsUtils.js)
 */
const sampler_bass = new Tone.Sampler().toDestination();
const sampler_piano = new Tone.Sampler().toDestination();
const sampler_hangdrum = new Tone.Sampler().toDestination();
const sampler_drumkit = new DrumSampler();

/**
 * Initialize Tone.
 * Must be called on a user action involving
 * clicking, touching, etc.. (scroll is not enough)
 */
export async function initSampler() {
  Tone.start();
  // Tone.Transport.bpm.value = 90
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = 0;
  Tone.Transport.loopEnd = `0:${12}`;
}

/**
 * Helper function to set Tone BPM
 * @param {number} bpm beats per minute
 */
export function setBPM(bpm) {
  console.log("setting the BPM", bpm);
  Tone.Transport.bpm.set({ value: bpm });
}

/**
 * Function to convert a value between 0 and 1
 * into decibel attenuations.
 * It is not a realistic / physical attenuation, only
 * a good enough fake.
 * @param {number} volume a value between 0 and 1
 * @returns {number} decibel attenueation value between -Infinity and 0
 */
function getDecibels(volume) {
  return Math.log(volume ** 12);
}

/**
 * Set the global output volume of Tone.
 * @param {number} volume a value between 0 and 1
 */
export function setVolume(volume) {
  console.log("volume", volume);
  volume = getDecibels(volume);
  console.log("volume", volume);
  Tone.getDestination().volume.set({ value: volume });
}

/**
 * Load the sound samples files and monitor loading progress
 * using the soundDownloadProgress store accessible
 * throughout the application.
 */
export async function loadSamples() {
  const all_files = [
    ...Object.values(piano_files),
    ...Object.values(bass_files),
    ...Object.values(hangdrum_files),
    ...Object.values(drumkit_files),
  ].reduce((obj, cur) => ({ ...obj, [cur]: "downloading" }), {});

  const n_total = Object.keys(all_files).length;
  function monitorProgress(file) {
    if (all_files[file]) {
      all_files[file] = "done";
    }
    let n = Object.values(all_files).filter((f) => f === "done").length;
    soundDownloadProgress.update(() => n / n_total);
  }

  for (let file in piano_files) {
    sampler_piano.add(file, piano_files[file], () => {
      monitorProgress(piano_files[file]);
    });
  }
  for (let file in bass_files) {
    sampler_bass.add(file, bass_files[file], () => {
      monitorProgress(bass_files[file]);
    });
  }

  for (let file in hangdrum_files) {
    sampler_hangdrum.add(file, hangdrum_files[file], () => {
      monitorProgress(hangdrum_files[file]);
    });
  }
  for (let file in drumkit_files) {
    sampler_drumkit.add(file, drumkit_files[file], () => {
      monitorProgress(drumkit_files[file]);
    });
  }
}

/**
 * Create the Tone.Part object that contains the piano sounds put together in a sequence.
 * This function handles the mapping between "medium" value data and "volume"
 * value data to piano notes (pitch and velocity/volume).
 * @param {number[]} data_medium 12 values between 0 and 1, will be mapped to note pitch
 * @param {number[]} data_volume 12 unbounded values, will be mapped to note velocity
 * @param {Function} highlight_function function to call on each beat which takes an
 * index (between 0 and 11) corresponding to the current beat as its only parameter.
 * This function is typically used to synchronize changes in charts.
 * @param {string[]} scale an array containing note names (see soundsUtils.js)
 * @param {boolean} inverted_pitch should mapping be inverted/reversed? Default is false.
 * @returns A Tone.Part object containing the piano sound sequence.
 */
export function computeMeanMonthlyPart(
  data_medium,
  data_volume,
  highlight_function,
  scale,
  inverted_pitch = false
) {
  // data normalization
  console.log("inverted_pitch", inverted_pitch);
  const target_range = inverted_pitch ? [0.5, 1] : [0.6, 0.1];
  console.log("data_medium", data_medium);
  console.log("target_range", target_range);
  data_medium = rescale(data_medium, [0, 1], target_range);

  data_volume = rescale(
    data_volume,
    [d3.min(data_volume), d3.max(data_volume)],
    [0.1, 0.4]
  );

  // mapping to a sound scale
  const n = scale.length;
  const steps = Array(n + 1)
    .fill(0)
    .map((e, i) => (i * 1) / n);
  const parts = data_medium.map((d, j) => {
    let note;
    for (let i = 0; i < n; i++) {
      if (d > steps[i] && d <= steps[i + 1]) {
        note = `${scale[i]}`;
        break;
      }
    }
    return { time: `0:${j}`, note: note, velocity: data_volume[j], index: j };
  });

  // create Part
  const part = new Tone.Part((time, value) => {
    const speed = (12 / Tone.Transport.bpm.value) * 4 * 4;
    sampler_piano.triggerAttackRelease(value.note, speed, time, value.velocity);
    highlight_function(value.index);
  }, parts).start(0);

  return part;
}

/**
 * Create the Tone.Part object that contains the bass sounds put together in a sequence.
 * This function handles the mapping between "max" value data and bass notes.
 * @param {number[]} data_max 12 values between 0 and 1
 * @param {Function} highlight_function function to call on each beat which takes an
 * index (between 0 and 11) corresponding to the current beat as its only parameter.
 * This function is typically used to synchronize changes in charts.
 * @param {string[]} scale an array containing note names (see soundsUtils.js)
 * @returns A Tone.Part object containing the bass sound sequence.
 */
export function computeMaxMonthlyPart(data_max, highlight_function, scale) {
  const volume = rescale(
    data_max,
    [d3.min(data_max), d3.max(data_max)],
    [0.3, 0.6]
  ).map((d, i) => (data_max[i] === 0 ? 0 : d));
  data_max = rescale(data_max, [0, 1], [1, 0]);

  // mapping to a sound scale
  const n = scale.length;
  const steps = Array(n + 1)
    .fill(0)
    .map((e, i) => (i * 1) / n);
  const parts = data_max.map((d, j) => {
    let note;
    // if (!d) return null
    for (let i = 0; i < n; i++) {
      if (d > steps[i] && d <= steps[i + 1]) {
        note = `${scale[i]}`;
        break;
      }
    }
    return { time: `0:${j}`, note: note, velocity: volume[j], index: j };
  });
  // create Part
  const part = new Tone.Part(
    (time, value) => {
      sampler_bass.triggerAttackRelease(
        value.note,
        (12 / Tone.Transport.bpm.value) * 4 * 4,
        time,
        value.velocity
      );
      highlight_function(value.index);
    },
    parts.filter((p) => p)
  ).start(0);

  return part;
}

/**
 * Create the Tone.Part object that contains the hang drum sounds put together in a sequence.
 * This function handles the mapping between "min" value data and hang drum notes.
 * @param {number[]} data_min 12 values between 0 and 1
 * @param {Function} highlight_function function to call on each beat which takes an
 * index (between 0 and 11) corresponding to the current beat as its only parameter.
 * This function is typically used to synchronize changes in charts.
 * @param {string[]} scale an array containing note names (see soundsUtils.js)
 * @returns A Tone.Part object containing the hang drum sound sequence.
 */
export function computeMinMonthlyPart(data_min, highlight_function, scale) {
  const volume = rescale(
    data_min,
    [d3.min(data_min), d3.max(data_min)],
    [0.2, 0.3]
  ).map((d, i) => (data_min[i] === 0 ? 0 : d));
  data_min = rescale(data_min, [0, 1], [0.01, 1]);
  // console.log("data_min", data_min)

  // mapping to a sound scale
  const n = scale.length;
  const steps = Array(n + 1)
    .fill(0)
    .map((e, i) => (i * 1) / n);
  // console.log("steps", steps)
  const parts = data_min.map((d, j) => {
    let note;
    for (let i = 0; i < n; i++) {
      if (d > steps[i] && d <= steps[i + 1]) {
        note = `${scale[i]}`;
        break;
      }
    }
    // return {time: `0:${j}`, note: note, velocity: clamp((1-d)*0.5+0.5, 0.1, 0.5), index: j}
    return { time: `0:${j}`, note: note, velocity: volume[j], index: j };
  });
  // console.log("parts", parts)
  // create Part
  const part = new Tone.Part(
    (time, value) => {
      sampler_hangdrum.triggerAttackRelease(
        value.note,
        (12 / Tone.Transport.bpm.value) * 4 * 16,
        time,
        value.velocity
      );
      highlight_function(value.index);
    },
    parts.filter((p) => p)
  ).start(0);

  return part;
}

/**
 * Create the drum sequence according to a specified pattern
 * (see PATTERN object in soundsUtils.js)
 * @param {object[]} pattern pattern array (see PATTERN)
 * @returns A Tone.Part object containing the drum sequence
 */
export function computeDrumMonthlyPart(pattern) {
  // parts
  const parts = Array(12)
    .fill("")
    .map((_, j) => {
      return { time: `0:${j}`, index: j };
    });
  // create Part
  const part = new Tone.Part((time, value) => {
    Object.keys(pattern[value.index]).map((drum_element) => {
      sampler_drumkit.triggerAttackRelease(
        drum_element,
        20,
        time,
        pattern[value.index][drum_element]
      );
    });
  }, parts).start(0);

  return part;
}

/**
 * Start Tone
 */
export function startSound() {
  if (Tone.Transport.state !== "started") Tone.Transport.start();
}
/**
 * Pause Tone
 */
export function pauseSound() {
  if (Tone.Transport.state === "started") Tone.Transport.pause();
}
/**
 * Stop Tone
 */
export function stopSound() {
  if (Tone.Transport.state !== "stopped") Tone.Transport.stop();
}
