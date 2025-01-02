<script setup>
import { AppState } from "@/AppState";
import { decksService } from "@/services/DecksService";
import { flashcardsService } from "@/services/FlashcardsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const deck = computed(() => AppState.focusedDeck)
const flashcards = computed(() => AppState.flashcards)
const focusedFlashcard = computed(() => AppState.focusedFlashcard)
let currentFlashcardIndex = 0
let showAnswer = ref(false)

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
  showAnswer.value = false
  setFocusedFlashcard(currentFlashcardIndex)
}

function incrementFlashcard() {
  currentFlashcardIndex += 1
  if (currentFlashcardIndex > flashcards.value.length - 1) currentFlashcardIndex = 0
  showAnswer.value = false
  setFocusedFlashcard(currentFlashcardIndex)
}

function toggleAnswer() {
  showAnswer.value = !showAnswer.value
}

function shuffleFlashcards() {
  flashcardsService.shuffleFlashcards()
  showAnswer.value = false
  currentFlashcardIndex = 0
  setFocusedFlashcard(0)
}

</script>


<template>
  <section class="d-sm-flex justify-content-center align-items-center mt-sm-4">
    <div id="content-container" class="shadow rounded px-3 py-2 fw-semibold">
      <div v-if="deck" class="row justify-content-center mt-2 mt-sm-0">
        <div class="col-12 d-flex justify-content-between align-items-center mb-4">
          <p class="fs-2 m-0">{{ deck.title }}</p>
          <p class="fs-3 m-0">{{ `${currentFlashcardIndex + 1}/${flashcards.length}` }}</p>
        </div>
        <div class="col-12 d-flex justify-content-center mb-4">
          <div @click="toggleAnswer()" id="flashcard" class="shadow-lg pt-1">
            <hr class="mt-5 red-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line m-0">
            <div v-if="focusedFlashcard" class="flashcard-text">
              <p v-if="showAnswer" class="display-4 text-center fw-medium">{{ focusedFlashcard.answer }}</p>
              <p v-else class="display-4 text-center fw-medium">{{ focusedFlashcard.question }}</p>
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-4 d-flex justify-content-start">
            <button @click="decrementFlashcard()"
              class="arrow-btn d-flex justify-content-center align-items-center ms-3 btn btn-outline-success"><i
                class="mdi display-md-3 display-5 mdi-arrow-left"></i>
            </button>
          </div>
          <div class="col-4 d-flex justify-content-center align-items-center">
            <button @click="shuffleFlashcards()" class="btn btn-outline-danger fw-semibold fs-3 px-4">Shuffle</button>
          </div>
          <div class="col-4 d-flex justify-content-end">
            <button @click="incrementFlashcard()"
              class="arrow-btn d-flex justify-content-center align-items-center me-3 btn btn-outline-success"><i
                class="mdi display-md-3 display-5 mdi-arrow-right"></i>
            </button>
          </div>
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

  @media only screen and (max-width: 575.98px) {
    width: 100%;
    height: 100%;
    min-height: var(--main-height);
  }
}

#flashcard {
  width: 80%;
  max-height: 420px;
  aspect-ratio: 5/3;
  background-color: #f7ea5a;
  position: relative;
  cursor: pointer;

  >.flashcard-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;

    >p {
      user-select: none;
    }
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

  @media only screen and (max-width: 575.98px) {
    width: 90%;
  }
}

.arrow-btn {
  height: 80px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: var(--bs-success) solid 3px;

  @media (max-width: 767.98px) {
    height: 55px;
  }

  &:hover {
    background-color: var(--bs-success);
    color: var(--bs-light);
  }
}

.btn-outline-danger {
  border-width: 2px;

  &:hover {
    color: var(--bs-light);
  }
}
</style>