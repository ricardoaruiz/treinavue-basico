<template>
  <div id="app">
    <ul>
      <li v-for="item in conteudo" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {    
      conteudo: ["data", "methods", "diretivas", "computed", "watch"]
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
