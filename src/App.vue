<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { GlobalStore } from './store/index'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const globalStore = GlobalStore()
const i18nLocale = computed((): any => {
  if (globalStore.language && globalStore.language === 'zh') return zhCN
  if (globalStore.language === 'en') return enUS
  return ''
})
const setLanguage = (lang:string) => {
  i18n.locale.value = lang
  globalStore.updateLanguage(lang)
}
const loading = globalStore.loading
</script>

<template>
  <a-config-provider :locale="i18nLocale">
    <a-spin
      :spinning="loading"
      tip="loading..."
    >
      <img
        alt="Vue logo"
        src="./assets/logo.png"
      >
      <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
      <a-button @click="setLanguage('zh')">
        中文
      </a-button>
      <a-button @click="setLanguage('en')">
        English
      </a-button>
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
