<script setup>
import { computed, onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { useRoute } from "vue-router";
import { AppState } from "@/AppState.js";

const theme = ref(loadState('theme') || 'light')
const route = useRoute()
const account = computed(() => AppState.account)

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p class="display-5 text-dark m-0 font-sacramento mt-2">Mind Palette</p>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ms-5" id="navbarText">
      <ul class="navbar-nav me-md-5 me-2">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-dark lighten-30 selectable text-uppercase fw-semibold">
            About
          </router-link>
        </li>
      </ul>
      <ul v-if="account" class="navbar-nav me-md-5 me-2">
        <li>
          <router-link :to="{ name: 'Deck' }" class="btn text-dark lighten-30 selectable text-uppercase fw-semibold">
            Decks
          </router-link>
        </li>
      </ul>
      <ul v-if="account" class="navbar-nav me-md-5 me-2" data-bs-toggle="modal"
        data-bs-target="#select-study-deck-modal">
        <li>
          <p class="btn text-dark lighten-30 selectable text-uppercase fw-semibold m-0"
            :class="{ 'on-study-page': route.name == 'Study' }">
            Study
          </p>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
    </div>
    <div>
      <!-- <button class="btn text-light" @click="toggleTheme"
        :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
        <Icon :name="theme == 'light' ? 'weather-sunny' : 'weather-night'" />
      </button> -->
    </div>
    <Login />
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

.on-study-page {
  border-bottom: 2px solid var(--bs-dark);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &:hover {
    border-bottom: 2px solid var(--bs-dark);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-dark);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
