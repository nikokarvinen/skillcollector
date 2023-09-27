<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { selectionsSummary } from "@/stores/selectionsSummary";
import { selectionCounter } from "@/stores/counter";
import { errorStore } from "@/stores/errors";
import router from "@/router";

const route = useRoute();
const errors = errorStore();
const inputError = computed(() => errors.get("send"));
const selections = selectionsSummary();
const counters = selectionCounter();
const { t } = useI18n();
const validationError = ref("");

// Define the emit function
const emit = defineEmits(["cancel"]);

const send = async () => {
  let sfiaCount = 0;
  let softCount = 0;

  for (let i = 1; i <= 4; i++) {
    const sfiaCountTemp = counters.get("SFIA", i.toString());
    if (typeof sfiaCountTemp === "number") {
      sfiaCount += sfiaCountTemp;
    }
  }

  for (let i = 1; i <= 3; i++) {
    const softCountTemp = counters.get("soft", i.toString());
    if (typeof softCountTemp === "number") {
      softCount += softCountTemp;
    }
  }

  if (sfiaCount < 20 && softCount < 3) {
    validationError.value = t("invalid_count_skills_both"); // error message if not enough skills selected in both categories
  } else if (sfiaCount < 20) {
    validationError.value = t("invalid_count_sfia_skills"); // error message if not enough SFIA skills selected
  } else if (softCount < 3) {
    validationError.value = t("invalid_count_soft_skills"); // error message if not enough soft skills selected
  } else {
    try {
      await router.push({ name: "success", params: { hash: route.params.hash } });
      // Emit the cancel event to close the skillsummary component
      emit("cancel");
    } catch (error) {
      console.error(error);
      errors.set("send", 500, (error as Error).message);
    }
  }
};
</script>

<template>
  <div>
    <header class="header">
      <img src="/skillcollector_logo.png" alt="logo" class="logo" />
      <h1>{{ t("checkSummary") }}</h1>
    </header>

    <section v-if="inputError === 200" :key="inputError">
      <p>{{ t("read_through_list") }}</p>

      <ul v-for="(cat, key, index) in selections.getter()" :key="index">
        <li>{{ t(key) }}</li>
        <li style="list-style-type: none">
          <ul>
            <li v-for="(value, skill) in cat" :key="skill">{{ skill }}: {{ t(value) }}</li>
          </ul>
        </li>
      </ul>

      <p :class="{ 'error-message': validationError }">{{ validationError }}</p>

      <span>
        <button
          class="left"
          @click="
            $emit('cancel');
            errors.set('send', 200);
          "
        >
          {{ t("close_button") }}
        </button>
        <button :disabled="inputError !== 200" class="right" @click="send">{{ t("send_button") }}</button>
      </span>
    </section>

    <section v-if="inputError === 401" class="error">
      <p>{{ t("hash_not_exist_error") }}</p>
    </section>
    <section v-if="inputError === 400" class="error">
      <p>{{ errors.getMessage("send") }}</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.error-message {
  color: red;
  animation: blinker 0.5s linear;
}

@keyframes blinker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--start-button-color);
    height: 100px;
    color: white;
    position: relative;
    width: 60vw;
    border-radius: 10px 10px 0 0;
    text-align: center;
  }

  .logo {
    position: absolute;
    left: 40px;
    height: 80px;
    padding: 5px;
  }

  h1 {
    font-family: Montserrat, sans-serif;
    color: var(--language-selector-color);
  }

  p {
    font-family: Montserrat, sans-serif;
    font-size: 1.3rem;
    color: var(--start-button-color);
    margin-top: 15px;
  }

  section {
    width: 60vw;
    height: 80vh;
    padding: 1% 2%;
    overflow-y: scroll;
    background: var(--language-selector-color);
    border: 6px #282828;
    padding-bottom: 40px;

    & > p {
      text-align: center;
    }

    &.error > p {
      color: orangered;
    }

    & > ul {
      margin-top: 1rem;
    }
  }

  ul {
    li {
      color: var(--start-button-color);
      font-family: Montserrat;
      font-weight: 500;
      font-size: 22px;
    }
  }

  ul ul {
    li {
      color: var(--start-button-color);
      font-family: Montserrat;
      font-size: 19px;
    }
  }

  span {
    width: 55vw;
    height: 2rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    button {
      width: 23%;
      height: 32px;
      line-height: 13px;
      background-color: blue;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 20px;
      margin: 0 10px;
      margin-top: 35px;
    }

    .left {
      background-color: var(--start-button-color);
      color: var(--language-selector-color);
      font-family: Montserrat, sans-serif;
      padding: 10px;
      text-align: center;
      margin-left: 23px;
      transition: transform 0.3s;
      font-size: 16px;
      font-weight: 500;
    }

    .right {
      background-color: #33b249;
      color: #00186e;
      font-family: Montserrat, sans-serif;
      padding: 10px;
      text-align: center;
      margin-right: 23px;
      font-size: 16px;
      font-weight: 500;
      transition: transform 0.3s;
    }

    button:hover {
      transform: scale(1.05);
    }
  }
}
</style>
