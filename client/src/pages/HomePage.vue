<script setup>
import { AppState } from "@/AppState";
import DeckCard from "@/components/DeckCard.vue";
import { decksService } from "@/services/DecksService";
import Pop from "@/utils/Pop";
import { computed, onMounted } from "vue";

const decks = computed(() => AppState.decks)

onMounted(() => {
  getUserDecks()
})

async function getUserDecks() {
  try {
    await decksService.getUserDecks()
  } catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div class="content-container container shadow rounded">
    <div class="row">
      <div class="col-12">
        <p class="fs-3 fw-semibold mt-2 mb-5 ms-2">Decks</p>
        <div class="row mt-5 mx-2">
          <div v-for="deck in decks" :key="deck.id" class="col-md-4 col-sm-6 col-12">
            <DeckCard :deck="deck" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  background-color: #FFFFFF;
  height: 68vh;
  max-width: 100vw;
  width: 70vw;
  position: absolute;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
