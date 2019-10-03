<template>
    <div>
        <h2>Cotação</h2>
        <button @click="buscarCotacao">Mostrar cotação agora</button>
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
    watch: {
        moedaBase() {
            this.$emit('onCotacao', '');
        }
    },
    methods: {
        buscarCotacao() {
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.moedaBase}`)
                .then(result => result.json())
                .then(data => {
                    const mensagem = !data['error'] 
                        ? `1 ${this.moedaBase} = R$ ${data.rates['BRL']}`
                        : 'Moeda base não encontrada';

                    this.$emit('onCotacao', mensagem);                    
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