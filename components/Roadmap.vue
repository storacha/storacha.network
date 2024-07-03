<script lang="ts" setup>

</script>

<template>
  <div class="flex flex-col sm:flex-row">
    <div class="w-80">
      <Heading type="h3" class="color-brand-3">
        Roadmap
      </Heading>
      <p class="p1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, porro? Fuga, repellat quae quos voluptatibus suscipit aut quod illum dolorem fugiat ex itaque adipisci alias obcaecati laudantium atque, aperiam repudiandae.
      </p>
    </div>
    <div class="cards">
      <div class="card">
        1
      </div>
      <div class="card">
        2
      </div>
      <div class="card">
        3
      </div>
      <div class="card">
        4
      </div>
      <div class="card">
        5
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.cards {
  display: grid;
  grid-auto-columns: 100%;
  grid-column-gap: 10px;
  grid-auto-flow: column;
  padding: 25px 0px;
  list-style: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  scroll-snap-align: start;
  transition: all 0.2s;
  background-color: red;
}

.cards::-webkit-scrollbar {
  height: 12px;
}

.cards::-webkit-scrollbar-thumb,
.cards::-webkit-scrollbar-track {
  border-radius: 92px;
}

.cards::-webkit-scrollbar-thumb {
  background: red;
}

.cards::-webkit-scrollbar-track {
  background: black;
}

@media (min-width: 500px) {
  .cards {
    grid-auto-columns: calc(50% - 10px);
    grid-column-gap: 20px;
  }
}

@media (min-width: 700px) {
  .cards {
    grid-auto-columns: calc(calc(100% / 3) - 20px);
    grid-column-gap: 30px;
  }
}

@media (min-width: 1100px) {
  .cards {
    grid-auto-columns: calc(25% - 30px);
    grid-column-gap: 40px;
  }
}
</style>
