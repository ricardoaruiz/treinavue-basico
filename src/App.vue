<template>
  <div id="app">  
    <p>Lado do quadrado: {{lado}}</p>
    <p>Perímetro do quadrado: {{lado * 4}}</p>
    <p>Área do quadrado: {{lado * lado}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      lado: 2
    }
  },
  created() {
    setTimeout(() => {
      this.titulo = 'Título da página'
    }, 1500);
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
