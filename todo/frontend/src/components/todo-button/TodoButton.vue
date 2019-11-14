<template>
    <button 
        @click.stop="buttonClicked"
        :class="type"
        :title="tooltip"
    >
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
        },
        tooltip: {
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
    background: var(--btn-color);
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    color: var(--btn-font-color);
}
button:hover {
    background: var(--btn-color-hover);
}
button:active {
    background: var(--btn-color-active);
}
.circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}
</style>
