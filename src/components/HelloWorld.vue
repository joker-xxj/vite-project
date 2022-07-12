<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { useI18n } from 'vue-i18n'
const globalStore = GlobalStore()
const i18n = useI18n()
const setLanguage = (lang:string) => {
  i18n.locale.value = lang
  globalStore.updateLanguage(lang)
}
// const currentInstance = getCurrentInstance()
// const { $http } = currentInstance?.appContext.config.globalProperties
// const param = {
//   lastTime: '2022-07-05',
//   productId: 'vt_002501',
//   projectId: 'WS0012200001',
//   type: 'PRODUCT'
// }

const prop = defineProps({
  msg: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  // $http.loanAnalysisDetail(param).then(res => {
  //   console.log(res)
  // })
})
</script>

<template>
  <img
    alt="Vue logo"
    src="@/assets/imgs/logo.png"
  >
  <a-button @click="setLanguage('zh')">
    中文
  </a-button>
  <a-button @click="setLanguage('en')">
    English
  </a-button>
  <h1>{{ prop.msg }}</h1>
  <h1>{{ $t('home.welcome') }}</h1>
  <a-date-picker
    show-time
    placeholder="Select Time"
  />
  <a-button type="primary">
    <router-link to="/index">跳转</router-link>
  </a-button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

</template>

<style lang="less" scoped>
p {
  color: @color;
}

h1, h2 {
  font-weight: normal;
}

</style>
