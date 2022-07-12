<script setup lang="ts">
import { GlobalStore } from './store/index'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const globalStore = GlobalStore()
const i18nLocale = computed((): any => {
  return globalStore.language === 'zh' ? zhCN : enUS
})
const loading = globalStore.loading
</script>

<template>
  <a-config-provider :locale="i18nLocale">
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
