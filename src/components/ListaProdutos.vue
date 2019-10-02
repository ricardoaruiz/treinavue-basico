<template>
  <article>
    <button @click="contador++">Adicionar {{contador}}</button>
    {{contador}}
  </article>
</template>

<script>
export default {
  name: 'ListaProdutos',
  props: ['produtos','contador']
}
</script>