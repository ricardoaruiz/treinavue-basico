<template>
    <div>
        <h2>Cotação do dólar</h2>
        <button @click="buscarCotacao">Mostrar cotação agora</button>
        <p v-if="data">1 dolar = R$ {{this.data.rates['BRL']}}</p>
    </div>
</template>

<script>
export default {
    name: 'CotacaoDolar',
    data() {
        return {
            data: undefined
        }
    },
    methods: {
        buscarCotacao() {
            fetch('https://api.exchangeratesapi.io/latest?base=USD')
                .then(result => result.json())
                .then(data => this.data = data);
        }
    }
}
</script>

<style>
button {
    width: 100%;
    padding: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 4px;
    border: none;
    outline: none;
}
</style>