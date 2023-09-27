<template>
  <div id="top" class="home-container home">
    <h1>{{ t("skillcollector_title") }}</h1>
    <h2>{{ $t("welcome_message") }}</h2>

    <form class="input-container" @submit.prevent="reroute">
      <div class="input-wrapper">
        <div class="search-wrapper">
          <i class="fa fa-search search-icon"></i>
        </div>
        <input
          id="hash-lookup"
          :class="{ error: error }"
          maxlength="64"
          name="hash-lookup"
          :placeholder="$t('hash_placeholder')"
          type="text"
          @keydown="errorStore().set('hash', 200)"
        />
        <div
          class="tooltip-wrapper"
          @mouseover="activateTooltip"
          @mouseout="deactivateTooltip"
          @focusin="activateTooltip"
          @focusout="deactivateTooltip"
          tabindex="0"
        >
          <i class="fa fa-question-circle"></i>
          <p class="tooltip">{{ $t("hash_info") }}</p>
        </div>
      </div>

      <button :disabled="error" type="submit" class="start-button">
        {{ $t("start") }} <i class="fa fa-angle-double-right arrow-icon"></i>
      </button>
    </form>
    <p v-if="error">{{ $t("hash_not_found") }}</p>
  </div>

  <div id="about-us" class="about-us-container">
    <h1 class="about-us-h1">{{ t("about_us_title") }}</h1>
    <h3 class="about-us-h3">{{ t("about_us_body") }}</h3>

    <div class="slider">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide"
        :class="{ active: index === activeIndex }"
        v-show="index === activeIndex"
        style="position: relative"
      >
        <div class="slide-content">
          <img :src="image.src" />
          <i class="fa fa-angle-left slider-arrow slider-arrow-left" @click="previousSlide"></i>
          <div class="slider-text">
            <h2 class="slider-header">{{ image.teamName }}</h2>
            <p class="slider-paragraph" v-html="image.description"></p>
          </div>
          <i class="fa fa-angle-right slider-arrow slider-arrow-right" @click="nextSlide"></i>
          <div class="dots">
            <span
              v-for="(image, index) in images"
              :key="'dot-' + index"
              class="dot"
              :class="{ 'active-dot': activeIndex === index }"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-container" :style="`background-image: url(${footerBgImage}); width: 100vw;`">
    <img src="/skillcollector_logo2.png" alt="Skill Collector Logo" />

    <div class="footer-links">
      <a @click="showGDPR = true" class="gdpr-link">{{ t("display_gdpr") }}</a>
      <a @click="showTermsOfUse = true" class="terms-link">{{ t("terms_of_use") }}</a>
    </div>

    <div class="social-media-icons">
      <a href="https://www.linkedin.com/company/wimmalab/" target="_blank">
        <i class="fa fa-linkedin"></i>
      </a>
      <a href="https://www.facebook.com/wimmalab/" target="_blank">
        <i class="fa fa-facebook"></i>
      </a>
      <a href="https://www.instagram.com/wimmalab/" target="_blank">
        <i class="fa fa-instagram"></i>
      </a>
      <a href="https://twitter.com/wimmalab" target="_blank">
        <i class="fa fa-twitter"></i>
      </a>
      <a href="https://www.youtube.com/@wimmalab3271" target="_blank">
        <i class="fa fa-youtube"></i>
      </a>
    </div>
    <div class="policy-links">
      <a @click="showPrivacyPolicy = true" class="privacy-link">{{ t("privacy_policy") }}</a>
      <a @click="showCookiePolicy = true" class="cookie-link">{{ t("cookie_policy") }}</a>
    </div>
  </div>
  <GDPR v-if="showGDPR" @close="showGDPR = false" />
  <TermsOfUse v-if="showTermsOfUse" @close="showTermsOfUse = false" />
  <PrivacyPolicy v-if="showPrivacyPolicy" @close="showPrivacyPolicy = false" />
  <CookiePolicy v-if="showCookiePolicy" @close="showCookiePolicy = false" />
  <div class="copyright-section">&copy; 2023 - All Rights Reserved.</div>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue";
