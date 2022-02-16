import {
  uiPlotPanel,
  uiOptionPanel,
  uiInfoPanel,
  currentStation,
  centerStation,
  mapStore,
} from "./appState";
import { _ } from "svelte-i18n";

import { get } from "svelte/store";

function togglePanels(plots = false, options = false, info = false) {
  let p, o, i;
  uiPlotPanel.update((old_value) => {
    p = old_value;
    return plots;
  });
  uiOptionPanel.update((old_value) => {
    o = old_value;
    return options;
  });
  uiInfoPanel.update((old_value) => {
    i = old_value;
    return info;
  });
  return () => {
    uiPlotPanel.set(p);
    uiOptionPanel.set(o);
    uiInfoPanel.set(i);
  };
}

let memory = {};
const STEPS = [
  {
    highlight: { selector: "#map", circle: false, offset: { top: 60 } },
    action: () => {
      togglePanels(false, false, false);
      let map = get(mapStore);
      let station = get(centerStation);
      memory.zoom = map.getZoom();
      memory.center = map.getCenter();
      memory.station = get(currentStation);
      mapStore.update((m) =>
        m.panTo(
          { lat: station.info.lat, lng: station.info.lon },
          { animate: true, duration: 1 }
        )
      );
      return null;
    },
    cleanup: () => {
      currentStation.set(memory.station);
      mapStore.update((m) => {
        m.setView(memory.center, memory.zoom, {
          animate: true,
          duration: 1,
        });
        console.log(m.$example_pin.marker);
        m.$example_pin.marker.setIcon(m.$example_pin.icon_default);
        return m;
      });
    },
    text: "tutorial.1",
  },
  {
    highlight: { selector: "#pin-example", circle: true },
    // highlight: { selector: "#map", circle: false, offset: { top: 60 } },
    action: () => {
      togglePanels(false, false, false);
      let station = get(centerStation);
      currentStation.set(station);
      mapStore.update((m) => {
        m.setView({ lat: station.info.lat, lng: station.info.lon }, 6, {
          animate: true,
          duration: 1,
        });
        m.$example_pin.marker.setIcon(m.$example_pin.icon_selected);
        return m;
      });
      console.log("memory", memory);
      return null;
    },
    text: "tutorial.2",
  },
  {
    highlight: { selector: "#plots-panel", circle: false },
    action: () => {
      togglePanels(true, false, false);
      return null;
    },
    text: "tutorial.3",
  },
  {
    highlight: { selector: "#toggle-plots", circle: true },
    action: () => {
      togglePanels(true, false, false);
      return () => {
        togglePanels(false, false, false);
      };
    },
    text: "tutorial.4",
  },
  {
    highlight: { selector: "#sound-controller", circle: true },
    action: () => {
      togglePanels(true, false, false);
      return null;
    },
    text: "tutorial.5",
  },
  {
    highlight: { selector: "#toggle-options", circle: true },
    action: () => {
      togglePanels(false, true, false);
      return () => {
        togglePanels(false, false, false);
      };
    },
    text: "tutorial.6",
  },
  {
    text: "tutorial.7",
  },
];

function highlightElement(
  element_to_highlight,
  highlighting_element,
  circle,
  offset = null
) {
  offset = offset ? offset : {};
  const o = { top: 0, right: 0, bottom: 0, left: 0, ...offset };
  const box = element_to_highlight.getBoundingClientRect();
  const w = box.width - o.left - o.right;
  const h = box.height - o.top - o.bottom;
  let margin;
  if (circle) {
    margin = 10;
    const s = Math.max(w, h);
    highlighting_element.style.width = `${s + margin * 2}px`;
    highlighting_element.style.height = `${s + margin * 2}px`;
    highlighting_element.style.top = `${
      box.y + o.top - margin - (s - h) / 2
    }px`;
    highlighting_element.style.left = `${
      box.x + o.left - margin - (s - w) / 2
    }px`;
    highlighting_element.style.borderRadius = "50%";
  } else {
    margin = -4;
    highlighting_element.style.width = `${w + margin * 2}px`;
    highlighting_element.style.height = `${h + margin * 2}px`;
    highlighting_element.style.top = `${box.y + o.top - margin}px`;
    highlighting_element.style.left = `${box.x + o.left - margin}px`;
    highlighting_element.style.borderRadius = "0";
  }
}

