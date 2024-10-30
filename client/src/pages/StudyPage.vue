<script setup>
import { AppState } from "@/AppState";
import { computed } from "vue";


const deck = computed(() => AppState.focusedDeck)

</script>


<template>
  <section class="d-flex justify-content-center align-items-center mt-5">
    <div id="content-container" class="shadow rounded px-3 py-2 fw-semibold mt-5">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center mb-3">
          <p class="fs-2 m-0">{{ deck.title }}</p>
          <p class="fs-3 m-0">Card 1/20</p>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <div id="flashcard" class="shadow-lg pt-1">
            <hr class="mt-5 red-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line">
            <hr class="blue-line m-0">
          </div>
          <p></p>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
#content-container {
  background-color: #FFFFFF;
  min-height: 68vh;
  max-width: 100vw;
  width: 70vw;
}

#flashcard {
  width: 80%;
  aspect-ratio: 5/3;
  background-color: #f7ea5a;

  >hr.red-line {
    border-color: #E74C3C;
    border-width: 3px;
    margin-bottom: 2rem;
  }

  >hr.blue-line {
    border-color: #0D5BA6;
    border-width: 3px;
    margin-bottom: 2rem;
  }
}
</style>