const BASIC_OPTION = {
  title: {
    text: '',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#1F2435',
    borderColor: '#353c53',
    textStyle: {
      color: '#E3E8FA'
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [{
    data: [],
    type: 'line',
    barWidth: 20,
    label: {
      color: '#E3E8FA',
      show: false
    }
  }],
  backgroundColor: 'transparent'
}

const COLOR_ARRAY = [
  { background: 'rgba(63,164,255,0.15)', border: '#3FA4FE' },
  { background: 'rgba(255,202,129,0.15)', border: '#FFCD7A' },
  { background: 'rgba(255,89,123,0.15)', border: '#B14966' }
]
export {
  BASIC_OPTION,
  COLOR_ARRAY
}
