<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Loader from "@/components/globals/Loader.vue";

const account = computed(() => AppState.account)

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
