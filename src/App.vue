<script setup lang="ts">
import { GlobalStore } from './store/index'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const globalStore = GlobalStore()
const loading = globalStore.loading
const locale = computed((): any => {
  return globalStore.language === 'en' ? enUS : zhCN
})
const i18n = useI18n()
watch(locale, val => {
  i18n.locale.value = val.locale
})

onBeforeMount(() => {
  i18n.locale.value = globalStore.language
})
</script>

<template>
  <a-config-provider :locale="locale">
    <a-spin
      :spinning="loading"
      tip="loading..."
    >
      <router-view />
    </a-spin>
  </a-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
