<template>
  <Sidebar :categories="Object.keys(SkillsData)" :showCategories="false" tabindex="0" />
  <div class="container">
    <main>
      <section id="instructions">
        <h2>{{ $t("instructions.title") }}</h2>
        <p>{{ $t("instructions.description2") }}</p>
        <div class="skills-list">
          <div class="skill-item">1 {{ $t("valuable2") }} {{ $t("skill") }}</div>
          <div class="skill-item">1 {{ $t("important2") }} {{ $t("skill") }}</div>
          <div class="skill-item">1 {{ $t("veryImportant") }} {{ $t("skill") }}</div>
        </div>
      </section>
      <section v-for="(skills, index) in filteredSkillsData" :id="`section-${index}`" :key="`section-${index}`">
        <h2>{{ $t("Soft skills") }}</h2>
        <table>
          <thead>
            <tr>
              <th>{{ $t("skill") }}</th>
              <th v-for="adj in adjectivesSoft" :key="adj.toLowerCase()">
                {{ $t(adj) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <SkillRow
              v-for="(data, index) in skills"
              :key="index"
              :data="data"
              :input-count="adjectivesSoft.length"
              :prev="inputs[data.id]"
              :counter="counter"
              @store="(...args) => handleInput(...args, adjectivesSoft)"
            />
          </tbody>
        </table>
      </section>
    </main>
  </div>
  <Summary v-if="showSummary" @cancel="showSummary = false" />
</template>

<script lang="ts" setup>
import Sidebar from "./SkillSidebar.vue";
import SkillRow from "./SkillRow.vue";
import Summary from "@/views/SkillForm/components/SkillSummary.vue";
import { selectionCounter } from "@/stores/counter";
import { selectionsSummary } from "@/stores/selectionsSummary";
import { getSkills } from "../scripts/fetch";
import { onMounted, ref, computed } from "vue";
const counter = selectionCounter();
const selections = selectionsSummary();
import type { Skill } from "../scripts/fetch";

const showSummary = ref(false);
const SkillsData = ref({});

const adjectivesSoft: string[] = ["valuable2", "important2", "veryImportant"];

if (!localStorage.getItem("inputs")) {
  localStorage.setItem("inputs", JSON.stringify({}));
}
const inputs: { [key: string]: number } = JSON.parse(localStorage.getItem("inputs")!);

// Create a computed property that filters only the 'Soft skills' from SkillsData
const filteredSkillsData = computed(() => {
  return { "Soft skills": SkillsData.value["Soft skills"] };
});

const handleInput = (
  data: { [key: string]: any },
  value: number,
  counterCategory: string,
  selectCategory: string,
  status: boolean,
  adjectives: string[]
) => {
  document.getElementById(data["id"] + "-btn")!.style.visibility = "visible";
  if (!status) {
    counter.decrement(counterCategory, value.toString(), data["id"]);
    selections.remove(selectCategory, data["title"]);
    delete inputs[data["id"]];
  } else {
    counter.increment(counterCategory, value.toString(), data["id"]);
    selections.select(selectCategory, data["title"], adjectives[value - 1] as string);
    inputs[data["id"]] = value;
  }

  localStorage.setItem("inputs", JSON.stringify(inputs));
};

onMounted(async () => {
  try {
    const allSkillsData: { [category: string]: Skill[] } | string = await getSkills();

    // Assign Soft skills data to SkillsData ref
    if (typeof allSkillsData !== "string") {
      SkillsData.value = { "Soft skills": allSkillsData["Soft skills"] };
    }

    if (localStorage.getItem("inputs")) {
      Object.assign(inputs, JSON.parse(localStorage.getItem("inputs")!));
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
});
</script>

<style lang="scss" scoped>
$title-width: 200px;

th:first-child,
td:first-child {
  width: #{$title-width + 10px};
}
.container {
  padding-top: 70px;
  left: 35%;
  width: 80%;
  margin-left: 10px;
}

main {
  width: 60%;
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
      max-width: 800px;

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
  padding-right: 30px;
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
