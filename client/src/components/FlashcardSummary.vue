<script setup>
import { Flashcard } from "@/models/Flashcard";


defineProps({ flashcard: Flashcard })

</script>


<template>
  <div class="d-flex justify-content-between mb-4">
    <i role="button" class="mdi mdi-close text-danger fs-2 selectable rounded my-auto"></i>
    <div class="card-info rounded-4 shadow row">
      <p class="my-auto col-6 py-1 fw-semibold">{{ flashcard.question }}</p>
      <p class="my-auto pe-4 col-4 py-1 text-center">{{ flashcard.answer }}</p>
      <button class="edit-button btn btn-success rounded-end-4 rounded-start-0 col-2 text-light">
        <p class="fw-semibold m-0 d-none d-md-block">Edit</p>
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