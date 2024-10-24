<script setup>
import { Modal } from "bootstrap";


function closeModal() {
  document.getElementById("content-container").style.paddingRight = ``
  Modal.getOrCreateInstance('#create-deck-modal').hide()
}

</script>


<template>
  <div class="modal fade" id="create-deck-modal" tabindex="-1" aria-labelledby="create-deck-modal-label"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="create-deck-modal">Modal title</h1>
          <button @click="closeModal()" type="button" class="btn-close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button @click="closeModal()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>