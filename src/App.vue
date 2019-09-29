<template>
  <div id="app">
    <ul>
      <li><a v-on:click.prevent="appleClick" href="www.apple.com">Apple</a></li>
      <li><a @click.prevent="mensagem='Google'" href="www.google.com">Google</a></li>
    </ul>
    {{mensagem}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      mensagem: ''
    }
  },
  methods: {
    appleClick() {
      this.mensagem = 'Apple';
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
