<template>
  <blank-page v-if="isSeriesEmpty" />
  <line-bar-chart v-else ref="lineBar" />
</template>
<script setup lang="ts">
import lineBarChart from './line-bar-chart.vue'
import blankPage from '@/components/blank-page.vue'
import { ECharts } from 'echarts'
import { BASIC_OPTION } from './default-option'
import { COLOR_ARRAY } from '../color'
import { isEmpty, merge } from 'lodash'

const prop = defineProps({
  seriesData: {
    type: Object,
    required: true,
    default: () => {}
  },
  extraOption: {
    type: Object,
    default: () => ({})
  }
})

const isSeriesEmpty = computed(() => isEmpty(prop.seriesData.xAxis.data))

/* 声明echarts实例 */
interface ChartProps {
  [key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
  initChart: (params: any) => ECharts;
}

const dataScreen: ChartProps = reactive({
  chart: null
})
const lineBar = ref<ChartExpose>()

const seriesOption = () => {
  return merge(
    {},
    BASIC_OPTION,
    { color: COLOR_ARRAY },
    prop.seriesData,
    prop.extraOption
  )
}

/* 初始化 echarts */
const initCharts = (): void => {
  dataScreen.chart = lineBar.value?.initChart(seriesOption()) as ECharts
}

const updateCharts = () => {
  dataScreen.chart?.setOption(seriesOption(), true)
}
watch(prop.seriesData, () => {
  updateCharts()
}, { immediate: true })

onMounted(() => {
  /* 初始化echarts */
  initCharts()
  // 为浏览器绑定事件
  window.addEventListener('resize', resize)
})

/* 浏览器监听 resize 事件 */
const resize = () => {
  // 使用了 scale 的echarts其实不需要需要重新计算缩放比例
  dataScreen.chart?.resize()
}

/* 销毁时触发 */
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>
