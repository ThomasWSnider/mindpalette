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
    const confirm = await Pop.confirm('Are you sure you want to delete this flashcard?', "It will be gone forever")
    if (!confirm) return
    await flashcardsService.destroyFlashcard(flashcardId)
  } catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="justify-content-sm-between mb-4 row">
    <i @click="destroyFlashcard(flashcard.id)" role="button"
      class="mdi mdi-close text-danger fs-2 selectable rounded my-auto d-none d-sm-block col-1"
      title="Delete Flashcard"></i>
    <div class="card-info rounded-4 shadow col-sm-11 col-12">
      <div class="row">
        <p class="my-auto col-6 py-1 fw-semibold">{{ flashcard.question }}</p>
        <p class="my-auto pe-4 col-4 py-1 text-center">{{ flashcard.answer }}</p>
        <div class="col-2 d-none d-sm-flex pe-0">
          <button @click="openEditModal(flashcard.id)"
            class="edit-button btn btn-success rounded-end-4 rounded-start-0 text-light" title="Edit Flashcard">
            <p class="fw-semibold m-0 d-none d-md-block fs-5">Edit</p>
            <i class="mdi mdi-file-document-edit-outline d-block d-md-none"></i>
          </button>
        </div>
        <div
          class="col-2 d-flex flex-column align-items-end justify-content-center pe-0 d-sm-none mobile-buttons-container">
          <button @click="openEditModal(flashcard.id)"
            class="d-block d-sm-none btn btn-success text-light rounded-top edit">
            <i class="mdi mdi-file-document-edit-outline d-block d-md-none"></i>
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