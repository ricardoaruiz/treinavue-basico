<template>
    <div class="container">

        <TodoMessage :id="messageId" />

        <h2>{{title}}</h2>

        <form @submit.prevent="saveTask">
            <label for="description">Descrição</label>    

            <TodoInput id="description" 
                        :value.sync="task.description" 
                        placeholder="Descrição"
            />

            <div class="form-actions">
                <TodoButton label="Voltar" @onClick="backToList" icon="arrow-left"/>
                <TodoButton label="Confirmar" icon="check"/>
            </div>
        </form>    
    </div>
</template>

<script>
import TodoService from '../services/todo-service.js';
import TodoInput from '@/components/todo-input/TodoInput';
import TodoMessageService from '@/components/todo-message/TodoMessageService';

export default {
    components: { TodoInput },
    props: ['id'],
    data() {
        return {
            task: {
                description: ''
            }
        }
    },
    computed: {
        title() {
            return (!this.id ? 'Criar' : 'Alterar') + ' Task';
        },
        messageId() {
            return 'todoInsertUpdate';
        }
    },
    methods: {
        saveTask() {
            if (!this.task.description) {
                alert('Descrição não informada')
                return;
            }

            if (!this.id) {
                TodoService.create({
                        description: this.task.description,
                        done: false
                    })
                    .then(() => {
                        this.task.description = '';
                        TodoMessageService.success(this.messageId, 'Task criada com sucesso')
                    })
                    .catch(() => TodoMessageService.error(this.messageId, 'Erro ao inserir a task'));
            } else {
                TodoService.update({
                    id: this.id,
                    description: this.task.description,
                    done: false                    
                })
                .then(() =>  TodoMessageService.success(this.messageId, 'Task alterada com sucesso'))
                .catch(() => TodoMessageService.error(this.messageId, 'Erro ao alterar a task'));
            }
        },
        backToList() {
            this.$router.push({ name: 'todo-list'})
        }
    },
    created() {
        if (this.id) {
            TodoService.find(this.id)
                .then(task => this.task.description = task.description)
                .catch(() => TodoMessageService.error(this.messageId, 'Erro ao carregar a task'));
        }
    }
}
</script>

<style scoped>
.container h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 40px;
}
form {
    display: grid;
}
form button {
    margin-top: 20px;
    width: 200px;
}
form label {
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: bold;
}
form input { 
    padding: 10px;
    font-size: 1.2rem;
    border: 1px solid lightgray;
    border-radius: 4px;
}
.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
