<script setup>
import { AppState } from "@/AppState";
import CreateDeckModal from "@/components/CreateDeckModal.vue";
import DeckCard from "@/components/DeckCard.vue";
import NewDeckButton from "@/components/NewDeckButton.vue";
import { decksService } from "@/services/DecksService";
import Pop from "@/utils/Pop";
import { computed, onMounted, ref, watchEffect } from "vue";

const decks = computed(() => AppState.decks)
let noDecks = ref(false)

watchEffect(() => {
  if (decks.value.length > 0)
    noDecks.value = false
})

onMounted(() => {
  getUserDecks()
})

async function getUserDecks() {
  try {
    await decksService.getUserDecks()
  } catch (error) {
    if (error.response.status === 404) {
      noDecks.value = true
      return
    }
    Pop.error(error);
  }
}

</script>

<template>
  <section class="d-flex align-items-center justify-content-center mt-4">
    <div id="content-container" class="shadow rounded px-3">
      <p class="fs-3 fw-semibold mt-2 mb-3 ms-2">Decks</p>
      <div v-if="!noDecks" class="row mx-2">
        <div v-for="deck in decks" :key="deck.id" class="col-lg-3 col-md-4 col-sm-6 col-12">
          <DeckCard :deck="deck" :isStudyDeck="false" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-12">
          <NewDeckButton />
        </div>
      </div>
      <div v-else class="row justify-content-center mt-5 mx-2">
        <div class="col-12">
          <p class="fs-5 text-center mb-5">It seems you haven't made any flashcards yet. To get started, click on the
            button below to create your first flashcard deck!</p>
        </div>
        <div class="col-lg-4 col-sm-6 col-12">
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
