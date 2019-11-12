<template>
    <div v-if="value" class="message-container">
        {{this.value}}
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: {
        value: {
            type: String
        }
    }
}
</script>

<style scoped>
.message-container {
    background: red;
    padding: 10px;
}
</style>
