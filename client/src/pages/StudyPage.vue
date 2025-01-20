<script setup>
import { AppState } from "@/AppState";
import { decksService } from "@/services/DecksService";
import { flashcardsService } from "@/services/FlashcardsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const account = computed(() => AppState.account)
const decks = computed(() => AppState.decks)
const deck = computed(() => AppState.focusedDeck)
const flashcards = computed(() => AppState.flashcards)
const focusedFlashcard = computed(() => AppState.focusedFlashcard)
const shuffle = ref(true)
let currentFlashcardIndex = ref(0)
let showAnswer = ref(false)
const showNext = ref(false)
const nextFlashCard = computed(() => AppState.flashcards[currentFlashcardIndex.value])

onMounted(async () => {
  if (account.value) {
    if (decks.value.length === 0) await getUserDecks()
    await getDeckById(route.params.deckId)
    await getFlashcardsForStudyDeck(route.params.deckId).then(() => {
      setFocusedFlashcard(0)
    })
  }
  else {
    if (decks.value.length === 0) await getPublicDecks()
    await getPublicDeckById(route.params.deckId)
    await getFlashcardsForStarterDeck(route.params.deckId).then(() => {
      setFocusedFlashcard(0)
    })
  }
})

watch(() => route.params.deckId, async () => {
  if (account.value) {
    if (decks.value.length === 0) await getUserDecks()
    await getDeckById(route.params.deckId)
    await getFlashcardsForStudyDeck(route.params.deckId).then(() => {
      setFocusedFlashcard(0)
    })
  }
  else {
    if (decks.value.length === 0) await getPublicDecks()
    await getPublicDeckById(route.params.deckId)
    await getFlashcardsForStarterDeck(route.params.deckId).then(() => {
      setFocusedFlashcard(0)
    })
  }
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

async function getFlashcardsForStarterDeck(deckId) {
  try {
    await flashcardsService.getFlashcardsForStarterDeck(deckId)
  } catch (error) {
    Pop.error(error);
  }
}

async function getPublicDeckById(deckId) {
  try {
    await decksService.getPublicDeckById(deckId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getUserDecks() {
  try {
    await decksService.getUserDecks()
  } catch (error) {
    Pop.error(error);
  }
}

async function getPublicDecks() {
  try {
    await decksService.getPublicDecks()
  } catch (error) {
    Pop.error(error);
  }
}

function setFocusedFlashcard(flashcardIndex) {
  flashcardsService.setFocusedFlashcard(flashcardIndex)
}

function decrementFlashcard() {
  shuffleNextCard()
  currentFlashcardIndex.value -= 1
  if (currentFlashcardIndex.value < 0) currentFlashcardIndex.value = flashcards.value.length - 1
  showAnswer.value = false
  setFocusedFlashcard(currentFlashcardIndex.value)
}

function incrementFlashcard() {
  shuffleNextCard()
  currentFlashcardIndex.value += 1
  if (currentFlashcardIndex.value > flashcards.value.length - 1) currentFlashcardIndex.value = 0
  showAnswer.value = false
  setFocusedFlashcard(currentFlashcardIndex.value)

}

function shuffleNextCard() {
  showNext.value = true
  shuffle.value = false
  setTimeout(() => shuffle.value = true, 450)
  setTimeout(() => showNext.value = false, 550)
}

function toggleAnswer() {
  showAnswer.value = !showAnswer.value
}

function shuffleFlashcards() {
  flashcardsService.shuffleFlashcards()
  showAnswer.value = false
  currentFlashcardIndex.value = 0
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
        <section v-if="deck" class="card-display px-md-5 px-3 py-2">
          <div :class="{ 'opacity-0': !showNext }">
            <div class="pt-1 flashcard ">
              <div class="flashcard-text answer d-flex justify-content-center align-items-center">
                <p class="display-md-4 display-sm-6 display-5 text-center fw-medium ">{{ nextFlashCard.question
                  }}
                </p>
              </div>
            </div>
          </div>
          <Transition name="card-shuffle" mode="out-in">
            <div v-if="shuffle">
              <Transition mode="out-in">
                <div v-if="showAnswer" @click="toggleAnswer()" class="pt-1 flashcard">
                  <div class="flashcard-text question d-flex justify-content-center align-items-center">
                    <p class="display-md-4 display-sm-6 display-5 text-center fw-medium">{{ focusedFlashcard.answer }}
                    </p>
                  </div>
                </div>
                <div v-else @click="toggleAnswer()" class="pt-1 flashcard">
                  <div class="flashcard-text answer d-flex justify-content-center align-items-center">
                    <p class="display-md-4 display-sm-6 display-5 text-center fw-medium">{{ focusedFlashcard.question
                      }}
                    </p>
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </section>
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

  >p {
    user-select: none;
  }
}

.opacity-0 {
  pointer-events: none;
}

.card-display {
  display: grid;
  place-content: center;
  grid-template-columns: 1f;
  grid-template-rows: 1fr;
  filter: drop-shadow(var(--bs-box-shadow));

  &>* {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
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


.card-shuffle-enter-active,
.card-shuffle-leave-active {
  --bs-box-shadow: 0;
  transition: all 0.5s linear;
  transform-origin: bottom right;
}


.card-shuffle-leave-to {
  opacity: 0;
  transform: rotateZ(20deg) translateY(-50px) translateX(25px);

  // .flashcard {
  //   background-image: url(https://gifdb.com/images/high/peace-out-ghosted-disappearing-meme-sv0vi30z56ml8s05.gif);
  //   background-size: cover;
  //   background-position: center;

  //   >.question,
  //   .answer {
  //     opacity: 0;
  //   }
  // }
}

.flashcard {
  width: 100%;
  max-height: 65dvh;
  aspect-ratio: 5/3;
  background-image: url('../assets/img/notecard-background.png');
  cursor: pointer;
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