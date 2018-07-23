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
        data.forEach(val => {
          const keys = [...new Set(pData.map(val => val.name))]
          if (!keys.includes(val.city)) {
            pData.push({
              name: val.city,
              value: [...val.geo, [val.username]]
            })
          } else {
            pData.forEach(v => {
              if (v.name === val.city) {
                v.value = [v.value[0], v.value[1], [...v.value[2], val.username]]
              }
            })
          }
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
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: pData,
              symbolSize: 12,
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        abg: {
                            backgroundColor: '#333',
                            width: '100%',
                            align: 'right',
                            height: 22,
                            borderRadius: [4, 4, 0, 0]
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                },
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
          ]
        }
        chart.setOption(option)
      } else {
        alert('没有数据')
      }
    }
  }
}