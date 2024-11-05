<script setup>
import { flashcardsService } from "@/services/FlashcardsService";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

const editableFlashcardData = ref({
  question: '',
  answer: '',
  deckId: `${route.params.deckId}`
})

async function createFlashcard() {
  try {
    await flashcardsService.createFlashcard(editableFlashcardData.value)
    editableFlashcardData.value = {
      question: '',
      answer: '',
      deckId: `${route.params.deckId}`
    }
    Modal.getOrCreateInstance("#new-flashcard-modal").hide()
  } catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="modal fade" id="new-flashcard-modal" tabindex="-1" aria-labelledby="new-flashcard-modal-label"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="new-flashcard-modal-label">New Flashcard</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createFlashcard()" id="new-flashcard-form"
            class="d-flex flex-column justify-content-between">
            <div class="form-floating mb-3">
              <textarea v-model="editableFlashcardData.question" class="form-control" placeholder="Flashcard Question"
                id="question" style="height: 150px" maxlength="200"></textarea>
              <label for="question">Question</label>
            </div>
            <div class="form-floating">
              <input v-model="editableFlashcardData.answer" type="text" class="form-control" id="answer"
                placeholder="Flashcard Answer" maxlength="50">
              <label for="answer">Answer</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" form="new-flashcard-form" class="btn btn-primary">Submit</button>
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