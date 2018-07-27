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
        const settings = [
          {
            len: 3,
            img: 40
          },
          {
            len: 7,
            img: 70
          }
        ]
        const WIDTH = document.body.clientWidth || document.documentElement.clientWidth
        const setting = WIDTH < 1000 ? settings[0] : settings[1]
        const pData = []
        const avators = []
        data.forEach(val => {
          const keys = pData.map(val => val.name)
          const value = []
          let k = 0
          val.peoples.forEach((val, i) => {
            value.push(val)
            if ((k+1) % setting.len === 0) {
              value.push('<br />')
            }
            k++
          })
          pData.push({
            name: val.city,
            value: [...val.geo, value]
          })
          avators.push('image://https://raw.githubusercontent.com/itagn/others/master/map/img/地址.png')
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
            symbolSize: `${width / setting.img}`,
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
          backgroundColor: '#ddd',
          tooltip : {
            trigger: 'item',
            formatter (params) {
              return params.name + '： <br /> ' + params.value[2]
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