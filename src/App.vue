<template>
  <div id="app">
    <p>Nome: {{nome}}</p>
    <p>Sobre nome: {{sobreNome}}</p>
    <p>Nome completo: {{nomeCompleto}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return { nome: 'Alfredo', sobreNome: 'Barbosa' }
  },
  computed: {
    nomeCompleto() {
      return this.nome + ' ' + this.sobreNome;
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
</style>
