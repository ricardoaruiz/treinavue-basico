<template>
  <div>
    <table class="list-table">
        <thead>
            <th v-for="field in fields" :key="field.name">
                <slot :name="`field-${field.name}`" :field="field.name" :label="field.label">
                    {{field.label}}
                </slot>
            </th>
        </thead>
        <tbody>
            <tr v-for="(item, itemIndex) in items" :key="`tr_${itemIndex}`">
                <td v-for="(field, fieldIndex) in fields" :key="`td_${itemIndex}-${fieldIndex}`">
                    <slot :name="`item-${field.name}`" :field="field.name" :item="item">
                        {{item[field.name]}}
                    </slot>
                </td>
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