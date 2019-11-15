<template>
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
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            internalCurrentPage: this.currentPage
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
        }
    },
    computed: {
        isBeginOfPages() {
            return this.currentPage === 1;
        },
        isEndOfPages() {
            return this.currentPage === this.pages;
        }   
    }
}
</script>

<style scoped>
.pagination-control {
    display: inline-block;
    margin: 0 10px;
}
</style>