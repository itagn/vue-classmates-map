import Echarts from 'echarts/lib/echarts'
import './china.js'
export default {
  name: 'VueClassmatesMap',
  props: {
    pData: {
      type: Object,
      default: {
        data: [],
        node: {
          className: '',
          theme: ''
        }
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.createdCanvas()
  },
  methods: {
    createdCanvas () {
      const { className, theme } = this.pData.node
      const dom = document.querySelector(`${className} .classmates-map`)
      this.chart = Echarts.init(dom, theme)
      this.chartLoad()
      this.initChart()
    },
    chartLoad () {
      this.$emit('chart', this.chart)
    },
    initChart () {
      const { data } = this.pData
      console.log(data)
      if (data.length) {
        const option = {
          title : {
            text: '同学录',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#fff'
            }
          },
          tooltip : {
            trigger: 'item'
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
                areaColor: '#eee',    //  地图上的默认颜色
                borderColor: '#999'   //  地图之外的颜色
              },
              emphasis: {
                areaColor: '#334455'   //  鼠标移到地图上的颜色
              }
            }
          },
          series: []
        }
        this.chart.setOption(option)
      } else {
        alert('没有数据')
      }
    }
  }
}