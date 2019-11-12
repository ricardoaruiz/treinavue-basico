<template>
    <div class="list-container">

        <Message :value="errorMessage" />

        <h2>Todo list</h2>
        <table class="list-table">
            <thead>
                <th>Descrição</th>
                <th>Finalizado</th>
                <th>Ações</th>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{task.description}}</td>
                    <td>{{task.done ? "Sim" : "Não"}}</td>
                    <td>
                        <TodoButton @onClick="gotoUpdate(task.id)" icon="edit" type="circle"/>

                        <TodoButton v-if="task.done" @onClick="removeTask(task.id)" icon="trash" type="circle"/>

                        <TodoButton @onClick="toggleTaskState(task)" 
                                :icon="task.done ? 'undo' : 'check'"
                                type="circle"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="list-actions">
            <TodoButton label="Adicionar" icon="plus" @onClick="gotoCreate"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            errorMessage: '',
            tasks: []
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
                        //const deletedTask = this.tasks.find(task => task.id === id);
                        //this.tasks.splice(this.tasks.indexOf(deletedTask), 1);
                    })
                    .catch(error => this.errorMessage = error.message);
            }
        },
        toggleTaskState(task) {
            axios.put(`http://localhost:3000/tasks/${task.id}`, {
                description: task.description,
                done: !task.done
            })
            .then(() => {
                this.listAll()
                // task.done = !task.done;
            });
        },
        listAll() {
            axios.get('http://localhost:3000/tasks')
                .then(result => {
                    this.tasks = result.data
                });
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
