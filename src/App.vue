<template>
  <div id="app">
    <pre>{{dados}}</pre>
  </div>
</template>

<script>
export default {
 data() {
   return {
    dados: {}
   }
  },
  methods: {
    destruir() {
      this.$destroy();
    }
  },
  created() {
    fetch('https://api.github.com/users/ricardoaruiz')
      .then(result => result.json())
      .then(data => this.dados = data);
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
