<script setup>
import App from "@/App.vue";
import { AppState } from "@/AppState";
import { flashcardsService } from "@/services/FlashcardsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { computed, ref, watchEffect } from "vue";


const flashcard = computed(() => AppState.focusedFlashcard)

const flashcardData = ref({
  question: flashcard.value?.question,
  answer: flashcard.value?.answer,
})

watchEffect(() => {
  if (AppState.focusedFlashcard) {
    flashcardData.value.question = AppState.focusedFlashcard.question
    flashcardData.value.answer = AppState.focusedFlashcard.answer
  }
})

async function editFlashcard() {
  try {
    logger.log("Submission received")
    await flashcardsService.editFlashcard(flashcard.value.id, flashcardData.value)
    Pop.success("Flashcard edited successfully")
    Modal.getOrCreateInstance('#edit-flashcard-modal').hide()
  } catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="modal fade" id="edit-flashcard-modal" tabindex="-1" aria-labelledby="edit-flashcard-modal-label"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="edit-flashcard-modal-label">Edit Flashcard</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editFlashcard()" id="edit-flashcard-form"
            class="d-flex flex-column justify-content-between">
            <div class="form-floating mb-3">
              <textarea v-model="flashcardData.question" class="form-control" placeholder="Flashcard Question"
                id="question" style="height: 150px"></textarea>
              <label for="question">Question</label>
            </div>
            <div class="form-floating">
              <input v-model="flashcardData.answer" type="text" class="form-control" id="answer"
                placeholder="Flashcard Answer">
              <label for="answer">Answer</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" form="edit-flashcard-form" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>