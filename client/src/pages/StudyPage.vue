<script setup>
import { AppState } from "@/AppState";
import { decksService } from "@/services/DecksService";
import { flashcardsService } from "@/services/FlashcardsService";
import Pop from "@/utils/Pop";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const deck = computed(() => AppState.focusedDeck)
const flashcards = computed(() => AppState.flashcards)
const focusedFlashcard = computed(() => AppState.focusedFlashcard)
let currentFlashcardIndex = 0

onMounted(() => {
  getDeckById(route.params.deckId)
  getFlashcardsForStudyDeck(route.params.deckId).then(() => {
    setFocusedFlashcard(0)
  })
})

async function getDeckById(deckId) {
  try {
    await decksService.getDeckById(deckId)
    if (deck.value.cardCount <= 0) {
      decksService.clearFocusedDeck()
      return
    }
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getFlashcardsForStudyDeck(deckId) {
  try {
    await flashcardsService.getFlashcardsByDeckId(deckId)
  }
  catch (error) {
    Pop.error(error);
  }
}

function setFocusedFlashcard(flashcardIndex) {
  flashcardsService.setFocusedFlashcard(flashcardIndex)
}

function decrementFlashcard() {
  currentFlashcardIndex -= 1
  if (currentFlashcardIndex < 0) currentFlashcardIndex = flashcards.value.length - 1
  setFocusedFlashcard(currentFlashcardIndex)
}

function incrementFlashcard() {
  currentFlashcardIndex += 1
  if (currentFlashcardIndex > flashcards.value.length - 1) currentFlashcardIndex = 0
  setFocusedFlashcard(currentFlashcardIndex)
}

</script>


<template>
  <section class="d-flex justify-content-center align-items-center mt-5">
    <div id="content-container" class="shadow rounded px-3 py-2 fw-semibold  mt-5">
      <div v-if="deck" class="row">
        <div class="col-12 d-flex justify-content-between align-items-center mb-3">
          <p class="fs-2 m-0">{{ deck.title }}</p>
          <p class="fs-3 m-0">Card {{ `${currentFlashcardIndex + 1}/${flashcards.length}` }}</p>
        </div>
        <div class="col-12 d-flex justify-content-center mb-3">
          <div id="flashcard" class="shadow-lg pt-1">
            <hr class="mt-5 red-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line m-0">
            <div v-if="focusedFlashcard" class="question">
              <p class="display-4 text-center fw-medium">{{ focusedFlashcard.question }}</p>
            </div>
          </div>
        </div>
        <div class="col-4 text-center">
          <button @click="decrementFlashcard()" class="btn">Back</button>
        </div>
        <div class="col-4 text-center">
          <button class="btn">Shuffle</button>
        </div>
        <div class="col-4 text-center">
          <button @click="incrementFlashcard()" class="btn">Next</button>
        </div>
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

#flashcard {
  width: 80%;
  max-height: 420px;
  aspect-ratio: 5/3;
  background-color: #f7ea5a;
  position: relative;

  >.question {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
  }

  >hr.red-line {
    border-color: #E74C3C;
    border-width: 3px;
    margin-bottom: 3rem;
  }

  >hr.blue-line {
    border-color: #0d5ca6da;
    border-width: 3px;
    margin-bottom: 3rem;
  }
}
</style>