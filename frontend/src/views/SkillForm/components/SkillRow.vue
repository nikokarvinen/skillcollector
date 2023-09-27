<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

let tooltipIcon = ref(null);
let tooltipElement = ref<HTMLElement | null>(null);
let tooltipRef = ref<HTMLElement | null>(null);
onMounted(() => {
  tooltipIcon.value = document.querySelector(".tooltip-icon");
  tooltipElement.value = tooltipRef.value;
});

const positionTooltip = (event) => {
  const tooltipText = tooltipRef.value;
  const iconBox = event.target.getBoundingClientRect();
  const iconTop = iconBox.top;
  const iconBottom = iconBox.bottom;
  const screenHeight = window.innerHeight;

  if (tooltipText) {
    const tooltipHeight = tooltipText.offsetHeight;

    tooltipText.style.visibility = "visible";
    if (iconTop > tooltipHeight + 100) {
      // More space above the icon than the tooltip height
      tooltipText.style.bottom = "150%";
      tooltipText.style.top = "auto";
      tooltipText.classList.remove("below");
      tooltipText.classList.add("above");
    } else if (screenHeight - iconBottom > tooltipHeight + 10) {
      // More space below the icon than the tooltip height
      tooltipText.style.top = "150%";
      tooltipText.style.bottom = "auto";
      tooltipText.classList.remove("above");
      tooltipText.classList.add("below");
    } else {
      // Default to above if none of the conditions meet
      tooltipText.style.bottom = "150%";
      tooltipText.style.top = "auto";
      tooltipText.classList.remove("below");
      tooltipText.classList.add("above");
    }
  }
};

const props = defineProps({
  inputCount: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  prev: {
    type: Number,
    required: false,
  },
  counter: {
    type: Object,
    required: true,
  },
});

// Based on inputCount, we know if the category is soft or SFIA
const category = ref(props.inputCount === 3 ? "soft" : "SFIA");

// Inside the `clear` function
const clear = (category: string) => {
  // Get expiry time from local storage and convert it to a number
  const expiry = Number(localStorage.getItem("expiry"));
  const now = new Date().getTime();

  if (expiry && now >= expiry) {
    // The data has expired, clear the radio button selection and remove data from local storage
    let input: HTMLInputElement | null = document.querySelector(`#${category} input:checked`);
    if (input) {
      input.checked = false;
    }

    // Remove expired data from local storage
    localStorage.removeItem("inputs");
    localStorage.removeItem("progressBarValue");
    localStorage.removeItem("expiry");
  } else {
    // The data has not expired, do what you previously did
    let input: HTMLInputElement | null = document.querySelector(`#${category} input:checked`);
    if (input) {
      input.checked = false;
      input.dispatchEvent(new Event("change"));
      document.getElementById(category + "-btn")!.style.visibility = "hidden";
    }
  }
};

const activateTooltip = (event) => {
  let targetElement = event.currentTarget;
  let tooltipText = targetElement.querySelector(".tooltiptext");
  targetElement.classList.add("active");
  if (tooltipText) {
    tooltipText.style.visibility = "visible";
    tooltipText.style.opacity = "1";
  }
  positionTooltip(event);
};

const deactivateTooltip = (event) => {
  let targetElement = event.currentTarget;
  let tooltipText = targetElement.querySelector(".tooltiptext");
  targetElement.classList.remove("active");
  if (tooltipText) {
    tooltipText.style.visibility = "hidden";
    tooltipText.style.opacity = "0";
  }
};

const getSkillLevelName = (value: string, category: string) => {
  const sfiaLevelNames: { [key: string]: string } = {
    "1": "Future need skills",
    "2": "Valuable skills",
    "3": "Important skills",
    "4": "Most Important skills",
  };

  const softLevelNames: { [key: string]: string } = {
    "1": "Valuable skills",
    "2": "Important skills",
    "3": "Very Important skills",
  };

  if (category === "SFIA") {
    return t(sfiaLevelNames[value]) || value;
  } else {
    // Assume the category is "soft" if it's not "SFIA"
    return t(softLevelNames[value]) || value;
  }
};

const checkSelection = (n: number, event: MouseEvent) => {
  if (!props.counter) {
    console.error("counter is undefined");
    return;
  }

  const limit = category.value === "soft" ? 1 : 5;
  const count = props.counter.get(category.value, n.toString());

  if (count === undefined) {
    console.error(`count is undefined for category: ${category.value}, n: ${n}`);
    return;
  }

  if (count >= limit) {
    event.preventDefault();

    // Get the skill level name based on the category and the selected level n
    const skillLevelName = getSkillLevelName(n.toString(), category.value);

    const categoryTranslation = t(category.value);

    Swal.fire({
      text: t("selection_limit", [limit, categoryTranslation, skillLevelName]),
      confirmButtonText: t("got_it"),
      background: "#00186e",
      iconColor: "#FFE500",
      color: "#ffffff",
      confirmButtonColor: "#fff",
      customClass: {
        text: "white-text",
        content: "white-text",
        confirmButton: "my-confirm-button-class",
      } as any,
    });
  }
};
</script>

