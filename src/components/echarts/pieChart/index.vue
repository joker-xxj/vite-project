<template>
  <blank-page v-if="isSeriesEmpty" />
  <pie-chart v-else ref="pie" />
</template>
<script setup lang="ts">
import pieChart from './pie-chart.vue'
import blankPage from '@/components/blank-page.vue'
import { ECharts } from 'echarts'
import { BASIC_OPTION, COLOR_ARRAY } from './default-option'
import { isEmpty, merge } from 'lodash'

const prop = defineProps({
  seriesData: {
    type: Array,
    required: true,
    default: () => []
  },
  extraOption: {
    type: Object,
    default: () => ({})
  }
})
const isSeriesEmpty = computed(() => isEmpty(prop.seriesData))

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
const pie = ref<ChartExpose>()

const pieData = () => {
  return merge(
    {},
    BASIC_OPTION,
    { color: COLOR_ARRAY },
    {
      series: [{
        data: prop.seriesData
      }]
    },
    prop.extraOption
  )
}

/* 初始化 echarts */
const initCharts = (): void => {
  dataScreen.chart = pie.value?.initChart(pieData()) as ECharts
}

const updateCharts = () => {
  dataScreen.chart?.setOption(pieData(), true)
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
  Object.values(dataScreen).forEach(chart => {
    chart && chart.resize()
  })
}

/* 销毁时触发 */
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>
