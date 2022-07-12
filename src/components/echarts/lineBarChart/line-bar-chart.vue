<template>
  <div class="echarts" id="lineBar" />
</template>
<script setup lang="ts" name="cure">
import { ECharts, init } from 'echarts'
const initChart = (data: any): ECharts => {
  const echartsBox = document.getElementById('lineBar') as HTMLElement
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