<template>
  <tr :id="data.id" :data-skill="data.id" @mousedown="activate" @mouseup="deactivate" @mouseleave="deactivate">
    <td class="skill-container">
      <div class="skill-name" :title="data.title">{{ data.title }}</div>
      <div
        class="tooltip-icon"
        @mouseover="activateTooltip($event)"
        @mouseout="deactivateTooltip($event)"
        @focusin="activateTooltip($event)"
        @focusout="deactivateTooltip($event)"
        @keydown.enter.space="activateTooltip($event)"
        @keyup.enter.space="deactivateTooltip($event)"
      >
        <i class="fa fa-question-circle" tabindex="0"></i>
        <div class="tooltiptext" ref="tooltipRef">{{ data.gen_description }}</div>
      </div>
    </td>
    <td v-for="n in inputCount" :key="n">
      <input
        :id="data.id + '-' + n"
        :checked="n === prev"
        :name="data.id"
        :value="n"
        type="radio"
        @click="checkSelection(n, $event)"
        @change="
          $emit(
            'store',
            data,
            n,
            category,
            $event.target.closest('section').querySelector('h2').textContent,
            $event.target.checked
          )
        "
      />
    </td>
    <td>
      <button :id="data.id + '-btn'" :style="prev ? 'visibility:visible' : 'visibility:hidden'" @click="clear(data.id)">
        Clear selection
      </button>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
$title-width: 300px;
td {
  padding: 0.4rem 0;
  min-width: 200px;

  &:first-of-type {
    width: $title-width;
  }

  &:not(:first-of-type) {
    width: calc((100% - #{$title-width}) / (#{inputCount} + 1)); // Adjust the calculation here
  }
}

p {
  visibility: hidden;
  position: absolute;
  padding: 2% 3%;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px 0 3px 3px;
  box-shadow: 2px 2px 4px #181818;
  top: 6px;
  left: -300px;
  width: 270px;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 100;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -20px;
    width: 0;
    height: 0;
    display: inline-block;
    border: 10px solid transparent;
    border-left-color: rgba(0, 0, 0, 0.9);
  }
}

td:hover {
  cursor: default;

  & + p {
    visibility: visible;
  }
}

input[type="radio"] {
  appearance: none;
  background-color: transparent;
  margin: auto;
  font: inherit;
  color: currentColor;
  width: 24px;
  height: 24px;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  display: grid;
  place-content: center;
  position: relative; /* new */

  &::before,
  &::after {
    /* new */
    content: "";
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    width: 12px;
    height: 12px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--heading1-color);
  }

  &::after {
    /* new */
    content: "";
    width: 100%;
    height: 100%;
    background: currentColor;
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
  }

  &:checked {
    &::before {
      transform: translate(-50%, -50%) scale(1);
    }

    &::after {
      /* new */
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
  }

  &:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }

  &:disabled {
    opacity: 0.2;
  }
}

button {
  height: 43px;
  cursor: pointer;
  border: 0;
  font-size: 14px;
  letter-spacing: 1.5px;
  background: var(--clear-selection);
  color: var(--start-button-text-color);
  padding: 10% 15%;
  z-index: 100;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  position: absolute;
  left: -25px;
  top: 50%;
  transform: translateY(-50%);
  font-family: Montserrat, sans-serif;
  border-radius: 8px;
}
button:hover {
  background: var(--clear-hover);
  box-shadow: 1px 1px 2px var(--clear-hover);
  color: var(--language-selector-color);
  transform: translateY(-50%) scale(1.1);
}
.skill-container {
  display: grid;
  grid-template-columns: auto min-content;
  grid-auto-flow: column;
  align-items: center;
  overflow: visible;
}

.skill-name {
  max-width: 350px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltip-icon {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding-left: 20px;
  color: var(--heading1-color);
}

td {
  padding: 0.6rem;
  min-width: 20px;
  background-color: transparent;
  margin-top: 5px;
}

.tooltip-icon .tooltiptext {
  visibility: hidden;
  width: 250px;
  background-color: var(--tooltip-bg);
  color: var(--start-button-text-color);
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 9999;
  left: 50%;
  transform: translateX(-47%); // Center the tooltip
  opacity: 0;
  transition: opacity 0.3s;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%); // Center the arrow relative to the tooltip
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
}

.tooltip-icon .tooltiptext.above {
  bottom: 150%;
  &::after {
    top: 100%;
    border-color: #555 transparent transparent transparent;
  }
}

.tooltip-icon .tooltiptext.below {
  top: 150%;
  &::after {
    bottom: 100%;
    border-color: transparent transparent #555 transparent;
  }
}

.tooltip-icon:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

th:first-child {
  width: $title-width;
}

td:last-child {
  position: relative;
  padding-right: 2rem;
}
</style>
