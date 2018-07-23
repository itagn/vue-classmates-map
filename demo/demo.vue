<template>
  <div>
    <classmates-map class="map" :pData="pData"></classmates-map>
  </div>
</template>
<script>
import json from '../demo.json'
import { ClassmatesMap } from 'vue-classmates-map'
export default {
  components: {
    ClassmatesMap
  },
  data () {
    return {
      pData: {
        data: json.data,
        node: {
          className: '.demo1'
        }
      }
    }
  }
}
</script>
<style scoped>
.map {
  width: 600px;
  height: 300px;
}
</style>
