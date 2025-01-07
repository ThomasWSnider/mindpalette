<script setup>
import { AppState } from "@/AppState";
import { decksService } from "@/services/DecksService";
import { flashcardsService } from "@/services/FlashcardsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
    <div id="content-container" class="shadow rounded px-3 py-2 mb-3 fw-semibold d-flex align-items-between">
      <div v-if="focusedFlashcard" class="row justify-content-center mt-2 mt-sm-0">
        <div class="col-12 d-flex justify-content-between align-items-center mb-4">
          <p class="fs-2 m-0">{{ deck.title }}</p>
          <p class="fs-3 m-0">{{ `${currentFlashcardIndex + 1}/${flashcards.length}` }}</p>
        </div>
        <div v-if="deck" class="col-12 d-flex justify-content-center mb-4">
          <Transition mode="out-in">
            <div v-if="showAnswer" @click="toggleAnswer()" class="shadow pt-1 flashcard">
              <div class="flashcard-text question d-flex justify-content-center align-items-center">
                <p class="display-md-4 display-sm-6 display-5 text-center fw-medium">{{ focusedFlashcard.answer }}</p>
              </div>
            </div>
            <div v-else @click="toggleAnswer()" class="shadow pt-1 flashcard">
              <div class="flashcard-text answer d-flex justify-content-center align-items-center">
                <p class="display-md-4 display-sm-6 display-5 text-center fw-medium">{{ focusedFlashcard.question }}</p>
              </div>
            </div>
          </Transition>
        </div>
        <div class="row align-items-center mt-3 mb-2 py-3 study-console-padding">
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
  background-color: var(--bs-light);
  min-height: 68vh;
  width: 70vw;

  @media (max-width: 991.98px) {
    width: 80%;
  }

  @media only screen and (max-width: 575.98px) {
    width: 100%;
    height: 100%;
    min-height: var(--main-height);
  }
}

.question,
.answer {
  height: 100%;
  width: 100%;
  padding: 15px;
  backface-visibility: hidden;

  >p {
    user-select: none;
  }
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: rotateY(90deg)
}

.flashcard {
  width: 80%;
  max-height: 420px;
  aspect-ratio: 5/3;
  background-image: url('../assets/img/notecard-background.png');
  cursor: pointer;

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

  @media only screen and (max-width: 991.98px) {
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
    width: 55px;
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

.study-console-padding {
  bottom: 0;
  background-color: var(--bs-light);

  @media (max-width: 767.98px) {
    padding: 0;
  }
}
</style>