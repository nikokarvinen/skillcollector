<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="modal" @click="$emit('close')" tabindex="0">
    <div class="modal-content" @click.stop>
      <div tabindex="0" @keydown.esc="$emit('close')">
        <header class="header">
          <img src="/skillcollector_logo.png" alt="logo" class="logo" />
          <h1>{{ t("privacy_policy") }}</h1>
        </header>
        <section @click.stop>
          <p>{{ t("privacy_policy_content") }}</p>
        </section>
        <button class="close-btn" @click="$emit('close')">{{ t("close_button") }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;
}

h1,
h2 {
  color: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00186e;
  height: 100px;
  color: white;
  position: relative;
}

.header h1 {
  text-align: center;
}

.logo {
  position: absolute;
  left: 40px;
  height: 80px;
  padding: 5px;
}

.modal-content {
  background-color: #fff;
  margin: 5% auto;
  border: 1px solid #888;
  width: 80%;
  max-width: 1000px;
  color: #00186e;
  font-family: Montserrat, sans-serif;
  overflow-y: auto;
  max-height: 80vh;
  font-style: normal;
  font-weight: 500;
}

section {
  padding: 30px 50px 0 50px;
}

.close-btn {
  color: #fff;
  background-color: #00186e;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 30px;
  margin-left: 50px;
  margin-bottom: 20px;
}

.close-btn:hover {
  background-color: #0036a8;
  transform: scale(1.05);
}
</style>
