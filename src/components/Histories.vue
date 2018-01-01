<template>
<div id="app-4">
  <ol v-if='histories && histories.length > 0'>
    <li v-for="history in histories" class='note'>{{ history.note }}</li>
    <div v-if='histories.length > 20' class='pagination'></div>
  </ol>
  <div class='empty-hint' v-if='histories.length === 0'>没有历史记录</div>
  <button @click='toggleOpen' class='revert'></button>
</div>
</template>

<script>
/**@description 
 * 
 */
export default {
  name: 'history',
  props: [
    'histories'  // 历史版本列表
  ],
  data () {
    return {
      noteDialogOpen: false
    }
  },
  methods: {
    toggleOpen () {
      this.noteDialogOpen = !this.noteDialogOpen
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
