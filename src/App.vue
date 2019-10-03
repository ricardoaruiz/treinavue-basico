<template>
  <div id="app">
    <div class="main">
      
      <!-- Componente TempoAgora -->
      <TempoAgora />

      <!-- Componente Cotacao -->
      <Cotacao :moedaBase="moedaBase" @onCotacao="cotacaoResultado = $event">
        <template v-slot:input>
          <input type="text" class="input-moeda-base" v-model="moedaBase"/>
        </template>

        <template v-slot:mensagem>
          <p>{{cotacaoResultado}}</p>
        </template>
      </Cotacao>

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
      moedaBase: 'USD',
      cotacaoResultado : ''
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
input {
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,.2);
}
</style>
