<template>
  <div id="app">
    <div class="main">
      
      <!-- Componente TempoAgora -->
      <TempoAgora />

      <!-- Componente Cotacao -->
      <Cotacao :moedaBase="moedaBase"/>
      <input type="text" v-model="moedaBase"/>

    </div>
  </div>
</template>

<script>
import Cotacao from '@/components/Cotacao.vue';

export default {
  components: {
    Cotacao
  },
  data() {
    return {
      moedaBase: 'USD'
    }
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
.main input {
  margin-top: 10px;
  padding: 10px;
  font-size: 1.1rem;
}
</style>