import { computed } from "vue";
import { useLanguageStore } from "@/languageStore";
import { errorStore } from "@/stores/errors";
import { changeLanguage } from "@/main";
import router from "@/router";
import { ref } from "vue";
import overflowTeamImage from "/overflow-team.png";
import iotitudeImage from "/Iotitude.png";
import mysticonsImage from "/mysticons.png";
import pengwinImage from "/pengwin.png";
import { useI18n } from "vue-i18n";
import GDPR from "../../Policies/GDPR.vue";
import TermsOfUse from "../../Policies/TermsOfUse.vue";
import PrivacyPolicy from "../../Policies/PrivacyPolicy.vue";
import CookiePolicy from "../../Policies/CookiePolicy.vue";

const { t } = useI18n();

const showGDPR = ref(false);
const showTermsOfUse = ref(false);
const showPrivacyPolicy = ref(false);
const showCookiePolicy = ref(false);

const isDarkMode = ref(false);
const footerBgImage = ref("");

watchEffect(() => {
  if (isDarkMode.value) {
    footerBgImage.value = "var(--footer-background-image, url('/footer-dark.svg'))";
  } else {
    footerBgImage.value = "var(--footer-background-image, url('/footer-light.svg'))";
  }
});

// Define the array of images with their sources
const images = computed(() => [
  {
    src: overflowTeamImage,
    teamName: t("overflow_team_name"),
    description: t("overflow_team_desc"),
  },
  {
    src: iotitudeImage,
    teamName: t("iotitude_team_name"),
    description: t("iotitude_team_desc"),
  },
  {
    src: mysticonsImage,
    teamName: t("mysticons_team_name"),
    description: t("mysticons_team_desc"),
  },
  {
    src: pengwinImage,
    teamName: t("pengwin_team_name"),
    description: t("pengwin_team_desc"),
  },
]);

const activeIndex = ref(0);

// Modify the function to change slide and dot at the same time
const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % images.value.length;
};

const previousSlide = () => {
  activeIndex.value = activeIndex.value === 0 ? images.value.length - 1 : activeIndex.value - 1;
};

// Get currentLanguage from language store
const { currentLanguage } = useLanguageStore();

const reroute = () => {
  let hash = document.getElementById("hash-lookup") as HTMLInputElement;
  router.push({ name: "intro", params: { hash: hash.value } });
};

const error = computed(() => errorStore().get("hash") >= 400);

// Watch for changes to currentLanguage and call changeLanguage when it changes
watchEffect(() => {
  changeLanguage(currentLanguage.value);
});

const activateTooltip = (event) => {
  let targetElement = event.currentTarget.querySelector(".tooltip");
  if (targetElement) {
    targetElement.style.visibility = "visible";
    targetElement.style.opacity = "1";
  }
};

const deactivateTooltip = (event) => {
  let targetElement = event.currentTarget.querySelector(".tooltip");
  if (targetElement) {
    targetElement.style.visibility = "hidden";
    targetElement.style.opacity = "0";
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 64px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 4.8px;
  color: var(--heading1-color);
}

h2 {
  text-align: center;
  font-size: 28px;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: var(--heading2-color);
  max-width: 800px;
  margin: 0 auto;
}

.dot {
  height: 18px;
  width: 18px;
  margin: 0 2px;
  background-color: #89cff0e0;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
  position: relative;
  animation: none !important;
  margin: 10px;
}

.active-dot {
  background-color: #47fff4;
}

.slider-header {
  color: #fff;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 900;
  line-height: 14px;
  text-transform: uppercase;
  margin-left: 0;
  margin-bottom: 35px;
  text-align: left;
}

.slider-paragraph {
  flex-direction: column;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px !important;
  margin-bottom: 180px;
  margin-left: 0;
  text-align: left;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

h3 {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  padding-top: 25px;
  font-weight: 600;
  font-size: 24px;
  color: var(--heading2-color);
}

.about-us-h1 {
  color: var(--start-button-color);
}

.about-us-h3 {
  color: var(--start-button-color);
}

.input-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 40%;
  max-width: 550px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  padding-right: 40px;

  i.fa-question-circle {
    font-size: 1.8rem;
    position: absolute;
    right: -50px;
    top: 34px;
    color: var(--heading1-color);
  }

  input {
    flex-grow: 1;
    border-radius: 5px;
    padding: 10px;
    height: 40px;
  }

  &:focus-within {
    border-color: #00186e;
    outline: 1px solid var(--input-border-focus);
  }
}
.search-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #00186e;
  background: #f2f2f2;
  height: 100%;
  flex-shrink: 0;
}

