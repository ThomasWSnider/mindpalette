<script setup>
import { AppState } from "@/AppState";
import EditFlashcardModal from "@/components/EditFlashcardModal.vue";
import FlashcardSummary from "@/components/FlashcardSummary.vue";
import NewFlashcardModal from "@/components/NewFlashcardModal.vue";
import { decksService } from "@/services/DecksService";
import { flashcardsService } from "@/services/FlashcardsService";
import Pop from "@/utils/Pop";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const deck = computed(() => AppState.focusedDeck)
const flashcards = computed(() => AppState.flashcards)

onMounted(() => {
  getDeckById(route.params.deckId)
})

async function getDeckById(deckId) {
  try {
    await decksService.getDeckById(deckId)
    if (deck.value.cardCount <= 0) {
      decksService.clearFocusedDeck()
      return
    }
    await getFlashcardsByDeckId(route.params.deckId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getFlashcardsByDeckId(deckId) {
  try {
    await flashcardsService.getFlashcardsByDeckId(deckId)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <section class="d-flex align-items-center justify-content-center mt-5">
    <div id="content-container" class="shadow rounded px-3 mt-5 container pb-4">
      <div v-if="deck">
        <div class="row mt-3">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <p class="fs-1 fw-bold m-2 mb-4">{{ deck.title }}</p>
            <div>
              <button class="btn btn-primary fw-semibold m-3" data-bs-toggle="modal"
                data-bs-target="#new-flashcard-modal">
                New Flashcard
              </button>
            </div>
          </div>
          <div class="col-12 d-flex mb-1">
            <p class="fs-4 mx-auto fw-semibold">Question</p>
            <p class="fs-4 mx-auto fw-semibold">Answer</p>
            <div class="space-maker ms-md-5 ms-2"></div>
          </div>
        </div>
        <div class="row mx-2">
          <div v-for="flashcard in flashcards" :key="flashcard.id" class="col-12">
            <FlashcardSummary :flashcard="flashcard" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <NewFlashcardModal />
  <EditFlashcardModal />
</template>


<style lang="scss" scoped>
#content-container {
  background-color: #FFFFFF;
  min-height: 68vh;
  max-width: 100vw;
  width: 70vw;
  margin-bottom: 104px;
}

.space-maker {
  max-width: 132px;
  min-width: 2rem;
}
</style>