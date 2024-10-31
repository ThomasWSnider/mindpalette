<script setup>
import { AppState } from "@/AppState";
import CreateDeckModal from "@/components/CreateDeckModal.vue";
import DeckCard from "@/components/DeckCard.vue";
import NewDeckButton from "@/components/NewDeckButton.vue";
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
  <section class="d-flex align-items-center justify-content-center mt-4">
    <div id="content-container" class="shadow rounded px-3">
      <p class="fs-3 fw-semibold mt-2 mb-5 ms-2">Decks</p>
      <div class="row mt-5 mx-2">
        <div v-for="deck in decks" :key="deck.id" class="col-lg-3 col-md-4 col-sm-6 col-12">
          <DeckCard :deck="deck" :isStudyDeck="false" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-12">
          <NewDeckButton />
        </div>
      </div>
    </div>
  </section>
  <CreateDeckModal />
</template>

<style scoped lang="scss">
#content-container {
  background-color: #FFFFFF;
  min-height: 85dvh;
  max-width: 100vw;
  width: 70vw;
}
</style>
