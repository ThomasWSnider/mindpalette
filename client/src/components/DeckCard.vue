<script setup>
import { Deck } from "@/models/Deck";


defineProps({ deck: Deck })
</script>


<template>
  <div class="card text-bg-dark mb-3 selectable shadow">
    <img :src="deck.coverImg" class="card-img" :alt="deck.description">
    <div class="card-count">
      <p class="fw-semibold m-0">{{ deck.cardCount }}</p>
    </div>
    <div class="deck-title d-flex align-items-end rounded-bottom">
      <p class="fw-semibold fs-6 mb-1">{{ deck.title }}</p>
    </div>
  </div>
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
  padding: 0 .5em 0 .5em;
  max-height: 33%;
  border-top-right-radius: var(--bs-border-radius);
  background: linear-gradient(to bottom left, #0c0c0c8d, transparent);
}
</style>