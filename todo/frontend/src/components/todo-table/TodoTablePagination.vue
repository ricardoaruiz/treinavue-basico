<template>
    <div class="pagination-container">
        <div class="pagination-pages">
            <span>Registros por páginas:</span>
            <select 
                v-model="internalPageSize" 
                @change="changePageSize"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="0">todos</option>
            </select>
        </div>

        <div>
            <TodoButton 
                icon="angle-left" 
                type="circle" 
                :disabled="disabled || isBeginOfPages" 
                @onClick="previwesPage" 
                size="small"
            />
            <TodoButton 
                icon="angle-double-left" 
                type="circle" 
                :disabled="disabled || isBeginOfPages" 
                @onClick="firstPage" 
                size="small"
            />

            <div class="pagination-control">
                {{internalCurrentPage}} de {{pages}}
            </div>

            <TodoButton
                icon="angle-double-right" 
                type="circle" 
                :disabled="disabled || isEndOfPages" 
                @onClick="lastPage" 
                size="small"
            />
            <TodoButton 
                icon="angle-right" 
                type="circle" 
                :disabled="disabled || isEndOfPages" 
                @onClick="nextPage" 
                size="small"
            />
        </div>
    </div> 
</template>

<script>
export default {
    name: 'TodoTablePagination',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        pages: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            internalCurrentPage: this.currentPage,
            internalPageSize: this.pageSize
        }
    },
    methods: {
        previwesPage() {
            this.internalCurrentPage--;
            this.$emit('update:currentPage', this.internalCurrentPage);
        },
        firstPage() {
            this.internalCurrentPage = 1;
            this.$emit('update:currentPage', this.internalCurrentPage);
        },
        lastPage() {
            this.internalCurrentPage = this.pages;
            this.$emit('update:currentPage', this.internalCurrentPage);
        },
        nextPage() {
            this.internalCurrentPage++;
            this.$emit('update:currentPage', this.internalCurrentPage);
        },
        changePageSize() {
            this.$emit('update:pageSize', parseInt(this.internalPageSize));
        }
    },
    computed: {
        isBeginOfPages() {
            return this.internalCurrentPage === 1;
        },
        isEndOfPages() {
            return this.internalCurrentPage === this.pages;
        }   
    }
}
</script>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.pagination-control {
    display: inline-block;
    margin: 0 10px;
}
.pagination-pages {
    display: inline-block;
    margin-right: 15px;
}
.pagination-pages span {
    margin-right: 10px;
}
.pagination-pages select {
    padding: 5px;
    border: 1px solid var(--gray-soft-color);
    border-radius: 4px;
    font-family: 'Roboto';
    font-size: .9rem;
    outline: none;
}
</style>