<script setup>
import { computed } from 'vue';
import Login from './Login.vue';
import { useRoute } from "vue-router";
import { AppState } from "@/AppState.js";

const route = useRoute()
const account = computed(() => AppState.account)
const decks = computed(() => AppState.decks.filter((deck) => deck.cardCount > 0))

</script>
<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p class="display-5 text-dark m-0 font-sacramento mt-2 d-none d-sm-inline">Mind Palette</p>
        <img class="logo img-fluid mb-2 d-block d-sm-none" src="/img/MindPaletteLogo.png" alt="Mind Palette Logo">
      </div>
    </router-link>
    <div class="collapse navbar-collapse d-none d-sm-block ms-5" id="navbarText">
      <!-- v-if="account" -->
      <ul class="navbar-nav me-sm-5">
        <li>
          <router-link :to="{ name: 'Deck' }" class="btn text-dark lighten-30 selectable text-uppercase fw-semibold">
            Decks
          </router-link>
        </li>
      </ul>
      <!-- v-if="account && decks.length > 0" -->
      <ul class="navbar-nav me-sm-5" data-bs-toggle="modal" data-bs-target="#select-study-deck-modal">
        <li>
          <p class="btn text-dark lighten-30 selectable text-uppercase fw-semibold m-0"
            :class="{ 'on-study-page': route.name == 'Study' }">
            Study
          </p>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
    </div>
    <div class="d-flex d-sm-none">
      <div class="me-2 mobile-deck-nav">
        <router-link :to="{ name: 'Deck' }" class="btn text-dark lighten-30 selectable text-uppercase fw-semibold">
          Decks
        </router-link>
      </div>
      <div v-if="account && decks.length > 0" class="me-2" data-bs-toggle="modal"
        data-bs-target="#select-study-deck-modal">
        <div>
          <p class="btn text-dark lighten-30 selectable text-uppercase fw-semibold m-0"
            :class="{ 'on-study-page': route.name == 'Study' }">
            Study
          </p>
        </div>
      </div>
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

nav {
  height: 64px;

  @media only screen and (max-width: 575.98px) {
    padding-top: 1px;
  }
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-dark);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.mobile-deck-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-dark);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}



.navbar-toggler {
  color: var(--bs-dark);
}

.navbar-brand {
  @media only screen and (max-width: 575.98px) {
    padding: 0;
  }
}

.logo {
  height: 2.5em;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>
