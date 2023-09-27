import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import "sweetalert2/src/sweetalert2.scss";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import vue3Spinner from "vue3-spinner";
import App from "./App.vue";
import router from "./router";

// import the main.scss file
import "./assets/main.scss";

// import translations
import messagesEN from "./translations/en.json";
import messagesFI from "./translations/fi.json";
import messagesSWE from "./translations/swe.json";

const pinia = createPinia();
const app = createApp(App);

// Register FontAwesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);
app.use(vue3Spinner);
app.use(router);

// Setup i18n
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en", // default locale
  fallbackLocale: "en", // fallback locale
  messages: {
    en: messagesEN,
    fi: messagesFI,
    swe: messagesSWE,
  },
});

export async function changeLanguage(lang: string): Promise<void> {
  // changing to lowercase
  const loadedLanguages = i18n.global.availableLocales;
  if (!loadedLanguages.includes(lang.toLowerCase())) {
    console.error(`No messages found for locale: ${lang}`);
    throw new Error(`No messages found for locale: ${lang}`);
  }
  i18n.global.locale.value = lang.toLowerCase();
}

app.use(i18n);

app.mount("#app");
