<script setup>
import { AppState } from "@/AppState";
import { decksService } from "@/services/DecksService";
import Pop from "@/utils/Pop";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const deck = computed(() => AppState.focusedDeck)

onMounted(() => {
  getDeckById(route.params.deckId)
})

async function getDeckById(deckId) {
  try {
    await decksService.getDeckById(deckId)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <section v-if="deck" class="d-flex align-items-center justify-content-center mt-5">
    <div id="content-container" class="shadow rounded px-3 mt-5">
      <p class="fs-3 fw-semibold m-2">{{ deck.title }}</p>
      <div class="row mt-2 mx-2">
        <div class="col-12">
          <p>{{ deck.description }}</p>
        </div>
        <div class="col-12"></div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
#content-container {
  background-color: #FFFFFF;
  min-height: 68vh;
  max-width: 100vw;
  width: 70vw;
}
</style>