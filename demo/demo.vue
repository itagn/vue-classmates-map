<template>
  <div>
    <classmates-map class="map" @chart="getCharts" :pData="pData"></classmates-map>
  </div>
</template>
<script>
import json from './demo.json'
import { ClassmatesMap } from '../vue-classmates-map'
export default {
  components: {
    ClassmatesMap
  },
  data () {
    return {
      pData: {
        data: json.data,
        node: {
          className: '.map'
        }
      },
      charts: []
    }
  },
  mounted () {
    window.onresize = () => {
      for (let i=0;i<this.charts.length;i++) {
        this.charts[i].resize()
      }
    }
  },
  methods: {
    getCharts (data) {
      this.charts.push(data)
    }
  }
}
</script>
<style scoped>
.map {
  height: 100vh;
  width: 100vw;
}
</style>
