<script setup>


</script>


<template>
  <div data-bs-toggle="modal" data-bs-target="#create-deck-modal" class="card mb-3 selectable" role="button">
    <div class="blank-space rounded"></div>
    <div class="circle">
      <div class="cross-y-axis"></div>
      <div class="cross-x-axis"></div>
    </div>
    <div class="deck-title d-flex align-items-end justify-content-center rounded-bottom">
      <p class="fw-semibold text-success fs-md-3 fs-sm-4 fs-5 mb-1 text-uppercase text-center">New Deck</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.blank-space {
  height: 100%;
  width: 100%;
  border: solid transparent 1px;
  background-color: #FFFFFF;
}

.card {
  max-width: 30em;
  aspect-ratio: 1/1;
  border-color: var(--bs-success);
  border-width: 1.66px;
  max-height: 20em;
}

.deck-title {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: .33em .5em 0 .5em;
}

.circle {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  height: 50%;
  aspect-ratio: 1/1;
  border: solid var(--bs-success) 3px;
  border-radius: 50%;

  .cross-y-axis {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    height: 50%;
    width: 3px;
    background-color: var(--bs-success);
    border: solid var(--bs-success) 1px;
  }

  .cross-x-axis {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 50%;
    height: 3.33px;
    z-index: 5;
    background-color: var(--bs-success);
    border: solid var(--bs-success) 1px;
  }
}
</style>