<template>
    <div class="tempo-container">
        <h2>Tempo agora</h2>
        <div class="tempo-label">Data</div><div class="tempo-data">{{this.data.date}}</div>        
        <div class="tempo-label">Hora</div><div class="tempo-data">{{this.data.time}}</div>
        <div class="tempo-label">Cidade</div><div class="tempo-data">{{this.data.city}}</div>
        <div class="tempo-label">Condição</div><div class="tempo-data">{{this.data.description}}</div>        
        <div class="tempo-label">Velocidade do vendo</div><div class="tempo-data">{{this.data.wind_speedy}}</div>        
        <div class="tempo-label">Hora do nascer do sol</div><div class="tempo-data">{{this.data.sunrise}}</div>
        <div class="tempo-label">Hora do por do sol</div><div class="tempo-data">{{this.data.sunset}}</div>
    </div>
</template>

<script>
export default {
    name: 'TempoAgora',
    data() {
        return {
            data: {}
        }
    },
    created() {
        fetch('https://api.hgbrasil.com/weather?format=json-cors&key=8d9f3d5a')
            .then(result => result.json())
            .then(data => this.data = data.results)
    }
}
</script>

<style scoped>
.tempo-label {
    text-align: left;
    margin-bottom: 5px;
}
.tempo-data {
    background: rgba(0,0,0,.5);
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
}
</style>