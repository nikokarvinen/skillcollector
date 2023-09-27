import { defineStore } from "pinia";
import { ref } from "vue";

interface Selections {
  [key: string]: {
    [key: string]: string;
  };
}

export const selectionsSummary = defineStore("selections", () => {
  const selections = ref<Selections>({});

  const select = (cat: string, skill: string, val: string) => {
    selections.value[cat] = selections.value[cat] || {};
    selections.value[cat][skill] = val;
  };

  const remove = (cat: string, skill: string) => {
    if (selections.value[cat] && selections.value[cat][skill]) {
      delete selections.value[cat][skill];
      if (Object.keys(selections.value[cat]).length === 0) {
        delete selections.value[cat];
      }
    }
  };

  const reset = () => {
    selections.value = {};
  };

  const getter = () => {
    return selections.value;
  };

  return { select, remove, getter, reset };
});
