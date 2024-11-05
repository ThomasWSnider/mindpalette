<script setup>

</script>


<template>
  <section class="d-flex align-items-center justify-content-center mt-4">
    <div id="content-container" class="shadow rounded px-3">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <img src="/img/Logo.png" alt="">
        <p class="display-4 fw-semibold mt-2 mb-3 ms-2">Welcome to Mind Palette!</p>
        <p class="ms-2 login-blurb">To begin, click the Login button to log in or sign up</p>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
#content-container {
  background-color: #FFFFFF;
  min-height: 85dvh;
  max-width: 100vw;
  width: 70vw;

  >div {
    min-height: 85dvh;
    max-height: 100%;

    .login-blurb {
      margin-bottom: 6em;
    }
  }
}

img {
  max-height: 33dvh;
}
</style>