.search-icon {
  font-size: 22px;
  color: #00186e;
  padding-right: 10px;
  margin-left: 5;
}

input[type="text"] {
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  border-radius: 0;
  padding-left: 25px;

  &.error {
    animation: shake 0.5s ease-in-out;
    color: #ffffff;
  }

  &:focus {
    outline: none;
  }
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

#hash-lookup {
  color: var(--input-text-color);
  font-family: DM Sans;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 16px;
}

::placeholder {
  color: var(--start-button-color);
}

button {
  margin-top: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.8rem;
  background: var(--start-button-color);
  border: none;
  color: var(--start-button-text-color);
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  width: auto;
  transition: transform 0.3s ease;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;

  &:disabled {
    background-color: gray;
  }

  &:hover {
    transform: scale(1.05);
  }

  span {
    margin-right: 10px;
  }
}

.tooltip-wrapper {
  position: absolute;
  right: 10px;
  top: -30px;
}

.tooltip {
  font-size: 0.8em;
  color: var(--start-button-text-color);
  visibility: hidden;
  opacity: 0;
  position: absolute;
  padding: 10px;
  border-radius: 6px;
  right: 0px;
  bottom: 100%;
  transform: translateX(64%);
  width: 270px;
  background-color: var(--start-button-color);
  z-index: 100;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;
  transition: all 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: var(--start-button-color) transparent transparent transparent;
  }

  input:focus + .tooltip-wrapper & {
    visibility: visible;
    opacity: 1;
  }

  .fa-question-circle:hover + & {
    visibility: visible;
    opacity: 1;
  }
}

.home-container,
.about-us-container,
.footer-container {
  padding: 20px 0;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  height: calc(100vh - 70px);
  text-align: center;
}

.about-us-container {
  text-align: center;
  background: var(--start-button-text-color);
  padding-top: 7rem;
  padding-bottom: 7rem;

  .slider {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    height: 900px;
    justify-content: center;
    position: relative;
    max-width: 100%;
    margin: 0 auto;

    img {
      flex: 0 0 auto;
      height: 100%;
      object-fit: cover;
      scroll-snap-align: start;
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
  }
}

.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  margin: 0 auto;
  text-align: center;
}

.slide {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .slide-content {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 100%;
    padding: 0 50px;
  }

  .slide-content img {
    width: 100%;
    object-fit: cover;
  }

  .slider-arrow {
    color: #ffffff;
    font-size: 3em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  .slider-arrow-left {
    left: 7%;
  }

  .slider-arrow-right {
    right: 7%;
  }

  &.active img {
    opacity: 1;
  }

  .slider-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 2;
    opacity: 0;
    transition: opacity 0.5s;

    p {
      font-size: 1rem;
    }
  }

  &.active .slider-text {
    opacity: 1;
  }
}

.footer-container {
  position: relative;
  height: 600px;
  padding: 2rem;
  background-image: var(--footer-background-image);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 13rem;
  padding-left: 0;
  padding-right: 0;

  img {
    width: 175px;
    height: 175px;
    object-fit: cover;
    margin-left: 80px;
  }

  .social-media-icons {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    z-index: 1;
    margin-bottom: 15px;
    text-align: center;

    i {
      font-size: 30px;
      color: var(--heading1-color);
      margin: 30px;
    }

    i:hover {
      color: var(--footer-hover);
    }
  }
}

.footer-container a.gdpr-link,
.footer-container a.terms-link,
.footer-container a.privacy-link,
.footer-container a.cookie-link {
  color: var(--heading1-color);
  text-decoration: none;
  margin-bottom: 50px;
  display: flex;
  cursor: pointer;
  text-align: left;
  margin-left: 25%;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 600;
  line-height: 14px;
  text-transform: capitalize;
  width: fit-content;
}

.footer-container a:hover {
  color: var(--footer-hover);
}

.policy-links {
  position: absolute;
  right: 30%;
  bottom: 80px;
  white-space: nowrap;
}

.copyright-section {
  width: 100%;
  background-color: #00186e;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-family: Montserrat, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-variant: small-caps;
}

@media (max-width: 768px) {
  .slider-paragraph {
    font-size: 16px;
  }

  .slider-arrow {
    font-size: 2em;
  }

  .slider-arrow-left {
    left: 2%;
  }

  .slider-arrow-right {
    right: 2%;
  }
}
</style>
