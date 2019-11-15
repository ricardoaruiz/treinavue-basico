<template>
    <button 
        @click.stop="buttonClicked"
        :class="`${type} ${size}`"
        :title="tooltip"
        :disabled="disabled"
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
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'largs'].indexOf(value) >= 0
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
    position: relative;
    background: var(--btn-color);
    border: none;
    border-radius: 4px;
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
button:disabled {
    background: var(--btn-color-disabled);
}
.circle {
    border-radius: 50%;
}
.small {
    width: 24px;
    height: 24px;
    font-size: .9rem;
}
.medium {
    width: 38px;
    height: 38px;
    font-size: 1rem;
}
.large {
    width: 52px;
    height: 52px;
    font-size: 1.1rem;
}
</style>
