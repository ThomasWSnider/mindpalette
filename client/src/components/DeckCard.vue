<script setup>
import { Deck } from "@/models/Deck";


defineProps({ deck: Deck })
</script>


<template>
  <div class="card text-bg-dark mb-3 shadow">
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
  height: 150px;
}

.deck-title {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 .5em 0 .5em;
  background: #00000000;
  background: linear-gradient(180deg, #00000000 0%, #000000 100%);
}

.card-count {
  position: absolute;
  top: 0%;
  right: 0%;
  padding: 0 .5em 0 .5em;
  border-top-right-radius: var(--bs-border-radius);
  background: linear-gradient(to bottom left, #0c0c0c8d, transparent)
}
</style>