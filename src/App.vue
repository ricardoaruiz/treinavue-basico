<template>
  <div id="app">
    <p>iPhone: {{quantidade}}</p>
    <button @click="decrementarQuantidade">Decrementar quantidade</button>
    <p>{{mensagem}}</p>    
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      quantidade: 5,
      mensagem: ""
    }
  },
  methods: {
    decrementarQuantidade() {
      this.quantidade--;      
      if ( this.quantidade <= 0 ) {
        this.mensagem = 'Produto esgotado';
      }
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
