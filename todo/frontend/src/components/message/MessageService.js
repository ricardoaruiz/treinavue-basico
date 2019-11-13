import Vue from 'vue';

export default class MessageService {

    static _eventBus = new Vue();

    static TYPES = {
        SUCCESS: 'success',
        ERROR: 'error',
        WARNING: 'warning'
    }

    static subscribe(id, callback) {
        MessageService._eventBus.$on(id, callback);
    }

    static success(id, message) {
        MessageService._eventBus.$emit(id, { message, type: MessageService.TYPES.SUCCESS});
    }

    static error(id, message) {
        MessageService._eventBus.$emit(id, { message, type: MessageService.TYPES.ERROR});
    }

    static warning(id, message) {
        MessageService._eventBus.$emit(id, { message, type: MessageService.TYPES.WARNING});
    }

    static unsubscribe(id) {
        MessageService._eventBus.$off(id);
    }

}