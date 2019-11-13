<template>
    <div v-if="value" class="message-container" :class="type">
        <i :class="`message-icon fa fa-${icon} fa-2x`" />
        {{this.value}}
    </div>
</template>

<script>

import MessageService from './MessageService';

export default {
    name: 'Message',
    data() {
        return {
            value: '',
            type: 'success'
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        icon() {
            switch (this.type) {
                case MessageService.TYPES.SUCCESS:
                    return 'check';
                case MessageService.TYPES.ERROR:
                    return 'bomb';
                case MessageService.TYPES.WARNING:
                    return 'exclamation-triangle';
                default:
                    return 'check';
            }
        }
    },
    created() {
        MessageService.subscribe(this.id, objMessage => {
            this.value = objMessage.message;
            this.type = objMessage.type;

            if (this.type === 'success') {
                setTimeout(() => {
                    this.value = '';
                }, 2000);
            }
        });
    },
    destroyed() {
        MessageService.unsubscribe(this.id);
    }
}
</script>

<style scoped>
.message-container {
    padding: 12px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 4px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.message-icon {
    margin-right: 15px;
}
.message-container.error {
    background: red;
}
.message-container.success {
    background: green;
}
.message-container.warning {
    background: orange;
}
</style>
