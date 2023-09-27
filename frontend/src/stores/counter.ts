import { defineStore } from "pinia";
import { ref } from "vue";

interface Counter {
  [key: string]: {
    [key: string]: Array<string>;
  };
}

export const selectionCounter = defineStore("counter", () => {
  const loadedCounters = localStorage.getItem("counters");
  const counters = ref<Counter>(
    loadedCounters
      ? JSON.parse(loadedCounters)
      : {
          SFIA: {
            1: [],
            2: [],
            3: [],
            4: [],
          },
          soft: {
            1: [],
            2: [],
            3: [],
          },
        }
  );

  const progressValue = ref(0);

  // Function to save data to localStorage
  const saveCounters = () => {
    localStorage.setItem("counters", JSON.stringify(counters.value));
  };

  const saveProgressValue = (value: number) => {
    progressValue.value = value;
    localStorage.setItem("progress", JSON.stringify(progressValue.value));
  };

  const loadProgressValue = () => {
    const loadedProgress = localStorage.getItem("progress");
    if (loadedProgress) {
      progressValue.value = JSON.parse(loadedProgress);
    }
  };

  const increment = (category: string, index: string, skill: string) => {
    for (const arr of Object.keys(counters.value[category])) {
      if ([...counters.value[category][arr]].includes(skill)) {
        decrement(category, arr, skill);
      }
    }
    if (counters.value[category][index].length < 5) counters.value[category][index].push(skill);
    saveCounters(); // Save to localStorage after increment
  };

  const decrement = (category: string, index: string, skill: string) => {
    if (counters.value[category][index].length > 0) {
      counters.value[category][index].splice([...counters.value[category][index]].indexOf(skill), 1);
    }
    saveCounters(); // Save to localStorage after decrement
  };

  const get = (category: string, index: string, comparison?: number) => {
    return comparison ? counters.value[category][index].length == comparison : counters.value[category][index].length;
  };

  const validateSelections = () => {
    const sfiaCount = Object.values(counters.value.SFIA).flat().length;
    const softCount = Object.values(counters.value.soft).flat().length;
    return sfiaCount === 20 && softCount === 3;
  };

  const reset = () => {
    counters.value = {
      SFIA: {
        1: [],
        2: [],
        3: [],
        4: [],
      },
      soft: {
        1: [],
        2: [],
        3: [],
      },
    };
    saveCounters(); // Save to localStorage after reset
    progressValue.value = 0; // Reset progress value after reset
    saveProgressValue(progressValue.value); // Save to localStorage after reset
  };

  return { increment, decrement, get, validateSelections, reset, saveProgressValue, loadProgressValue, progressValue };
});
