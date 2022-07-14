<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { CalendarMode } from 'ant-design-vue/es/calendar/generateCalendar'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/zh-cn'
import localeData from 'dayjs/plugin/localeData'

const globalStore = GlobalStore()

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
const date = ref<Dayjs>()

onMounted(() => {
  // $http.loanAnalysisDetailApi(param).then(res => {
  //   console.log(res)
  // })
  console.log(globalStore.language)

  dayjs.extend(localeData)
  date.value = dayjs(`${new Date()}`).locale(globalStore.language)
})
const locale = ref(globalStore.language)
watch(locale, (val) => {
  globalStore.updateLanguage(val)
  const newDate = date.value?.toString()
  date.value = dayjs(newDate).locale(globalStore.language)
})
const onPanelChange = (date: Dayjs | string, mode: CalendarMode) => {
  console.log(date, date, mode, '===')
}

const getMonths = (value: Dayjs) => {
  const localeData = value.localeData()
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(localeData.monthsShort(value.month(i)))
  }

  return months
}

const getYears = (value: Dayjs) => {
  const year = value.year()
  const years = []
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i)
  }
  return years
}

</script>

<template>
  <div>
    <img
      alt="Vue logo"
      src="@/assets/imgs/logo.png"
    >

  </div>
  <a-radio-group v-model:value="locale">
    <a-radio-button key="en" value="en">English</a-radio-button>
    <a-radio-button key="zh" value="zh-cn">中文</a-radio-button>
  </a-radio-group>
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
  <a-calendar v-model:value="date" :fullscreen="false" @panel-change="onPanelChange">
    <template #headerRender="{ value: current, type, onChange, onTypeChange }">
      <div style="padding: 10px">
        <div style="margin-bottom: 10px">Custom header</div>
        <a-row type="flex" justify="space-between">
          <a-col>
            <a-radio-group size="small" :value="type" @change="e => onTypeChange(e.target.value)">
              <a-radio-button value="month">{{ $t('home.Month') }}</a-radio-button>
              <a-radio-button value="year">{{ $t('home.Year') }}</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col>
            <double-left-outlined
              @click="() => {
                onChange(date?.subtract(1,'year'));
              }" />
            <a-select
              size="small"
              :dropdown-match-select-width="false"
              class="my-year-select"
              :value="current.year()"
              valueFormat
              @change="
                newYear => {
                  onChange(current.year(newYear));
                }
              "
            >
              <a-select-option
                v-for="val in getYears(current)"
                :key="String(val)"
                class="year-item"
              >
                {{ val }}
              </a-select-option>
            </a-select>
            <double-right-outlined
              @click="() => {
                onChange(date?.add(1,'year'));
              }" />
          </a-col>
          <a-col>
            <double-left-outlined
              @click="() => {
                onChange(date?.subtract(1,'month'));
              }" />
            <a-select
              size="small"
              :dropdown-match-select-width="false"
              :value="String(current.month())"
              @change="
                selectedMonth => {
                  onChange(current.month(parseInt(String(selectedMonth), 10)));
                }
              "
            >
              <a-select-option
                v-for="(val, index) in getMonths(current)"
                :key="String(index)"
                class="month-item"
              >
                {{ val }}
              </a-select-option>
            </a-select>
            <double-right-outlined
              @click="() => {
                onChange(date?.add(1,'month'));
              }" />
          </a-col>
        </a-row>
      </div>
    </template>
  </a-calendar>

</template>

<style lang="less" scoped>
p {
  color: @color;
}

h1, h2 {
  font-weight: normal;
}

</style>
