import Vue from 'vue';

export default class TodoModalService {

    static _eventBus = undefined;

    static get _event() {
        if (!TodoModalService._eventBus) {
            TodoModalService._eventBus = new Vue();
        }
        return TodoModalService._eventBus;
    }

    static subscribe(modalId, callback) {
        TodoModalService._event.$on(modalId, callback);
    }

    static open(modalId) {
        TodoModalService._event.$emit(modalId, { open: true });
    }

    static close(modalId) {
        TodoModalService._event.$emit(modalId, { open: false });
    }

    static unsubscribe(modalId) {
        TodoModalService._event.$off(modalId);
    }

}