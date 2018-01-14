<script>
import $ from 'jquery'
export default {
  name: 'HelloWorld',
  data: () => {
    return {}
  },
  props: ['message'],
  methods: {
    showMessage (event) {
      if ($(event.target).parents('.macro').length > 0) {
        alert(this.message)
        event.stopPropagation()
        event.cancelBubble = true
        return false
      }
      alert(this.message)
    }
  }
}
</script>

<style scoped>
</style>
