<template>
  <div id="app">
    <div class="main">
      <TempoAgora />
      <CotacaoDolar />
    </div>
  </div>
</template>

<script>
import CotacaoDolar from '@/components/CotacaoDolar.vue';

export default {
  components: {
    CotacaoDolar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: grid;
}
</style>
