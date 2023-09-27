<script setup>
import { RouterView, useRoute } from "vue-router";
import { ScaleLoader } from "vue3-spinner";
import Navbar from "@/views/SkillForm/components/NavBar.vue";
import SpecialNavbar from "@/views/SkillForm/components/SpecialNavbar.vue";
import SoftskillsNavbar from "@/views/SkillForm/components/SoftskilsNavbar.vue";
import "./assets/theme-toggle.css";

window.doorbellOptions = {
  id: "13942",
  appKey: "vj1SxcDYbrBjLUN49JV6XoBwi1KW43ZFkc9wyFIrjY40xRFoIF0ecx13saebWabQ",
};
(function (w, d, t) {
  var hasLoaded = false;
  function l() {
    if (hasLoaded) {
      return;
    }
    hasLoaded = true;
    window.doorbellOptions.windowLoaded = true;
    var g = d.createElement(t);
    g.id = "doorbellScript";
    g.type = "text/javascript";
    g.async = true;
    g.src = "https://embed.doorbell.io/button/" + window.doorbellOptions["id"] + "?t=" + new Date().getTime();
    (d.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0]).appendChild(g);
  }
  if (w.attachEvent) {
    w.attachEvent("onload", l);
  } else if (w.addEventListener) {
    w.addEventListener("load", l, false);
  } else {
    l();
  }
  if (d.readyState == "complete") {
    l();
  }
})(window, document, "script");

const route = useRoute();
</script>

<template>
  <Navbar v-if="route.name === 'home' || route.name === 'intro'" />
  <SpecialNavbar v-else-if="route.name === 'form'" />
  <SoftskillsNavbar v-else />
  <div class="container">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback>
            <ScaleLoader />
          </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

img {
  width: 20%;
}

a {
  text-decoration: underline;
  position: fixed;
  visibility: visible !important;
  cursor: pointer;
  width: auto;
  border: 0;
  font-size: 14px;
  letter-spacing: 1.5px;
  padding: 3px 6px;
  margin: 10px;
  z-index: 100;
  bottom: 0;
  left: 5%;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  transition: transform 1s;
}
</style>
