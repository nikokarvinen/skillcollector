<template>
  <div class="navbar">
    <button class="round-button back-btn" @click="$router.push({ name: 'intro' })">
      <i class="fa fa-caret-left"></i> {{ $t("back") }}
    </button>
    <div class="center-container">
      <router-link to="/" class="logo-link">
        <img src="/skillcollector_logo.png" alt="logo" class="logo" />
        <h1>SKILL COLLECTOR</h1>
      </router-link>
      <div class="settings-container">
        <!-- Wrapper div -->
        <LanguageSelector :specialStyle="isSpecialNavbar" />
        <div class="theme-toggle" @click="toggleTheme">
          <div class="toggle-ball" :class="{ active: isDark }">
            <font-awesome-icon
              :icon="isDark ? moonIcon : sunIcon"
              v-bind:class="{ 'icon-dark': isDark, 'icon-light': !isDark }"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="round-button continue-btn" @click="continueToSoftSkillsView">
      {{ $t("continue") }} <i class="fa fa-caret-right"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import LanguageSelector from "../../../LanguageSelector.vue";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const isDark = ref(false);
const router = useRouter();
const isSpecialNavbar = ref(true);

const toggleTheme = () => {
  document.body.classList.toggle("dark");
  isDark.value = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark.value ? "dark" : "light"); // Store the theme state
};

const sunIcon = faSun;
const moonIcon = faMoon;

const continueToSoftSkillsView = () => {
  const hashValue = router.currentRoute.value.params.hash;
  router.push({ name: "softskills", params: { hash: hashValue } });
};

const setTheme = () => {
  const theme = localStorage.getItem("theme"); // Retrieve the stored theme state
  if (theme === "dark") {
    document.body.classList.add("dark");
    isDark.value = true;
  } else {
    document.body.classList.remove("dark");
    isDark.value = false;
  }
};

onMounted(setTheme);
</script>

<style scoped>
.theme-toggle {
  margin-right: 5rem;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 80px;
  background-color: #00186e;
  padding: 0 5rem;
  background-color: transparent 80%;
}

.center-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-grow: 1;
}

.settings-container {
  display: flex;
  align-items: center;
  gap: 5rem;
}

.logo-link {
  display: flex;
  align-items: center;
  margin-left: 8rem;
}

.logo-link img {
  height: 40px;
}

.logo-link h1 {
  color: #fff;
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

.round-button {
  font-size: 1.2rem;
  min-width: 150px;
  height: 2.5rem;
  border-radius: 30px;
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 2.5rem;
  cursor: pointer;
}

.round-button:hover {
  transform: scale(1.1);
}

.icon-dark {
  color: #ffffff;
}

.icon-light {
  color: #fff;
}

body:not(.dark) .theme-toggle .toggle-ball {
  background: #fff;
}

.back-btn,
.continue-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 500;
}

.back-btn i,
.continue-btn i {
  margin: 0 0.5rem;
}

.back-btn {
  background: #00186e;
  box-shadow: 0px 4px 20px 0px rgba(55, 66, 250, 0.25);
}

.continue-btn {
  background-color: #008000;
}
</style>
