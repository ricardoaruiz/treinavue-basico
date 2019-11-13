<template>
    <div class="list-container">

        <TodoMessage :id="messageId" />

        <h2>Todo list</h2>
               
        <TodoTable  :fields="fields" 
                    :items="tasks">                     

            <!-- Sobrescrita dos headers da tabela -->
            <template v-slot:field-done="props">
                <i class="fa fa-check" />  {{props.label}}
            </template>

            <template v-slot:field-actions="props">
                <i class="fa fa-bolt" />  {{props.label}}
            </template>


            <!-- Sobrescrita dos valrores da tabela -->
            <template v-slot:item-done="props">
                {{props.item.done ? 'Sim' : 'Não'}}
            </template>

            <template v-slot:item-actions="props">
                <TodoButton v-if="!props.item.done" 
                            @onClick="gotoUpdate(props.item.id)" 
                            icon="edit" 
                            type="circle"/>

                <TodoButton v-if="props.item.done" 
                            @onClick="removeTask(props.item.id)" 
                            icon="trash" 
                            type="circle"/>                            

                <TodoButton @onClick="toggleTaskState(props.item)" 
                            :icon="props.item.done ? 'undo' : 'check'"
                            type="circle"/>
            </template>
            
        </TodoTable>

        <div class="list-actions">
            <TodoButton label="Adicionar" icon="plus" @onClick="gotoCreate"/>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import TodoMessageService from '@/components/todo-message/TodoMessageService';

import TodoTable from '@/components/todo-table/TodoTable';

export default {
    components: { TodoTable },
    data() {
        return {
            tasks: []
        }
    },
    computed: {
        messageId() {
            return 'listMessage';
        },
        fields() {
            return [{
                        label: 'Descrição', 
                        name: 'description'
                    },
                    {
                        label: 'Finalizado', 
                        name: 'done'
                    },
                    {
                        label: 'Ações', 
                        name: 'actions'
                    }];
        }
    },
    methods: {
        gotoCreate() {
            this.$router.push({ name: 'todo-create' });
        },
        gotoUpdate(id) {
            this.$router.push({ name: 'todo-update', params: { id } });
        },
        removeTask(id) {
            if(confirm('Deseja remover a task?')) {                
                axios.delete(`http://localhost:3000/tasks/${id}`)
                    .then(() => {
                        this.listAll();
                    })
                    .catch(() => TodoMessageService.error(this.messageId, 'Erro ao remover a task'));
            }
        },
        toggleTaskState(task) {
            axios.put(`http://localhost:3000/tasks/${task.id}`, {
                description: task.description,
                done: !task.done
            })
            .then(() => this.listAll())
            .catch(() => TodoMessageService.error(this.messageId, 'Erro ao mudar o estado da task'));
        },
        listAll() {
            axios.get('http://localhost:3000/tasks')
                .then(result => this.tasks = result.data)
                .catch(() => TodoMessageService.error(this.messageId, 'Erro ao listar as tasks'));
        }
    },
    created() {
        this.listAll();
    }
}
</script>

<style scoped>
.list-container h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 40px;
}
.list-table {
    width: 100%;
    border-collapse: collapse;
}
.list-table th {
    text-align: center;
    padding: 10px;
    background: #524f4f;
    color: #fff
}
.list-table tr:hover {
    background: gray;
}
.list-table td {
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    padding: 10px;
}
.list-table td:last-child {
    border-right: none;
    text-align: center;
}
.list-table td button {
    margin-right: 5px;
}
.list-actions {
    margin-top: 20px;
    padding: 10px;
    
    display: flex;
    justify-content: flex-end;
}
</style>
