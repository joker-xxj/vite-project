<script setup lang="ts">
// import { getInfo } from '@/api/common'
// import { loanAnalysisDetail } from '@/service/modules/api'
import { getCurrentInstance } from 'vue'

const currentInstance = getCurrentInstance()
const { $http } = currentInstance.appContext.config.globalProperties

defineProps<{ msg: string }>()
const count = ref(0)
onMounted(() => {
  const param = {
    lastTime: '2022-07-05',
    productId: 'vt_002501',
    projectId: 'WS0012200001',
    type: 'PRODUCT'
  }
  $http.loanAnalysisDetail(param).then(res => {
    console.log(res)
  })
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <a-date-picker
    show-time
    placeholder="Select Time"
  />
  <p>
    Recommended IDE setup:
    <a
      href="https://code.visualstudio.com/"
      target="_blank"
    >VS Code</a>
    +
    <a
      href="https://github.com/johnsoncodehk/volar"
      target="_blank"
    >Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
    >
      Vite Docs
    </a>
    |
    <a
      href="https://v3.vuejs.org/"
      target="_blank"
    >Vue 3 Docs</a>
  </p>

  <a-button
    type="primary"
    @click="count++"
  >
    count is: {{ count }}
  </a-button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style lang="scss" scoped>
a {
  color: $color;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
