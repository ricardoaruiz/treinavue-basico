<template>
    <button 
        @click="buttonClicked"
        :class="type">
        <i v-if="icon" :class="`fa fa-${icon}`"></i>        
        {{this.label}}
</button>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        },
        type: {
            type: String,
            default: 'normal'
        },
        icon: {
            type: String
        }
    },
    methods: {
        buttonClicked() {
            this.$emit('onClick');
        }
    }
}
</script>

<style scoped>
button {
    padding: 10px;
    background: #add8e6;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
}
button:hover {
    background: #add8e6cc;
}
button:active {
    background: #99d4e7;
}
.circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}
</style>
