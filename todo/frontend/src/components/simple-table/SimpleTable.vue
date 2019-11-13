<template>
  <div>
    <table class="list-table">
        <thead>
            <th v-for="field in fields" :key="field">
                {{field}}
            </th>
        </thead>
        <tbody>
            <tr v-for="(item, rowIndex) in items" :key="rowIndex">
                <template v-for="field in fields">
                    <td v-if="typeof $scopedSlots[field] !== 'undefined'" :key="field">
                        <slot :name="field" :field="field" :item="item"></slot>
                    </td>
                    <td v-else :key="field">
                        {{item[field]}}
                    </td>
                </template>
            </tr>
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
        }
    }
}
</script>

<style>
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
</style>