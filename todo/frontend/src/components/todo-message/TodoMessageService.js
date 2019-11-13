import Vue from 'vue';

export default class MessageService {

    static _eventBus = undefined;

    static TYPES = {
        SUCCESS: 'success',
        ERROR: 'error',
        WARNING: 'warning'
    }

    static get eventbus() {
        if (!MessageService._eventBus) {
            MessageService._eventBus = new Vue();
        }
        return MessageService._eventBus;
    }

    static subscribe(id, callback) {
        MessageService.eventbus.$on(id, callback);
    }

    static success(id, message) {
        MessageService.eventbus.$emit(id, { message, type: MessageService.TYPES.SUCCESS});
    }

    static error(id, message) {
        MessageService.eventbus.$emit(id, { message, type: MessageService.TYPES.ERROR});
    }

    static warning(id, message) {
        MessageService.eventbus.$emit(id, { message, type: MessageService.TYPES.WARNING});
    }

    static unsubscribe(id) {
        MessageService.eventbus.$off(id);
    }

}