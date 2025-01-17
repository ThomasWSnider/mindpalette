<script setup>
import { AppState } from "@/AppState";
import { Flashcard } from "@/models/Flashcard";
import { flashcardsService } from "@/services/FlashcardsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { ref, watchEffect } from "vue";


const props = defineProps({ flashcard: Flashcard })

const editable = ref(false)

const flashcardData = ref({
  question: props.flashcard?.question,
  answer: props.flashcard?.answer,
})

watchEffect(() => {
  if (AppState.focusedFlashcard) {
    flashcardData.value.question = AppState.focusedFlashcard.question
    flashcardData.value.answer = AppState.focusedFlashcard.answer
  }
})

function toggleEditability() {
  editable.value = true
}

async function destroyFlashcard(flashcardId) {
  try {
    const confirm = await Pop.confirm('Are you sure you want to delete this flashcard?', "It will be gone forever")
    if (!confirm) return
    await flashcardsService.destroyFlashcard(flashcardId)
  } catch (error) {
    Pop.error(error);
  }
}

async function editFlashcard() {
  try {
    await flashcardsService.editFlashcard(props.flashcard.id, flashcardData.value)
    editable.value = false
    Pop.success("Flashcard edited successfully")
  } catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div v-if="!editable" class="justify-content-sm-between mb-4 row">
    <div class="card-info rounded-4 pe-2 shadow col-12">
      <div class="row">
        <p class="my-auto col-6 py-1 fw-semibold">{{ flashcard.question }}</p>
        <p class="my-auto pe-4 col-4 py-1 text-center">{{ flashcard.answer }}</p>
        <div class="col-2 d-flex pe-0">
          <button @click="toggleEditability"
            class="edit-button btn btn-success rounded-end-4 rounded-start-0 text-light" title="Edit Flashcard">
            <p class="fw-semibold m-0 d-none d-md-block fs-5">Edit</p>
            <i class="mdi mdi-file-document-edit-outline d-block d-md-none"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="justify-content-sm-between mb-4 row">
    <div class="card-info rounded-4 pe-2 shadow col-12">
      <div class="row">
        <form @submit.prevent="editFlashcard()" id="edit-flashcard-form" class="col-10">
          <div class="row align-items-center">
            <div class="my-2 mx-auto col-8">
              <label for="question">Question</label>
              <textarea v-model="flashcardData.question" class="form-control" placeholder="Flashcard Question"
                id="question" style="height: 100px" maxlength="200"></textarea>
            </div>
            <div class="col-4 mx-auto">
              <label for="answer">Answer</label>
              <input v-model="flashcardData.answer" type="text" class="form-control" id="answer"
                placeholder="Flashcard Answer" maxlength="50">
            </div>
          </div>
        </form>
        <div class="col-2 d-none d-sm-flex pe-0">
          <button type="submit" form="edit-flashcard-form" class="edit-button btn btn-success rounded-0 text-light px-1"
            title="Edit Flashcard">
            <p class="fw-semibold m-0 d-none d-md-block fs-2 mt-1">
              <i class="mdi mdi-check d-block"></i>
            </p>
          </button>
          <button @click="destroyFlashcard(flashcard.id)"
            class="edit-button btn btn-danger px-1 rounded-end-4 rounded-start-0 text-light" title="Edit Flashcard">
            <p class="fw-semibold m-0 d-none d-md-block fs-2 mt-1">
              <i class="mdi mdi-delete-outline d-block"></i>
            </p>
          </button>
        </div>
        <div
          class="col-2 d-flex flex-column align-items-end justify-content-center pe-0 d-sm-none mobile-buttons-container">
          <button type="submit" form="edit-flashcard-form"
            class="d-block d-sm-none btn btn-success text-light rounded-top edit">
            <i class="mdi mdi-check d-block d-md-none"></i>
          </button>
          <button @click="destroyFlashcard(flashcard.id)"
            class="d-block d-sm-none btn btn-danger text-light rounded-bottom delete">
            <i class="mdi mdi-delete-outline d-block d-md-none"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-info {
  background-color: #F0F0F0;
}

.edit-button {
  height: 100%;
  width: 100%;
}

.mobile-buttons-container {
  button {
    height: 50%;
  }

  button.edit {
    border-radius: 0 1rem 0 0 !important;
  }

  button.delete {
    border-radius: 0 0 1rem 0 !important;
  }
}
</style>