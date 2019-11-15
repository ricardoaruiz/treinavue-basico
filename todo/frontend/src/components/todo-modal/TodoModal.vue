<template>
    <TodoOverlay v-if="open">
        <div class="todo-modal">
            <div class="todo-modal_container">
                
                <div class="todo-modal_message">
                    <slot name="image">
                        <i class="fa fa-question fa-3x" v-if="type === 'question'"/>
                        <div v-else>
                            <i :class="`fa fa-${icon} fa-3x`"/>
                        </div>
                    </slot>
                    <p>
                        <slot name="message">
                            {{message}}
                        </slot>
                    </p>
                </div>

                <div class="todo-model_actions">
                    <slot name="actions">
                        <div v-if="type === 'question'" class="todo-model_actions-buttons">
                            <TodoButton 
                                label="Ok"
                                @onClick="onOkClicked"
                            />
                            <TodoButton 
                                label="Cancelar"
                                @onClick="onCancelClicked"
                            /> 
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </TodoOverlay>
</template>

<script>
import TodoModalService from '@/components/todo-modal/TodoModalService';
import TodoOverlay from '@/components/todo-overlay/TodoOverlay';

export default {
    name: 'TodoModal',
    components: { TodoOverlay },
    props: {
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'custom',
            validator: (value) => ['custom', 'question'].indexOf(value) >= 0
        },
        icon: {
            type: String
        },
        message: {
            type: String
        }
    },
    data() {
        return {
            open: false
        }
    },
    methods: {
        onOkClicked() {
            this.$emit('onOk')
            TodoModalService.close(this.id);
        },
        onCancelClicked() {
            this.$emit('onCancel');
            TodoModalService.close(this.id);
        }
    },
    created() {
        TodoModalService.subscribe(this.id, objModal => {
            this.open = objModal.open;
        });
    },
    destroyed() {
        TodoModalService.unsubscribe(this.id);
    }
}
</script>

<style>
.todo-modal {
    width: 100vw;
    height: 100vh;
    background: transparent;

    display: flex;
    justify-content: center;
    align-items: center;
}
.todo-modal_container {
    display: grid;
    padding: 20px;
    border-radius: 4px;
    
    min-width: 400px;
    max-width: 600px;
    background: var(--white-color);
    box-shadow: 2px 4px 6px rgba(0,0,0,.4);
}
.todo-modal_message {
    display: grid;
    grid-template-columns: 50px 1fr;
    justify-content: center;
    align-items: center;
}
.todo-modal_message p {
    margin-left: 15px;
    font-size: 1.1rem;
}
.todo-model_actions {
    margin-top: 80px;
}
.todo-model_actions-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.todo-model_actions-buttons button {
    min-width: 120px;
    margin-left: 10px;
}
</style>