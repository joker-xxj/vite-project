<template>
  <div class="hello">
    <div class="item-right">
      <div class="echarts-title">Gitee / GitHub 访问量占比</div>
      <div class="book-echarts">
        <Pie :seriesData="pieData" />
      </div>
    </div>
    <div class="item-right">
      <div class="echarts-title">数据来源</div>
      <div class="book-echarts">
        <line-bar-chart :seriesData="barSeries" :extra-option="extraOption" />
      </div>
    </div>

  </div>
  <a-button @click="test" type="primary">
    切换
  </a-button>
</template>

<script setup lang="ts">
import Pie from '@/components/echarts/pieChart/index.vue'
import lineBarChart from '@/components/echarts/lineBarChart/index.vue'

let pieData = reactive([
  { value: 5000, name: 'Gitee 访问量' },
  { value: 5000, name: 'GitHub 访问量' },
  { value: 5000, name: 'GitLab 访问量' }
])
let barSeries = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [150, 230, 224, 218, 135, 147, 260],
    name: '人数',
    type: 'bar'
  }]
})
let extraOption = reactive({
  color: '#3282E2',
  legend: {
    orient: 'horizontal',
    type: 'scroll'
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#10131E',
    textStyle: {
      color: '#EAEAF9'
    }
  }
})
const isLine = ref(false)

const test = () => {
  isLine.value = !isLine.value
  barSeries.series[0].type = isLine.value ? 'line' : 'bar'
}
</script>

<style lang="less" scoped>
.hello {
  height: 100%;
  display: flex;
  justify-content: center;
  .item-right {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 430px;
    margin-right: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 25px;
    .echarts-title {
      padding: 15px 20px;
      font-family: "PingFang SC";
      font-size: 18px;
      font-weight: 600;
      border-bottom: 1px solid #e5e7eb;
    }
    .book-echarts {
      flex: 1;
      width: 100%;
    }
  }
  .curve-echarts {
      width: 100%;
      height: 90%;
      padding-left: 10px;
    }
}
</style>
