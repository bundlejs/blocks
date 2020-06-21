<template>
  <div class="dynamic-windows-container">
    <!--    <div class="dynamic-windows-stage">-->

    <CycleDynamicView :data="dynamicData"></CycleDynamicView>

    <!--    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CycleDynamicView from '@/components/CycleDynamicView'

export default {
  name: 'DynamicWindows',
  components: {
    CycleDynamicView
  },
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  mounted () {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    setInterval(() => {
      this.width -= 10
    }, 500)
    this.$store.commit('updateDynamicData', {
      direction: 'horizontal', // horizontal vertical
      children: [{
        direction: 'vertical',
        left: '0',
        top: '0',
        width: this.width,
        height: '96',
        children: []
      }, {
        direction: 'vertical',
        left: '0',
        top: '100',
        width: this.width,
        height: '96',
        children: []
      }, {
        direction: 'vertical',
        left: '0',
        top: '200',
        width: this.width,
        height: '96',
        children: []
      }, {
        direction: 'vertical',
        left: '0',
        top: '300',
        width: this.width,
        height: this.height - 68,
        children: [{
          direction: 'vertical',
          left: '0',
          top: '0',
          width: '200',
          height: this.height - 64,
          children: []
        }, {
          direction: 'vertical',
          left: '204',
          top: '0',
          width: this.width - 400,
          height: this.height - 64,
          children: []
        }, {
          direction: 'vertical',
          left: this.width - 200 + 8,
          top: '0',
          width: '200',
          height: this.height - 64,
          children: []
        }]
      }]
    })
  },
  computed: {
    ...mapState([
      'dynamicData'
    ])
  }
}
</script>

<style lang="less" scoped>
.dynamic-windows-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .dynamic-windows-stage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: aliceblue;
  }
}
</style>
