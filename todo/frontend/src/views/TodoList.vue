<template>
    <div class="list-container">

        <TodoMessage :id="messageId" />

        <TodoPageHeader title="Todo list" />
               
        <TodoTable  :fields="fields" 
                    :items="tasks"
                    :searchable="true"
                    @onRowClick="(item) => this.gotoUpdate(item.id)"
                    :paginated="true"
                    :pageSize="5"
            >

            <!-- Opcional usar somente se customizações forem necessárias no header -->
            <template v-slot:table-col="props">
                <template v-if="props.field.name === 'done'">
                    <i class="fa fa-check" />  {{props.field.label}}    
                </template>
                <template v-if="props.field.name === 'actions'">
                    <i class="fa fa-bolt" />  {{props.field.label}}    
                </template>                
                <template v-else>
                    {{props.field.label}}
                </template>
            </template>

            <!-- Opcional usar somente se customizações forem necessárias nos dados -->
            <template v-slot:table-row="props">
                <template v-if="props.field === 'done'">
                    {{props.item.done ? 'Sim' : 'Não'}}    
                </template>

                <template v-else-if="props.field === 'actions'">
                    <TodoButton v-if="!props.item.done" 
                                @onClick="gotoUpdate(props.item.id)" 
                                icon="edit" 
                                type="circle"
                                tooltip="Alterar"/>

                    <TodoButton v-if="props.item.done" 
                                @onClick="removeTask(props.item.id)" 
                                icon="trash" 
                                type="circle"
                                tooltip="Excluir"/>                            

                    <TodoButton @onClick="toggleTaskState(props.item)" 
                                :icon="props.item.done ? 'undo' : 'check'"
                                type="circle"
                                :tooltip="props.item.done ? 'Reabrir' : 'Finalizar'"/>
                </template>

                <template v-else>
                    {{props.value}}
                </template>
            </template>
            
        </TodoTable>

        <div class="list-actions">
            <TodoButton label="Adicionar" icon="plus" @onClick="gotoCreate"/>
        </div>

    </div>
</template>

<script>
import TodoService from '../services/todo-service.js';
import TodoMessageService from '@/components/todo-message/TodoMessageService';

import TodoPageHeader from '@/components/todo-page-header/TodoPageHeader';
import TodoTable from '@/components/todo-table/TodoTable';

export default {
    components: { TodoPageHeader, TodoTable },
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
                TodoService.delete(id)
                    .then(() => this.listAll())
                    .catch(() => TodoMessageService.error(this.messageId, 'Erro ao remover a task'));
            }
        },
        toggleTaskState(task) {
            TodoService.updateState(task)
                .then(() => this.listAll())
                .catch(() => TodoMessageService.error(this.messageId, 'Erro ao mudar o estado da task'));
        },
        listAll() {
            TodoService.listAll()
                .then(tasks => this.tasks = tasks)
                .catch(() => TodoMessageService.error(this.messageId, 'Erro ao listar as tasks'));
        }
    },
    created() {
        this.listAll();
    }
}
</script>

<style scoped>
.list-container {
    display: grid;
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 20px;
}
.list-actions {
    margin-top: 20px;
    padding: 10px;
    
    display: flex;
    justify-content: flex-end;
}
.list-actions button {
    width: 150px;
}
</style>
