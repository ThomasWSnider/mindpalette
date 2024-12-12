<script setup>
import { computed } from "vue";
import DeckCard from "../DeckCard.vue";
import { AppState } from "@/AppState";

const decks = computed(() => AppState.decks.filter((deck) => deck.cardCount > 0))


</script>


<template>
  <div class="modal fade" id="select-study-deck-modal" tabindex="-1" aria-labelledby="select-study-deck-modal-label">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="select-study-deck-modal-label">Select A Deck</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-center">
            <div v-for="deck in decks" :key="deck.id" class="col-lg-4 col-sm-6 col-12">
              <DeckCard :deck="deck" :is-study-deck="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>