function tryGetElement(selector) {
  let count = 0,
    elem,
    interval;
  return new Promise((resolve, reject) => {
    elem = document.querySelector(selector);
    if (!elem) {
      interval = setInterval(() => {
        count++;
        elem = document.querySelector(selector);
        // console.log(count, elem);
        if (elem) {
          clearInterval(interval);
          resolve(elem);
        } else {
          if (count > 500) {
            clearInterval(interval);
            resolve(null);
          }
        }
      }, 10);
    } else {
      resolve(elem);
    }
  });
}

export class Tutorial {
  constructor(
    highlighting_element,
    explaination_element,
    nohighlight_element,
    on_change = () => {}
  ) {
    this.on_change = on_change;
    this.step = 0;
    this.panels = togglePanels(false, false, false);
    currentStation.update((station) => {
      this.station = station;
      return null;
    });
    this.highlighting_element = highlighting_element;
    this.explaination_element = explaination_element;
    this.nohighlight_element = nohighlight_element;

    this.resize_observer = new ResizeObserver((e) => {
      this.onResize();
    });
    this.current_element = null;
    this.cleanup_function = null;
  }
  onResize() {
    highlightElement(
      this.current_element,
      this.highlighting_element,
      STEPS[this.step].highlight.circle,
      STEPS[this.step].highlight.offset
    );
  }
  length() {
    return STEPS.length;
  }
  current() {
    return this.step;
  }
  stop() {
    this.panels();
    currentStation.set(this.station);
    if (this.cleanup_function) {
      this.cleanup_function();
      this.cleanup_function = null;
    }
    if (this.current_element) {
      this.resize_observer.unobserve(this.current_element);
    }
    for (let step of STEPS) {
      if (step.cleanup) step.cleanup();
    }
    this.on_change();
  }
  hasNextStep() {
    return !(this.step >= STEPS.length - 1);
  }
  nextStep() {
    if (this.step >= STEPS.length - 1) {
      console.warn("There's no next step");
      return;
    }
    if (this.hasNextStep()) {
      this.step++;
      this.setupStep();
      this.on_change();
    }
  }
  hasPreviousStep() {
    return !(this.step <= 0);
  }
  previousStep() {
    if (this.hasPreviousStep()) {
      this.step--;
      this.setupStep();
      this.on_change();
    }
  }

  async setupStep() {
    // actions to do to clean up previous step
    if (this.cleanup_function) {
      this.cleanup_function();
      this.cleanup_function = null;
    }
    // actions to do to before
    if (STEPS[this.step].action) {
      this.cleanup_function = STEPS[this.step].action();
    }
    // highlight element
    if (this.current_element) {
      this.resize_observer.unobserve(this.current_element);
    }
    if (STEPS[this.step].highlight) {
      const element = await tryGetElement(STEPS[this.step].highlight.selector);
      console.log(element);
      if (element) {
        this.current_element = element;
      } else {
        console.error(
          `No match found for element with id ${
            STEPS[this.step].highlight.selector
          }`
        );
      }
      this.resize_observer.observe(this.current_element);
      highlightElement(
        this.current_element,
        this.highlighting_element,
        STEPS[this.step].highlight.circle,
        STEPS[this.step].highlight.offset
      );
    } else {
      highlightElement(
        this.nohighlight_element,
        this.highlighting_element,
        true
      );
    }
    // update tutorial text
    // this.explaination_element.textContent = STEPS[this.step].text;
    this.explaination_element.textContent = get(_)(STEPS[this.step].text);
    this.on_change();
  }
}
