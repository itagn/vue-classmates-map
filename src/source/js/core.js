import "./china.js"
import Echarts from 'echarts/lib/echarts'
export default {
  name: "VueClassmatesMap",
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
  createdCanvas () {
    const { className, theme } = this.pData.node
    const dom = document.querySelector(`${className} .classmates-map .map`)
    this.chart = Echarts.init(dom, theme)
    this.chartLoad()
    this.initChart()
  },
  chartLoad () {
    this.$emit('chart', this.chart)
  },
  initChart () {
    const { data } = this.pData
    if (peoples.length) {
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
              areaColor: '#bda29a',    //  地图上的默认颜色
              borderColor: '#404a59'   //  地图之外的颜色
            },
            emphasis: {
              areaColor: '#61a0a8'   //  鼠标移到地图上的颜色
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