<template>
  <div class="container">
    <main>
      <h2>{{ $t("instructions2") }}</h2>
      <p>{{ $t("questionnaire_info") }}</p>

      <ul>
        <li>{{ $t("very_important") }}</li>
        <li>{{ $t("important") }}</li>
        <li>{{ $t("valuable") }}</li>
        <li>{{ $t("future_useful") }}</li>
      </ul>

      <p>{{ $t("soft_skills") }}</p>

      <ul>
        <li>{{ $t("soft_valuable") }}</li>
        <li>{{ $t("soft_important") }}</li>
        <li>{{ $t("soft_very_important") }}</li>
      </ul>

      <p>{{ $t("navigation_info") }}</p>

      <div class="buttons">
        <form @submit.prevent="rerouteToHome">
          <button class="back-btn" type="submit"><i class="fa fa-caret-left"></i> Back</button>
        </form>
        <form @submit.prevent="rerouteToForm">
          <button class="continue-btn" type="submit">Continue <i class="fa fa-caret-right"></i></button>
        </form>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  setup() {
    const rerouteToForm = () => {
      const hashValue = router.currentRoute.value.params.hash;
      router.push({ name: "form", params: { hash: hashValue } });
    };

    const rerouteToHome = () => {
      router.push({ path: "/" });
    };

    return {
      rerouteToForm,
      rerouteToHome,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  color: var(--start-button-color);
  font-family: Montserrat;
  font-size: 42px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 20px;
}

p,
ul,
a {
  color: var(--start-button-color);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left !important;
  margin-top: 10px;
}

main {
  width: 70%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  grid-template-rows: auto;
  grid-row-gap: 1.2rem;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 25px;
}

button {
  width: 200px;
  height: 2rem;
  color: white;
  border: none;
  box-shadow: 3px 3px 8px #181818;
  transition: transform 0.3s;
}

button:hover {
  cursor: pointer;
  transform: scale(1.05);
}

form {
  width: auto;
  display: inline-flex;
  justify-content: center;
  margin-left: 15px;
  margin-right: 15px;
}

.continue-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #33b249;
  border-radius: 50px;
}

.continue-btn i {
  padding-left: 10px;
}

.back-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00186e;
  border-radius: 50px;
}

.back-btn i {
  padding-right: 10px;
}
</style>
