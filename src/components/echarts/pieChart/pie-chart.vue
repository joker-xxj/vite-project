<template>
  <!-- Gitee / GitHub 访问量占比 -->
  <div class="echarts" id="pie" />
</template>
<script setup lang="ts" name="pie">
import { ECharts, init } from 'echarts'

const initChart = (data: any): ECharts => {
  const echartsBox = document.getElementById('pie') as HTMLElement
  const echarts: ECharts = init(echartsBox)
  echarts.setOption(data)
  return echarts
}

defineExpose({
  initChart
})
</script>

<style lang="less" scoped>
.echarts {
width: 100%;
height: 100%;
}
</style>
