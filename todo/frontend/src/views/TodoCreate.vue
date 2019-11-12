<template>
    <div class="container">

        <Message :value="errorMessage" />

        <h2>Todo insert / update</h2>

        <form @submit.prevent="saveTask">
            <label for="description">Descrição</label>    
            <input type="text" id="description" v-model="task.description">

            <div class="form-actions">
                <TodoButton label="Confirmar" icon="check"/>
                <TodoButton label="Voltar" @onClick="backToList" icon="arrow-left"/>
            </div>
        </form>    
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        id: Number
    },
    data() {
        return {
            errorMessage: '',
            task: {
                description: ''
            }
        }
    },
    methods: {
        saveTask() {
            if (!this.task.description) {
                alert('Descrição não informada')
                return;
            }

            if (!this.id) {
                axios.post('http://localhost:3000/tasks', {
                        description: this.task.description,
                        done: false
                    })
                    .then(() => this.$router.push({ name: 'todo-list' }))
                    .catch(error => this.errorMessage = error.message);
            } else {
                axios.put(`http://localhost:3000/tasks/${this.id}`, {
                    description: this.task.description,
                    done: false                    
                })
                .then(() => this.$router.push({ name: 'todo-list' }))
                .catch(error => this.errorMessage = error.message);
            }
        },
        backToList() {
            this.$router.push({ name: 'todo-list'})
        }
    },
    created() {
        if (this.id) {
            axios.get(`http://localhost:3000/tasks/${this.id}`)
                .then(result => this.task.description = result.data.description)
                .catch(error => this.errorMessage = error.message);
        }
    }
}
</script>

<style scoped>
.container {

}
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
