<template>
  <div class="todo-table-container">

    <input  type="text" 
            placeholder="Busca"
            class="todo-table-search" 
            v-model="searchTerm"
            v-if="searchable">

    <table class="todo-table">
        <thead>
            <th v-for="field in fields" :key="field.name">
                <slot name="table-col" :field="field">
                    {{field.label}}
                </slot>
            </th>
        </thead>
        <tbody>
            <template v-if="internalItems.length">
                <tr v-for="(item, itemIndex) in internalItems" :key="`tr_${itemIndex}`">
                    <td v-for="(field, fieldIndex) in fields" :key="`td_${field.name}_${itemIndex}_${fieldIndex}`">
                        <slot name="table-row" :field="field.name" :item="item" :value="item[field.name]">
                            {{item[field.name]}}
                        </slot>
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td :colspan="fields.length" class="todo-table-nodata">
                        Não há dados
                    </td>
                </tr>
            </template>
        </tbody>
    </table>

  </div>
</template>

<script>
export default {
    props: {
        fields: {
            type: Array,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        searchable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            searchTerm: '',
            internalItems: this.items
        }
    },
    watch: {
        items() {
            this.internalItems = this.items
        },
        searchTerm() {
            this.search();
        }
    },
    methods: {
        search() {
            return this.searchTerm.length === 0
                ? this.internalItems = this.items
                : this.internalItems = this.internalItems.filter(item => {
                    for(let prop in item) {
                        return item[prop].toLowerCase()
                            .includes(this.searchTerm.toLowerCase());
                    }
                })
        }
    }
}
</script>

<style>
.todo-table-container {
    display: grid;
}
.todo-table {
    border-collapse: collapse;
    border: 1px solid;
}
.todo-table thead th {    
    text-align: center;
    padding: 10px;
    background: #524f4f;
    color: #fff;
    border-right: 1px solid #dad2d2;
}
.todo-table thead th:first-child {
    border-left: 1px solid #524f4f;
}
.todo-table thead th:last-child {
    border-right: 1px solid #524f4f;
}
.todo-table tr:hover {
    background: gray;
}
.todo-table td {
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    padding: 10px;
}
.todo-table td:last-child {
    border-right: none;
    text-align: center;
}
.todo-table td button {
    margin-right: 5px;
}
.todo-table-search {
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 1rem;
    font-weight: bold;
    background-image: url('./assets/search-solid.svg');
    background-repeat: no-repeat;
    background-position: center right 10px;
    background-size: 16px 16px;
    padding-right: 30px;
}
.todo-table-nodata {
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
}
</style>