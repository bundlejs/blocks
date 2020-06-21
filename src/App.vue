<template>
  <a-config-provider :locale="lang">
    <router-view/>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import moment from 'moment'
// import 'moment/locale/zh-cn'

export default {
  name: 'app',
  data () {
    return {
      lang: zhCN
      // moment
    }
  },
  components: {}
}
</script>

<style>
</style>
