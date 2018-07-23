import Echarts from 'echarts'
import chinaJson from 'echarts/map/json/china.json'
export default {
  name: 'VueClassmatesMap',
  props: {
    pData: {
      type: Object,
      default: {
        data: [],
        node: {
          className: ''
        }
      }
    }
  },
  mounted () {
    this.createdCanvas()
  },
  methods: {
    createdCanvas () {
      const { className, theme } = this.pData.node
      const dom = document.querySelector(`${className} .classmates-map`)
      Echarts.registerMap('china', chinaJson)
      const chart = Echarts.init(dom)
      this.chartLoad(chart)
      this.initChart(chart)
    },
    chartLoad (chart) {
      this.$emit('chart', chart)
    },
    initChart (chart) {
      const { data } = this.pData
      if (data.length) {
        const pData = []
        const avators = []
        data.forEach(val => {
          const keys = [...new Set(pData.map(val => val.name))]
          if (!keys.includes(val.city)) {
            pData.push({
              name: val.city,
              value: [...val.geo, [val.username]]
            })
            avators.push(val.avator)
          } else {
            pData.forEach(v => {
              if (v.name === val.city) {
                v.value = [v.value[0], v.value[1], [...v.value[2], val.username]]
              }
            })
          }
        })
        const series = []
        const width = document.body.clientWidth
        pData.forEach((val, i) => {
          const obj = {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [val],
            symbolSize: 12,
            symbol: avators[i],
            symbolSize: `${width / 50}`,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
          series.push(obj)
        })
        const option = {
          backgroundColor: '#404a59',
          tooltip : {
            trigger: 'item',
            formatter (params) {
              return params.name + ' : ' + params.value[2]
            },
            textStyle: {
              textBorderColor: '#fff'
            }
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#323c48',    //  地图上的默认颜色
                borderColor: '#111'   //  地图之外的颜色
              },
              emphasis: {
                areaColor: '#2a333d'   //  鼠标移到地图上的颜色
              }
            }
          },
          series
        }
        chart.setOption(option)
      } else {
        alert('没有数据')
      }
    }
  }
}