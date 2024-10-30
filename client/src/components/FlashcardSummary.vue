<script setup>
import { Flashcard } from "@/models/Flashcard";
import { flashcardsService } from "@/services/FlashcardsService";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";


defineProps({ flashcard: Flashcard })

function openEditModal(flashcardId) {
  flashcardsService.setFocusedFlashcard(flashcardId)
  Modal.getOrCreateInstance('#edit-flashcard-modal').show()
}

async function destroyFlashcard(flashcardId) {
  try {
    const confirm = await Pop.confirm('Are you sure you want to delete this flashcard?', "It will be irretrievable")
    if (!confirm) return
    await flashcardsService.destroyFlashcard(flashcardId)
  } catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="d-flex justify-content-between mb-4">
    <i @click="destroyFlashcard(flashcard.id)" role="button"
      class="mdi mdi-close text-danger fs-2 selectable rounded my-auto"></i>
    <div class="card-info rounded-4 shadow row">
      <p class="my-auto col-6 py-1 fw-semibold">{{ flashcard.question }}</p>
      <p class="my-auto pe-4 col-4 py-1 text-center">{{ flashcard.answer }}</p>
      <button @click="openEditModal(flashcard.id)"
        class="edit-button btn btn-success rounded-end-4 rounded-start-0 col-2 text-light">
        <p class="fw-semibold m-0 d-none d-md-block fs-5">Edit</p>
        <i class="mdi mdi-file-document-edit-outline d-block d-md-none"></i>
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-info {
  background-color: #F0F0F0;
  width: 96%;
}

.edit-button {
  height: 100%;
  min-width: 2rem;
}
</style>