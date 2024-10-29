<script setup>
import { Deck } from "@/models/Deck";
import { decksService } from "@/services/DecksService";
import Pop from "@/utils/Pop";
import { useRouter } from "vue-router";


defineProps({ deck: Deck, isStudyDeck: Boolean })

async function destroyDeck(deck) {
  try {
    const confirm = await Pop.confirm(`Are you sure you want to delete ${deck.title}`)
    if (!confirm) return
    await decksService.destroyDeck(deck.id)
    Pop.success(`${deck.title} has been successfully deleted`)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <RouterLink v-if="isStudyDeck" :to="{ name: 'Study', params: { deckId: deck.id } }">
    <div class="card text-bg-dark mb-3 selectable shadow" data-bs-toggle="modal"
      data-bs-target="#select-study-deck-modal">
      <img :src="deck.coverImg" class="card-img" :alt="deck.description">
      <div class="card-count">
        <p class="fw-semibold m-0">{{ deck.cardCount }}</p>
      </div>
      <div class="deck-title d-flex align-items-end rounded-bottom">
        <p class="fw-semibold fs-6 mb-1">{{ deck.title }}</p>
      </div>
    </div>
  </RouterLink>

  <RouterLink v-else :to="{ name: 'Flashcard', params: { deckId: deck.id } }">
    <div class="card text-bg-dark mb-3 selectable shadow">
      <button @click.prevent="destroyDeck(deck)" role="button" class="delete-button">
        <p class="text-light m-0 fs-5"><i class="mdi mdi-delete-outline"></i></p>
      </button>
      <img :src="deck.coverImg" class="card-img" :alt="deck.description">
      <div class="card-count">
        <p class="fw-semibold m-0">{{ deck.cardCount }}</p>
      </div>
      <div class="deck-title d-flex align-items-end rounded-bottom">
        <p class="fw-semibold fs-6 mb-1">{{ deck.title }}</p>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
img {
  object-fit: cover;
  object-position: center;
  height: 100%;
}


.card {
  width: 100%;
  aspect-ratio: 1/1;
  max-height: 33dvh;

  &:hover {
    .delete-button {
      visibility: visible;
      opacity: 1;
      cursor: pointer;
    }
  }
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
  padding: 0 .5em .50em .75em;
  border-radius: .375rem .375rem .375rem 50rem;
  max-height: 33%;
  border-top-right-radius: var(--bs-border-radius);
  background: linear-gradient(to bottom left, #0c0c0c8d, transparent);
}

.delete-button {
  position: absolute;
  top: -0.33%;
  left: -0.33%;
  padding: 0.25em 0.5em;
  max-height: 33%;
  border: none;
  border-top-left-radius: var(--bs-border-radius);
  border-bottom-right-radius: var(--bs-border-radius);
  background-color: var(--bs-danger);
  z-index: 5;
  visibility: hidden;
  opacity: 0;
  transition: all 0.15s ease-in;
}
</style>