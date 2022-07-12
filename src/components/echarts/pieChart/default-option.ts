const BASIC_OPTION = {
  title: {
    text: '',
    subtext: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#10131E',
    textStyle: {
      color: '#EAEAF9'
    }
  },
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    top: '80%',
    textStyle: {
      color: '#ABABD0',
      fontSize: 14
    },
    itemGap: 16,
    icon: 'circle',
    itemWidth: 8,
    height: 300
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['35%', '45%'],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: [],
      label: {
        color: '#ABABD0',
        show: false
      }
    }
  ]
}

const COLOR_ARRAY = ['#fe883a', '#2d90d1', '#f75981', '#90e2a9']
export {
  BASIC_OPTION,
  COLOR_ARRAY
}
