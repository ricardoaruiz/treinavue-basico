<template>
  <div id="app">
    <p :class="quantidade <=0 ? 'vermelho' : 'verde'">iPhone: {{quantidade}}</p>
    <button @click="decrementarQuantidade">Decrementar quantidade</button>
    <p v-show="quantidade <= 0">Produto esgotado</p>    
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
    }
  }
}
</script>

<style>
.vermelho {
  color: red;
}
.verde {
  color: green;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
