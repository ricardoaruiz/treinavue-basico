<template>
  <div id="app">
    <form>
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome" v-model="nome" />
      
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email" v-model="email" />

      <label for="telefone">Telefone</label>
      <input type="text" id="telefone" name="telefone" v-model="telefone" />
      
      <button @click.prevent="enviar">Enviar</button>
      <button @click.prevent="limpar">Limpar</button>
      <div v-if="enviado">{{resultado}}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: "",
      email: "",
      telefone: "",
      enviado: false
    }
  },
  computed: {
    resultado() {
      return `${this.nome} - ${this.email} - ${this.telefone}`;
    }
  },
  watch: {
    nome() {this.enviado = false;},
    email() {this.enviado = false;},
    telefone() {this.enviado = false;}
  },
  methods: {
    enviar() {
      this.enviado = true;
    },
    limpar() {
      this.nome = "";
      this.email = "";
      this.telefone = "";
      this.enviado = false;
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
form {
  width: 500px;
  margin: 0 auto;
  display: grid;
}
label {
  text-align: left;
  margin-bottom: 10px;
}
input {
  margin-bottom: 10px;
}
button {
  margin-bottom: 10px;
}
</style>
