<template>
  <div class="SkillSidebar">
    <div class="scrollableContent">
      <!-- SFIA Skills Section -->
      <div class="section-header" @click="showSFIA = !showSFIA">
        <h2>{{ $t("skills2") }}</h2>
        <span v-if="showSFIA">&#9650;</span>
        <span v-else>&#9660;</span>
      </div>
      <div v-if="showSFIA">
        <div v-if="showCategories && categories.length > 1" class="navbar">
          <a
            v-for="(category, index) in categories"
            :key="category"
            :class="{ active: currentSection === index }"
            href="javascript:void(0)"
            @click="scroll(index.toString())"
            >{{ $t(category) }}</a
          >
        </div>
        <div class="progressbar">
          <div v-for="n in 4" :key="n">
            <h4>{{ $t(sfiaSkillLevels[n - 1]) }}</h4>
            <div class="linear-progress">
              <div v-for="bar in 5" :key="bar" class="bar">
                <div
                  :class="{'progress': ((counter.get('SFIA', n.toString()) as number) || 0) >= bar, 'maxed': ((counter.get('SFIA', n.toString()) as number) || 0) >= 5}"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Soft Skills Section -->
      <div class="section-header" @click="showSoft = !showSoft">
        <h2>{{ $t("skills3") }}</h2>
        <span v-if="showSoft">&#9650;</span>
        <span v-else>&#9660;</span>
      </div>
      <div v-if="showSoft">
        <div class="progressbar">
          <div v-for="n in 3" :key="n">
            <h4>{{ $t(softSkillLevels[n - 1]) }}</h4>
            <div class="linear-progress">
              <div v-for="bar in 1" :key="bar" class="bar">
                <div
                  :class="{'progress': ((counter.get('soft', n.toString()) as number) || 0) >= bar, 'maxed': ((counter.get('soft', n.toString()) as number) || 0) >= 1}"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { selectionCounter } from "@/stores/counter";

const offset = ref(0);
const counter = selectionCounter();
const props = defineProps<{ categories: string[]; showCategories: boolean }>();
const sfiaSkillLevels = ["futureNeed", "valuable2", "important2", "mostImportant"];
const softSkillLevels = ["valuable2", "important2", "veryImportant"];

const showSFIA = ref(true); // initial value true, SFIA Skills section will be visible at start
const showSoft = ref(true); // initial value true, Soft Skills section will be visible at start

const currentSection = ref<number | null>(null);

onMounted(() => {
  // create a new IntersectionObserver instance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // we only care about entries that are intersecting
      if (entry.isIntersecting) {
        // we use parseInt because the id is a string representation of a number
        currentSection.value = parseInt(entry.target.id);
      }
    });
  });

  // Calculate offset - replace 'instructions' with the id of your Instructions section
  const instructions = document.getElementById("instructions");
  offset.value = instructions ? instructions.offsetHeight : 0;

  // observe each category
  props.categories.forEach((category, index) => {
    const element = document.getElementById(index.toString());
    if (element) observer.observe(element);
  });

  // stop observing when component is unmounted
  onUnmounted(() => {
    observer.disconnect();
  });
});

const scroll = (index: string) => {
  const element = document.getElementById(index);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset.value;
    window.scrollTo({ top, behavior: "smooth" });
  }
};
</script>

<style scoped>
.SkillSidebar {
  position: fixed;
  margin-top: 65px;
  top: 65px;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 50px);
  background-color: #00186e;
  padding: 20px;
  padding-bottom: 50px;
  border-radius: 15px;
}

.SkillSidebar::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  border-radius: 15px;
  z-index: 2;
}

.scrollableContent {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-bottom: 1px;
  padding-right: 20px;
}
/* For Chrome, Safari and Opera */
.scrollableContent::-webkit-scrollbar {
  width: 10px;
  right: 0;
}

.scrollableContent::-webkit-scrollbar-track {
  background-color: #fff;
}

.scrollableContent::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 20px;
  border: 2px solid #fff;
}

.scrollableContent::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* For Firefox */
.scrollableContent {
  scrollbar-width: thin;
  scrollbar-color: #888 #fff;
}

@media (max-width: 1300px) {
  .SkillSidebar {
    position: static;
    max-height: unset;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .SkillSidebar {
    width: 480px;
    max-height: calc(90vh - 100px);
    background-color: #00186e;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #00186e;
  margin-bottom: 5px;
  margin-top: 15px;
}

.section-header h2 {
  margin: 0;
  color: #fff;
  font-size: 1.1em;
  font-weight: 600;
  font-family: Montserrat, sans-serif;
  padding: 10px;
}

.section-header span {
  font-size: 0.7em;
  color: #fff;
}

.navbar a {
  display: block;
  text-decoration: none;
  margin-bottom: 5px;
  color: #fff;
  padding: 5px 8px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-family: Montserrat, sans-serif;
  font-size: 18px;
}

.navbar a.active {
  background-color: #47b2ff;
  color: #00186e;
}

.navbar a:hover {
  color: #00186e;
  background-color: #47b2ff;
}

.linear-progress {
  display: flex;
  justify-content: space-between;
  height: 11px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #00186e;
  gap: 5px;
}

.bar {
  flex: 1;
  margin: 0 1px;
  background-color: #c7d3eb;
  border-radius: 5px;
  width: 20%;
}

.progress {
  height: 100%;
  width: 100%;
  background-color: #47b2ff;
  border-radius: 5px;
}

@keyframes flash {
  0% {
    background-color: #47b2ff;
  }
  50% {
    background-color: #0066cc;
  }
  100% {
    background-color: #47b2ff;
  }
}

.progress.maxed {
  animation: flash 0.5s ease-in-out;
}

h4 {
  color: #fff;
  font-family: Montserrat, sans-serif;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
}
</style>
