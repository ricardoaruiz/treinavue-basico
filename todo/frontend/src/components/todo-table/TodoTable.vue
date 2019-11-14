<template>
  <div class="todo-table-container">

    <TodoInput id="todo-search" 
                :value.sync="searchTerm" 
                :isSearch="true"
    />

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
                <tr v-for="(item, itemIndex) in internalItems" :key="`tr_${itemIndex}`" @click.stop="rowClicked(item)">
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

        <!-- Paginação -->
        <tfoot v-if="paginated">
            <tr>
                <td :colspan="fields.length" class="todo-table-footer">
                    <div class="todo-table-pagination">
                        <TodoButton icon="angle-left" 
                                    type="circle" 
                                    :disabled="searched || isBeginOfPages" 
                                    @onClick="previwesPage" 
                                    size="small"
                        />
                        <TodoButton icon="angle-double-left" 
                                    type="circle" 
                                    :disabled="searched || isBeginOfPages" 
                                    @onClick="firstPage" 
                                    size="small"
                        />

                        <div class="pagination-control">{{currentPage}} de {{pages}}</div>

                        <TodoButton icon="angle-double-right" 
                                    type="circle" 
                                    :disabled="searched || isEndOfPages" 
                                    @onClick="lastPage" 
                                    size="small"
                        />
                        <TodoButton icon="angle-right" 
                                    type="circle" 
                                    :disabled="searched || isEndOfPages" 
                                    @onClick="nextPage" 
                                    size="small"
                        />   
                    </div>         
                </td>
            </tr>
        </tfoot>
    </table>

  </div>
</template>

<script>
import TodoInput from '@/components/todo-input/TodoInput';

export default {
    components: { TodoInput },
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
        },
        paginated: {
            type: Boolean,
            default: false
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            searchTerm: '',
            internalItems: this.items,
            currentPage: 1,
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.items.length / this.pageSize);
        },
        searched() {
            return this.searchTerm != '';
        },
        isBeginOfPages() {
            return this.currentPage == 1;
        },
        isEndOfPages() {
            return this.currentPage === this.pages;
        }
    },
    watch: {
        items() {
            this.updateData();
        },
        searchTerm() {
            this.search();
        },
        currentPage() {
            this.updateData();
        }
    },
    methods: {
        updateData() {
            let end = this.currentPage * this.pageSize;
            let begin = (this.currentPage * this.pageSize) - this.pageSize;
            
            this.internalItems = this.items.slice(begin, end);
        },
        search() {
            this.searchTerm.length === 0
                ? this.updateData()
                : this.internalItems = this.items.filter(item => {
                    for(let prop in item) {
                        return new String(item[prop]).toLowerCase()
                            .includes(this.searchTerm.toLowerCase());
                    }
                })
        },
        rowClicked(item) {
            this.$emit('onRowClick', item);
        },
        nextPage() {
            this.currentPage++;
        },
        previwesPage() {
            this.currentPage--;
        },
        firstPage() {
            this.currentPage = 1;
        },
        lastPage() {
            this.currentPage = this.pages;
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
}
.todo-table thead th {    
    text-align: center;
    padding: 10px;
    background: var(--table-th-color);
    color: var(--white-color);
    border-right: 1px solid var(--table-border-color);
}
.todo-table thead th:first-child {
    border-left: 1px solid var(--table-th-color);
}
.todo-table thead th:last-child {
    border-right: 1px solid var(--table-th-color);
}
.todo-table tbody tr:hover {
    background: var(--table-tr-hover-color);
}
.todo-table td {
    border-bottom: 1px solid var(--table-border-color);
    border-right: 1px solid var(--table-border-color);
    padding: 10px;
}
.todo-table td:last-child {
    border-right: none;
    text-align: center;
}
.todo-table td button {
    margin-right: 5px;
}
.todo-table-nodata {
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
}
.todo-table-footer {
    background: var(--gray-light-color);
}

/* Paginacao */
.todo-table-pagination button {
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 1.1rem;
    outline: none;
    background: var(--btn-color);
    color: var(--btn-font-color);
}
.todo-table-pagination button:hover {  
    background: var(--btn-color-hover);
    cursor: pointer;
}
.todo-table-pagination button:active {  
    background: var(--btn-color-active);
}
.todo-table-pagination button:disabled {  
    background: var(--btn-color-disabled);
}
.todo-table-pagination .pagination-control {
    display: inline-block;
    margin: 0 10px;
}
</style>