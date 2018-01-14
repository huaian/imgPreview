<template>
  <div ref='container'>
    <div v-pre class='macro macro1' v-on:click='showMessage($event)'>
      <div v-pre class='macro macro2' v-on:click='showMessage($event)'>
        macro2
        <div v-pre class='macro macro3' v-on:click='showMessage($event)'>
          macro3
        </div>
        <img data-props="macro3"></img>
      </div>
      <img data-props="macro2"></img>
      macro1
    </div>
    <img data-props="macro1"></img>
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import Macro from './Macro'
import Vue from 'vue'
export default {
  mounted () {
    this.parse({
      container: this.$refs.container
    })
  },
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    // escapeParse ({
    //   container
    // }) {
    //   $(container).children().find('[v-on:click]').each((item) => {
    //     let clickHandler = $(item).attr('v-on:click')
    //     $(item).attr('_v-on:click', clickHandler)
    //     $(item).removeAttr('v-on:click')
    //   })
    // },
    parse ({container}) {
      _.reverse(Array.from($(container).find('img'))).forEach(function(element, index) {
        if (index > 0) {
          return false
        }
        let prev = $(element).prev()[0]
        console.log(prev)
        $(prev).removeAttr('v-pre')
        let propsData = $(element).data('props')
        let constructor = Vue.extend(Macro)
        let macroComponent = new constructor({
          el: prev,
          propsData: {
            message: propsData
          }
        })
        this.parse ({
          container: macroComponent.$el
        })
      }, this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
