<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import SelectStudyDeckModal from "./components/globals/SelectStudyDeckModal.vue";
import EndBlurb from "./components/EndBlurb.vue";

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="container-fluid">
    <EndBlurb />
  </footer>
  <SelectStudyDeckModal />
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';



main {
  min-height: var(--main-height);
}

footer {
  height: 104px;
  background-color: var(--bs-text);
  color: var(--bs-page);
}
</style>
