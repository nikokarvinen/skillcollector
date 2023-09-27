<template>
  <div class="main-container">
    <div class="logo-container">
      <img src="/skillcollector_logo.png" alt="logo" class="logo" />
      <h1>SKILL COLLECTOR</h1>
    </div>
    <div class="thankyou-content">
      <h1>{{ $t("thankYou") }}</h1>
      <div class="thankyou-text">
        <p>{{ $t("saveText") }}</p>
      </div>
      <button @click="router.push({ name: 'home' })">{{ $t("backHome") }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-container img {
  width: 80px;
  padding-bottom: 2rem;
}

.logo-container h1 {
  font-size: 2em;
  color: var(--start-button-color);
  padding-bottom: 2rem;
  font-family: Montserrat, sans-serif;
}
.thankyou-text {
  width: 65%;
  margin: auto;
  font-family: Montserrat, sans-serif;
}
.thankyou-content h1 {
  color: var(--start-button-color);
  padding-bottom: 1rem;
  font-family: Montserrat, sans-serif;
}

.thankyou-content p {
  font-size: 1.2em;
  margin-bottom: 20px;
  padding-bottom: 1rem;
  color: var(--start-button-color);
  font-family: Montserrat, sans-serif;
}

button {
  width: 180px;
  height: 40px;
  background-color: var(--start-button-color);
  border: none;
  border-radius: 25px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  transition: transform 0.3s;
  cursor: pointer;
  outline: none;
  color: var(--start-button-text-color);
  font-family: Montserrat, sans-serif;
}

button:hover {
  transform: scale(1.1);
}
</style>
