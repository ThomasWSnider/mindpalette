<script setup>
import { Flashcard } from "@/models/Flashcard";


defineProps({ flashcard: Flashcard })

</script>


<template>
  <div class="d-flex justify-content-between mb-4">
    <i role="button" class="mdi mdi-close text-danger fs-4 selectable rounded"></i>
    <div class="card-info rounded-4 shadow-sm">
      <p class="m-0"></p>
      <p class="mx-auto my-0"></p>
      <button class="edit-button btn btn-success rounded-end-4 rounded-start-0">
        <p class="my-0 mx-2 text-light">Edit</p>
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-info {
  background-color: var(--bs-page);
  width: 96%;
  position: relative;
}

.edit-button {
  position: absolute;
  right: 0;
  height: 100%;
}
</style>