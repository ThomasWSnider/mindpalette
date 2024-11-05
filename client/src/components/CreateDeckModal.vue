<script setup>
import { decksService } from "@/services/DecksService";
import Pop from "@/utils/Pop";
import { Modal } from "bootstrap";
import { ref } from "vue";


const editableDeckData = ref({
  title: "",
  coverImg: "",
  description: ""
})

async function createNewDeck() {
  try {
    await decksService.createNewDeck(editableDeckData.value)
    editableDeckData.value = {
      title: "",
      coverImg: "",
      description: ""
    }
    Modal.getOrCreateInstance("#create-deck-modal").hide()
  } catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="modal fade" id="create-deck-modal" tabindex="-1" aria-labelledby="create-deck-modal-label"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="create-deck-modal">Create A Deck</h1>
          <button type="button" data-bs-dismiss="modal" class="btn-close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-7 d-flex justify-content-center align-items-center">
              <div v-if="editableDeckData.coverImg" id="preview-box">
                <div class="card text-bg-dark mb-3 selectable shadow">
                  <img :src="editableDeckData.coverImg" class="card-img" :alt="`${editableDeckData.coverImg}`">
                  <div class="card-count">
                    <p class="fw-semibold m-0">0</p>
                  </div>
                  <div class="deck-title d-flex align-items-end rounded-bottom">
                    <p class="fw-semibold fs-6 mb-1">{{ editableDeckData.title }}</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="mb-3 placeholder-card">
                  <img id="placeholder-img" src="/img/Placeholder.png" class="card-img" :alt="`A Placeholder`">
                </div>
              </div>
            </div>
            <div class="col-5">
              <form @submit.prevent="createNewDeck()" id="new-deck-form"
                class="d-flex flex-column justify-content-between">
                <div class="form-floating mb-3">
                  <input v-model="editableDeckData.title" type="text" class="form-control" id="title"
                    placeholder="Title">
                  <label for="title">Deck Title</label>
                </div>
                <div class="form-floating mb-3">
                  <input v-model="editableDeckData.coverImg" type="url" class="form-control" id="img"
                    placeholder="Deck Image">
                  <label for="img">Deck Image</label>
                </div>
                <div class="form-floating">
                  <textarea v-model="editableDeckData.description" class="form-control" placeholder="Deck Description"
                    id="description" style="height: 150px"></textarea>
                  <label for="description">Deck Description</label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" form="new-deck-form" class="btn btn-success text-light fw-semibold">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
textarea {
  resize: none;
}

.modal-dialog {
  --bs-modal-width: 700px
}

form {
  height: 100%;
}

#preview-box {
  img {
    object-fit: cover;
    object-position: center;
    height: 100%;
  }

  .card {
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 45dvh;
  }

  .deck-title {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 .5em .33em .5em;
    height: 33%;
    background: transparent;
    background: linear-gradient(to bottom, transparent 0%, #000000 100%);

    >p {
      min-height: 1em;
    }
  }

  .card-count {
    position: absolute;
    top: -.33%;
    right: -.33%;
    padding: 0 .5em .75em .75em;
    border-radius: .375rem .375rem .375rem 50rem;
    max-height: 33%;
    border-top-right-radius: var(--bs-border-radius);
    background: linear-gradient(to bottom left, #0c0c0c8d, transparent);
  }

  .placeholder-img {
    background-color: transparent;
  }

  .placeholder-card {
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 45dvh;
    border: none;
  }
}
</style>