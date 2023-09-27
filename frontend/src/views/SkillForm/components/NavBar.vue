<template>
  <div class="navbar">
    <div class="logo-container" @click="handleHomeClick">
      <img src="/skillcollector_logo.png" alt="logo" class="logo" />
      <h1>SKILL COLLECTOR</h1>
    </div>
    <div class="links">
      <div @click="handleHomeClick">{{ $t("home") }}</div>
      <div @click="handleAboutClick">{{ $t("about_us") }}</div>

      <LanguageSelector />
    </div>
    <div class="utils">
      <div
        class="theme-toggle"
        :class="{ dark: isDark }"
        @click="toggleTheme"
        tabindex="0"
        @keydown.enter="toggleTheme"
      >
        <div class="toggle-ball" :class="{ active: isDark }">
          <font-awesome-icon
            :icon="isDark ? moonIcon : sunIcon"
            v-bind:class="{ 'icon-dark': isDark, 'icon-light': !isDark }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LanguageSelector from "../../../LanguageSelector.vue";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const isDark = ref(false);
const route = useRoute();
const router = useRouter();

const toggleTheme = () => {
  document.body.classList.toggle("dark");
  isDark.value = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark.value ? "dark" : "light"); // Store the theme state
};

const sunIcon = faSun;
const moonIcon = faMoon;

// Add scrollTo function
const scrollTo = (element) => {
  document.querySelector(element).scrollIntoView({ behavior: "smooth" });
};

const handleHomeClick = () => {
  if (route.path === "/") {
    scrollTo("#top"); // Ensure there's an element with id 'top' on your homepage
  } else {
    router.push({ path: "/", hash: "#top" });
  }
};

const handleAboutClick = () => {
  if (route.path === "/") {
    scrollTo("#about-us");
  } else {
    router.push({ path: "/", hash: "#about-us" });
  }
};

const setTheme = () => {
  const theme = localStorage.getItem("theme");
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
.navbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 0.6rem 2.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background-color: var(--navbar-background-color);
  height: 75px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 2.5rem;
  cursor: pointer;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
  justify-content: space-around;
}

.utils {
  display: flex;
  justify-content: flex-end;
  margin-right: 2.5rem;
}

.logo-container img {
  height: 40px;
  margin-right: 1rem;
}

.logo-container h1 {
  color: var(--navbar-text-color);
  font-size: 1.2rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.8px;
}

.links a,
.links div {
  margin: 0 0.5rem;
  color: var(--navbar-text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px;
  cursor: pointer;
}

.links a:hover,
.links div:hover {
  color: var(--navbar-text-color);
  background-color: var(--language-hover-color);
}

.icon-dark {
  color: var(--navbar-text-color);
}

.icon-light {
  color: var(--navbar-text-color);
}
</style>
