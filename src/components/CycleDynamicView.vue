<script>
import Vue from 'vue'

const cycle = (createElement, direction, data, context) => {
  const element = []
  if (data?.length > 0) {
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
        }, cycle(createElement, item.direction, item.children, context))]))
      } else {
        element.push(createElement('div', {
          class: 'dynamic-windows-item',
          style: {
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${item.width}px`,
            height: `${item.height}px`
          }
        }, [createElement('a-date-picker')]))
      }

      if (index < data.length - 1) {
        if (direction === 'horizontal') {
          element.push(createElement('div', {
            class: 'dynamic-windows-item',
            style: {
              left: `${Number(data[index].left)}px`,
              top: `${Number(data[index].top) + Number(data[index].height)}px`,
              width: direction === 'horizontal' ? '100%' : '4px',
              height: direction === 'vertical' ? '100%' : '4px',
              background: 'red',
              cursor: 'ns-resize'
            },
            domProps: {
              draggable: false
            },
            on: {
              mousedown: () => {
                window.moveType = 'vertical'
                window.moveItemVerticalIndex = index
                window.moveItemVertical = item
                window.moveItemVerticalAfter = data[index + 1]
              }
            }
          }, null))
        } else {
          element.push(createElement('div', {
            class: 'dynamic-windows-item',
            style: {
              left: `${Number(data[index].left) + Number(data[index].width)}px`,
              top: `${Number(data[index].top)}px`,
              width: direction === 'horizontal' ? '100%' : '4px',
              height: direction === 'vertical' ? '100%' : '4px',
              background: 'red',
              cursor: 'ew-resize'
            },
            on: {
              mousedown: () => {
                window.moveType = 'horizontal'
                window.moveItemHorizontalIndex = index
                window.moveItemHorizontal = item
                window.moveItemHorizontalAfter = data[index + 1]
              }
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
  render: (createElement, context) => {
    if (context.props.data) {
      // const temp = JSON.parse(JSON.stringify(context.props.data))
      const temp = context.props.data
      return createElement('div', {
        class: 'dynamic-windows-stage',
        on: {
          mousemove: (e) => {
            if (window.moveType === 'horizontal') {
              if (window.moveItemHorizontal) {
                window.moveItemHorizontal.width = e.clientX - Number(window.moveItemHorizontal.left)
                window.moveItemHorizontalAfter.width = Number(window.moveItemHorizontalAfter.left) + Number(window.moveItemHorizontalAfter.width) - e.clientX - 4 * (window.moveItemHorizontalIndex + 1)
                window.moveItemHorizontalAfter.left = e.clientX + 4 * (window.moveItemHorizontalIndex + 1)
                // console.log(context.moveItem.clientY, e.clientY, context.moveItem.top)
                // console.log(context)
                context.parent.$store.commit('updateDynamicData', context.props.data)
              }
            } else if (window.moveType === 'vertical') {
              if (window.moveItemVertical) {
                window.moveItemVertical.height = e.clientY - Number(window.moveItemVertical.top)
                window.moveItemVerticalAfter.height = Number(window.moveItemVerticalAfter.top) + Number(window.moveItemVerticalAfter.height) - e.clientY - 4 * (window.moveItemVerticalIndex + 1)
                window.moveItemVerticalAfter.top = e.clientY + 4 * (window.moveItemVerticalIndex + 1)
                // console.log(context.moveItem.clientY, e.clientY, context.moveItem.top)
                // console.log(context)
                context.parent.$store.commit('updateDynamicData', context.props.data)
              }
            }
          },
          mouseup: () => {
            window.moveItemVertical = null
            window.moveItemHorizontal = null
            window.moveItemHorizontalIndex = 0
            window.moveItemVerticalIndex = 0
            // console.log(e)
          }
        }
      }, cycle(createElement, temp.direction, temp.children, context))
    } else {
      return null
    }
  },
  props: {
    data: {
      // type: Object,
      // required: true
    }
  },
  data () {
    return {
      moveItem: null
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
