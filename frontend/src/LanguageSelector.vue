<template>
  <div class="dropdown" :class="{ 'special-navbar': specialStyle }">
    <button class="dropbtn">{{ currentLanguage.toUpperCase() }}<i class="fa fa-caret-down"></i></button>
    <div class="dropdown-content">
      <a v-for="lang in languages" :key="lang.code" @click.prevent="changeLanguage(lang.code)">
        {{ lang.code.toUpperCase() }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLanguageStore } from "@/languageStore";
import { i18n } from "@/main"; // import i18n from main.ts

const props = defineProps({
  specialStyle: Boolean,
});

const { setLanguage, currentLanguage } = useLanguageStore();

const languages = [{ code: "en" }, { code: "fi" }, { code: "swe" }];

const changeLanguage = (newLanguage) => {
  try {
    i18n.global.locale.value = newLanguage; // directly set the locale on our i18n instance
    setLanguage(newLanguage);
  } catch (err) {
    console.error(err);
  }
};
</script>

<style>
.special-navbar .dropbtn:hover {
  background-color: #0033cc !important;
}

.special-navbar .dropbtn {
  background-color: transparent;
  color: #fff;
}

.special-navbar .dropdown-content {
  left: 10px;
}

.dropbtn-container {
  display: inline-block;
}

.dropbtn-container:hover .dropbtn {
  background-color: red;
  color: var(--navbar-text-color);
}

.dropbtn-container:hover + .dropdown-content {
  display: block;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--start-button-text-color);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  left: 20px;
}

.dropdown-content a {
  color: var(--navbar-text-color);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-family: Montserrat;
  font-weight: 500;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.dropdown-content a:hover {
  background-color: var(--language-hover-color);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover {
  background-color: transparent !important;
}

i {
  margin-left: 13px;
}

.dropbtn {
  background-color: var(--navbar-background-text-color);
  color: var(--navbar-text-color);
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-family: Montserrat;
  font-weight: 500;
  text-transform: uppercase;
}

.dropbtn:hover {
  background-color: var(--language-hover-color) !important;
  color: var(--navbar-text-color);
}
</style>
