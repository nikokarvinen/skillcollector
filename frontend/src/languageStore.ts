import { computed, ref } from "vue";

// reactive variable to hold the language
const language = ref("en");

export function useLanguageStore() {
  // function to change the language
  const setLanguage = (lang: string) => {
    language.value = lang.toLowerCase();
  };

  // function to get the frontend language code
  const getFrontendLanguage = () => {
    return language.value;
  };

  // computed property to return the current language
  const currentLanguage = computed(() => getFrontendLanguage());

  return {
    setLanguage,
    currentLanguage,
  };
}
