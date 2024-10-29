<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import SelectStudyDeckModal from "./components/globals/SelectStudyDeckModal.vue";

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="container-fluid">
    <div class="row align-items-end">
      <div class="col-12 mt-4 text-center">
        <p class="fs-4 mb-2">|<span class="px-4"><a href="">Portfolio</a></span>|<span class="px-4"><a
              href="">Portfolio</a></span>|<span class="px-4"><a href="">Portfolio</a></span>|<span class="px-4"><a
              href="">Portfolio</a></span>|
        </p>
      </div>
      <div class="col-12 align-self-end">
        <small>© 2024 MindPalette. All rights reserved.</small>
      </div>
    </div>
  </footer>
  <SelectStudyDeckModal />
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 64px);
}

main {
  min-height: var(--main-height);
}

footer {
  height: 104px;
  background-color: var(--bs-text);
  color: var(--bs-page);

  .row {
    height: 104px;
  }

  a {
    color: var(--bs-page);

    &:hover {
      opacity: .66;
      transition: opacity 0.1s ease-in-out;
    }
  }

  small {
    color: var(--bs-page);
    opacity: 0.5;
  }
}
</style>
