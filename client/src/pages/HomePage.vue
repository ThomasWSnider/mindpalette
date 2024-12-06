<script setup>
import { AppState } from "@/AppState";
import { computed, onMounted, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";


const account = computed(() => AppState.account)
const router = useRouter()


watch(account, () => { if (account.value) router.push({ name: 'Deck' }) }, { immediate: true })

</script>


<template>
  <section class="d-flex align-items-center justify-content-center mt-sm-4 mt-0">
    <div id="content-container" class="shadow rounded px-3">
      <div class="d-flex flex-column justify-content-center align-items-center mt-sm-0 mt-5 text-center">
        <img src="/img/MindPaletteLogo.png" alt="A multicolored brain">
        <p class="display-4 fw-semibold mt-2 mb-3 ms-2">Welcome to Mind Palette!</p>
        <p class="ms-2 login-blurb">To begin, click the Login button to log in or sign up</p>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
#content-container {
  background-color: #FFFFFF;
  min-height: 85dvh;
  max-width: 100vw;
  width: 70vw;

  >div {
    min-height: 85dvh;
    max-height: 100%;

    .login-blurb {
      margin-bottom: 6em;
    }
  }

  @media only screen and (max-width: 575.98px) {
    width: 100%;
    height: 100%;
    min-height: var(--main-height);
  }
}

img {
  max-height: 33dvh;
  user-select: none;
  -webkit-user-drag: none;
}
</style>