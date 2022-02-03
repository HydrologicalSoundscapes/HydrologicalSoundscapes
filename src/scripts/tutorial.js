import {
  uiPlotPanel,
  uiOptionPanel,
  uiInfoPanel,
  currentStation,
  datasetStore,
} from "./appState";

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

const STEPS = [
  {
    highlight: { selector: "#map-pin-example", circle: true },
    action: () => {
      togglePanels(false, false, false);
      return null;
    },
    text: `A click on a hydrometric station (one of the pin on the map) will select it an load
     the associated data you can then visually and musically explore.`,
  },
  {
    highlight: { selector: "#plots-panel", circle: false },
    action: () => {
      togglePanels(true, false, false);
      currentStation.set(get(datasetStore)[2]);
      return null;
    },
    text: `Here is the bar charts panel where you can see average/max/min monthly
     streamflow values as well as the overall average streamflow.`,
  },
  {
    highlight: { selector: "#sound-controller", circle: false },
    action: () => {
      togglePanels(true, false, false);
      return null;
    },
    text: `Here you can play/pause and stop the music at all time.
     As the music plays, the bar charts will update to highlight which
      month you're currently listening to.`,
  },
  {
    highlight: { selector: "#toggle-plots", circle: true },
    action: () => {
      togglePanels(true, false, false);
      let opened = false;
      let i = setInterval(() => {
        togglePanels(opened, false, false);
        opened = !opened;
      }, 2000);
      return () => {
        clearInterval(i);
        togglePanels(false, false, false);
      };
    },
    text: `A click here shows/hides the bar charts panel.`,
  },
  {
    highlight: { selector: "#toggle-options", circle: true },
    action: () => {
      togglePanels(false, true, false);
      let opened = false;
      let i = setInterval(() => {
        togglePanels(false, opened, false);
        opened = !opened;
      }, 2000);
      return () => {
        clearInterval(i);
        togglePanels(false, false, false);
      };
    },
    text: `A click here shows/hides the options panel.`,
  },
  {
    highlight: { selector: "#toggle-about", circle: true },
    action: () => {
      togglePanels(false, false, true);
      let opened = false;
      let i = setInterval(() => {
        togglePanels(false, false, opened);
        opened = !opened;
      }, 2000);
      return () => {
        clearInterval(i);
        togglePanels(false, false, false);
      };
    },
    text: `A click here shows/hides the information panel.`,
  },
  {
    text: "All done! You're good to go!",
  },
];

function highlightElement(element_to_highlight, highlighting_element, circle) {
  const box = element_to_highlight.getBoundingClientRect();
  const w = box.width;
  const h = box.height;
  let margin;
  if (circle) {
    margin = 10;
    const s = Math.max(w, h);
    highlighting_element.style.width = `${s + margin * 2}px`;
    highlighting_element.style.height = `${s + margin * 2}px`;
    highlighting_element.style.borderRadius = "50%";
  } else {
    margin = 1;
    highlighting_element.style.width = `${w + margin * 2}px`;
    highlighting_element.style.height = `${h + margin * 2}px`;
    highlighting_element.style.borderRadius = "0";
  }
  highlighting_element.style.top = `${box.y - margin}px`;
  highlighting_element.style.left = `${box.x - margin}px`;
}

function tryGetElement(selector) {
  let count = 0,
    elem,
    interval;
  return new Promise((resolve, reject) => {
    elem = document.querySelector(selector);
    console.log(elem);
    if (!elem) {
      interval = setInterval(() => {
        count++;
        elem = document.querySelector(selector);
        console.log(count, elem);
        if (elem) {
          clearInterval(interval);
          resolve(elem);
        } else {
          if (count > 1000) {
            reject(null);
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
    const onResize = () => {
      highlightElement(
        this.current_element,
        this.highlighting_element,
        STEPS[this.step].highlight.circle
      );
    };
    this.resize_observer = new ResizeObserver((e) => {
      onResize();
    });
    window.addEventListener("resize", () => {
      console.log("window resizing");
      requestAnimationFrame(() => {
        onResize();
      });
    });
    this.current_element = null;
    this.cleanup_function = null;
  }
  stop() {
    this.panels();
    currentStation.set(this.station);
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
      this.current_element = await tryGetElement(
        STEPS[this.step].highlight.selector
      );
      console.log("this.current_element", this.current_element);
      this.resize_observer.observe(this.current_element);
      highlightElement(
        this.current_element,
        this.highlighting_element,
        STEPS[this.step].highlight.circle
      );
    } else {
      highlightElement(
        this.explaination_element,
        this.highlighting_element,
        true
      );
    }
    // update tutorial text
    this.explaination_element.textContent = STEPS[this.step].text;
    this.on_change();
  }
}
