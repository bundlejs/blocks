<script>
import Vue from 'vue'

const cycle = (createElement, direction, data) => {
  const element = []
  if (data.length > 0) {
    data.forEach((item, index) => {
      if (item?.children && item?.children.length > 0) {
        element.push(createElement('div', {
          class: 'dynamic-windows-item',
          style: {
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${item.width}px`,
            height: `${item.height}px`
          }
        }, [createElement('div', {
          class: 'dynamic-windows-stage'
        }, cycle(createElement, item.direction, item.children))]))
      } else {
        element.push(createElement('div', {
          class: 'dynamic-windows-item',
          style: {
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${item.width}px`,
            height: `${item.height}px`
          }
        }, null))
      }

      if (index < data.length - 1) {
        if (direction === 'horizontal') {
          console.log(111)
          element.push(createElement('div', {
            class: 'dynamic-windows-item',
            style: {
              left: `${Number(data[index].left)}px`,
              top: `${Number(data[index].top) + Number(data[index].height)}px`,
              width: direction === 'horizontal' ? '100%' : '4px',
              height: direction === 'vertical' ? '100%' : '4px',
              background: 'red'
            }
          }, null))
        } else {
          console.log(data[index].left)
          element.push(createElement('div', {
            class: 'dynamic-windows-item',
            style: {
              left: `${Number(data[index].left) + Number(data[index].width)}px`,
              top: `${Number(data[index].top)}px`,
              width: direction === 'horizontal' ? '100%' : '4px',
              height: direction === 'vertical' ? '100%' : '4px',
              background: 'red'
            }
          }, null))
        }
      }
    })
  }
  return [element]
}

export default Vue.component('cycle-dynamic-view', {
  functional: true,
  render: function (createElement, context) {
    if (context.props.data) {
      const temp = JSON.parse(JSON.stringify(context.props.data))
      return createElement('div', { class: 'dynamic-windows-stage' }, cycle(createElement, temp.direction, temp.children))
    } else {
      return null
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="less" scoped>

.dynamic-windows-item {
  position: absolute;
}

.dynamic-windows-stage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

</style>
