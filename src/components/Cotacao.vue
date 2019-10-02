<template>
    <div>
        <h2>Cotação</h2>
        <button @click="buscarCotacao">Mostrar cotação agora</button>
        <p v-if="data">1 {{moedaBase}} = R$ {{this.data.rates['BRL']}}</p>
        <p v-if="moedaNaoSuportada">Moeda base não encontrada</p>
    </div>
</template>

<script>
export default {
    name: 'CotacaoDolar',
    props: {
        moedaBase: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            data: undefined,
            moedaNaoSuportada: false
        }
    },
    watch: {
        moedaBase() {
            this.data = undefined;
            this.moedaNaoSuportada = false;
        }
    },
    methods: {
        buscarCotacao() {
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.moedaBase}`)
                .then(result => result.json())
                .then(data => {
                    if (!data['error']) {
                        this.data = data;
                        this.moedaNaoSuportada = false;
                    } else {
                        this.data = undefined;
                        this.moedaNaoSuportada = true;
                    }
                });
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