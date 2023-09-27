<script lang="ts" setup>
import Sidebar from "./components/SkillSidebar.vue";
import SkillRow from "./components/SkillRow.vue";
import { selectionCounter } from "@/stores/counter";
import { selectionsSummary } from "@/stores/selectionsSummary";
import { getSkills } from "./scripts/fetch";
import { onMounted, ref, computed } from "vue";
import { reactive } from "vue";

const inputs = reactive<{ [key: string]: number }>({});
const counter = selectionCounter();
console.log(counter);
const selections = selectionsSummary();
const progressValue = ref(0);

interface SkillsDataObject {
  [key: string]: any;
}

const allSkillsData: SkillsDataObject | string = await getSkills();

if (typeof allSkillsData === "string") {
  throw new Error("Expected allSkillsData to be an object, but received a string");
}

// Exclude Soft skills category
const SkillsData: SkillsDataObject = Object.keys(allSkillsData)
  .filter((category) => category !== "Soft skills")
  .reduce((obj: SkillsDataObject, category: string) => {
    obj[category] = allSkillsData[category];
    return obj;
  }, {});

const filteredSkillsData = computed(() => {
  return Object.keys(SkillsData)
    .filter((category) => category !== "Soft skills")
    .reduce((obj: SkillsDataObject, category: string) => {
      obj[category] = SkillsData[category];
      return obj;
    }, {});
});

const adjectivesSfia: Array<String> = ["futureNeed", "valuable2", "important2", "mostImportant"];

interface Data {
  id: string;
  [key: string]: any;
}

// When a radio button is clicked, this is triggered at the end of the $emit
// Takes in the skill, value and category, then use counter and inputs to store them appropriately
const handleInput = (data: Data, value: number, counterCategory: string, selectCategory: string, status: boolean) => {
  document.getElementById(data["id"] + "-btn")!.style.visibility = "visible";
  if (!status) {
    counter.decrement(counterCategory, value.toString(), data["id"]);
    selections.remove(selectCategory, data["title"]);
    delete inputs[data["id"]];
  } else {
    counter.increment(counterCategory, value.toString(), data["id"]);
    selections.select(selectCategory, data["title"], adjectivesSfia[value - 1] as string);
    inputs[data["id"]] = value;
  }

  const totalInputValue = Object.keys(inputs)
    .map((key) => inputs[key])
    .reduce((sum: number, input: any) => sum + input, 0);

  const progressBarValue = totalInputValue / (Object.keys(inputs).length * 5);
  counter.saveProgressValue(progressBarValue);

  const expiry = new Date().getTime() + 15 * 60 * 1000; //15 minutes
  localStorage.setItem("expiry", expiry.toString());

  localStorage.setItem("inputs", JSON.stringify(inputs));
};

onMounted(() => {
  const expiry = localStorage.getItem("expiry");
  const now = new Date().getTime();

  if (expiry && now >= Number(expiry)) {
    localStorage.clear();
    selections.reset();
    counter.reset();
    progressValue.value = 0;
  } else {
    const loadedProgressValue = counter.loadProgressValue();
    progressValue.value = loadedProgressValue !== undefined ? oadedProgressValue : 0;

    if (localStorage.getItem("inputs")) {
      Object.assign(inputs, JSON.parse(localStorage.getItem("inputs")!));
    }
  }
});
</script>

<template>
  <Sidebar :categories="Object.keys(SkillsData)" :showCategories="true" tabindex="0" />
  <div class="container">
    <main>
      <section id="instructions">
        <h2>{{ $t("instructions.title") }}</h2>
        <p>{{ $t("instructions.description") }}</p>
        <div class="skills-list">
          <div class="skill-item">5 {{ $t("futureNeed") }} {{ $t("skills") }}</div>
          <div class="skill-item">5 {{ $t("valuable2") }} {{ $t("skills") }}</div>
          <div class="skill-item">5 {{ $t("important2") }} {{ $t("skills") }}</div>
          <div class="skill-item">5 {{ $t("mostImportant") }} {{ $t("skills") }}</div>
        </div>
      </section>
      <section
        v-for="(skills, category, index) in filteredSkillsData"
        :id="index.toString()"
        :key="category"
        tabindex="0"
      >
        <h2>{{ $t(category.toString()) }}</h2>
        <table>
          <thead>
            <tr>
              <th>{{ $t("skill") }}</th>
              <th v-for="adj in adjectivesSfia" :key="adj.toString()">
                {{ $t(adj.toString()) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <SkillRow
              v-for="(data, index) in skills"
              :key="index"
              :data="data"
              :input-count="adjectivesSfia.length"
              :prev="inputs[data.id]"
              :counter="counter"
              @store="handleInput"
              tabindex="0"
            />
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
$title-width: 315px;

th:first-child,
td:first-child {
  width: #{$title-width + 10px};
}
.container {
  padding-top: 70px;
  left: 32%;
  width: 70%;
  margin-left: 10px;
  overflow-x: "hidden";
}

main {
  width: 75%;
  display: grid;

  section {
    h3 {
      text-align: center;
    }

    h2 {
      text-align: center;
      padding: 0em 0 1em 0;
    }

    table {
      margin: 0 auto;
      border-collapse: collapse;
      width: 100%;
      max-width: 950px;

      th {
        min-width: 20px;
      }
    }
  }

  section + section {
    margin-top: 5rem;
  }

  button {
    width: 100%;
    height: 2rem;
    margin-top: 1rem;
    background-color: var(--jamk-blue);
    color: white;
    border: black;
    border-radius: 1px;
    box-shadow: -1px 1px 10px #080808;
    cursor: pointer;
    transition: transform 1s;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}

td {
  padding-right: 50px;
  padding-left: 10px;
}

th {
  margin-left: 0;
  min-width: 20px;
  color: var(--heading1-color);
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
  padding-right: 20px;
  padding-left: 10px;

  &:first-child {
    width: $title-width;
  }

  &:not(:first-child) {
    width: calc((100% - #{$title-width}) / (#{inputCount} + 1));
  }
}

h2 {
  color: var(--heading1-color);
  font-family: Montserrat;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 40px;
}

#instructions {
  h2 {
    text-align: center;
    padding-bottom: 0.5em;
    padding-top: 2em;
    font-family: Montserrat, sans-serif;
  }

  .skills-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 15px;
    font-family: Montserrat, sans-serif;
  }

  p {
    font-family: Montserrat, sans-serif;
  }

  .skill-item {
    font-size: 1.2rem;
    flex: 1 0 20%;
    text-align: center;
  }
}
</style>
