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
const decks = computed(() => AppState.decks.filter((deck) => deck.cardCount > 0))
const deck = computed(() => AppState.focusedDeck)
const flashcards = computed(() => AppState.flashcards)

onMounted(() => {
  getDeckById(route.params.deckId)
  getFlashcardsByDeckId(route.params.deckId)
})

async function getDeckById(deckId) {
  try {
    await decksService.getDeckById(deckId)
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
    // if (error.response.value === 404) return
    Pop.error(error);
  }
}

</script>


<template>
  <section class="d-flex align-items-center justify-content-center mt-4">
    <div id="content-container" class="shadow rounded px-3 container pb-4">
      <div v-if="deck && flashcards.length > 0">
        <div class="row mt-3">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <p class="fs-1 fw-bold m-2 mb-4">{{ deck?.title }}</p>
            <div>
              <button class="btn btn-primary fw-semibold m-3" data-bs-toggle="modal"
                data-bs-target="#new-flashcard-modal" title="Create A New Flashcard">
                New Flashcard
              </button>
            </div>
          </div>
          <div class="col-12 d-flex mb-1">
            <div id="delete-button-spacer" class=""></div>
            <p class="fs-4 mx-auto fw-semibold">Question</p>
            <p class="fs-4 mx-auto fw-semibold pe-lg-4">Answer</p>
            <div id="edit-button-spacer" class="ms-md-5 ms-2"></div>
          </div>
        </div>
        <div class="row mx-2">
          <div class="col-12">
            <div class="row">
              <div v-for="flashcard in flashcards" :key="flashcard.id" class="col-12">
                <FlashcardSummary :flashcard="flashcard" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="flashcards.length <= 0">
        <div class="row justify-content-center mt-3">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <p class="fs-1 fw-bold m-2 mb-4">{{ deck?.title }}</p>
          </div>
          <div class="col-12">
            <p v-if="decks.length <= 0" class="text-center fs-4 mt-5">It seems like you haven't made any flashcards yet.
              Click the
              button below to get
              started!</p>
            <p v-else class="text-center fs-4 mt-5">No cards found for this deck. Click the button to get started!</p>
          </div>
          <div class="col-5 mt-5">
            <div class="d-grid w-100 mt-5">
              <button class="btn btn-primary fw-semibold m-3 fs-4" data-bs-toggle="modal"
                data-bs-target="#new-flashcard-modal" title="Create A New Flashcard">
                Create Flashcard
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex justify-content-center align-items-center loading-blurb">
          <p class="fs-2"><i class="mdi mdi-loading mdi-spin"></i> Loading Content</p>
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

#delete-button-spacer {
  max-width: 30px;
  min-width: 25px;
}

#edit-button-spacer {
  max-width: 132px;
  min-width: 2rem;
}

.loading-blurb {
  min-height: 68vh;
}
</style>