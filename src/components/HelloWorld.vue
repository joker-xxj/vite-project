<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { useI18n } from 'vue-i18n'
import { Dayjs } from 'dayjs'

const globalStore = GlobalStore()
const i18n = useI18n()
const setLanguage = (lang:string) => {
  i18n.locale.value = lang
  globalStore.updateLanguage(lang)
}
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

onMounted(() => {
  // $http.loanAnalysisDetail(param).then(res => {
  //   console.log(res)
  // })
})

const value = ref<Dayjs>()

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode)
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
  <img
    alt="Vue logo"
    src="@/assets/imgs/logo.png"
  >
  <a-button @click="setLanguage('zh')">
    中文
  </a-button>
  <a-button @click="setLanguage('en')">
    English
  </a-button>
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

  <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange">
    <template #headerRender="{ value: current, type, onChange, onTypeChange }">
      <div style="padding: 10px">
        <div style="margin-bottom: 10px">Custom header</div>
        <a-row type="flex" justify="space-between">
          <a-col>
            <a-radio-group size="small" :value="type" @change="e => onTypeChange(e.target.value)">
              <a-radio-button value="month">Month</a-radio-button>
              <a-radio-button value="year">Year</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col>
            <a-select
              size="small"
              :dropdown-match-select-width="false"
              class="my-year-select"
              :value="String(current.year())"
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
          </a-col>
          <a-col>
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
