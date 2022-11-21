<!-- 地图开发 https://blog.csdn.net/weixin_43508544/article/details/121365468 -->

<script setup lang="ts">

import { onMounted, ref } from "vue";
import * as echarts from "echarts/core";
import {
  BarChart,
  LineChart,
  LinesChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
} from 'echarts/charts';
import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  ToolboxComponent,
  DataZoomComponent
} from "echarts/components";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

import VChart from "vue-echarts";

import planeSVG from "@/assets/flight-seats.svg"

import  FlightSeat from "./FlightSeat.vue"


echarts.use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
  SVGRenderer,
  ToolboxComponent,
  DataZoomComponent
]);

function makeTakenRegions(takenSeatNames: Array<string>) {
  var regions = [];
  for (var i = 0; i < takenSeatNames.length; i++) {
    regions.push({
      name: takenSeatNames[i],
      silent: true,
      itemStyle: {
        color: '#bf0e08'
      },
      emphasis: {
        itemStyle: {
          borderColor: '#aaa',
          borderWidth: 1
        }
      },
      select: {
        itemStyle: {
          color: '#bf0e08'
        }
      }
    });
  }
  return regions;
}

const takenSeatNames = ['26E', '26D', '26C', '25D', '23C', '21A', '20F'];
const planeOption = {
  tooltip: {},
  geo: {
    map: 'flight-seats',
    roam: true,
    selectedMode: 'multiple',
    layoutCenter: ['50%', '50%'],
    layoutSize: '95%',
    tooltip: {
      show: true
    },
    itemStyle: {
      color: '#fff'
    },
    emphasis: {
      itemStyle: {
        color: undefined,
        borderColor: 'green',
        borderWidth: 2
      },
      label: {
        show: false
      }
    },
    select: {
      itemStyle: {
        color: 'green'
      },
      label: {
        show: false,
        textBorderColor: '#fff',
        textBorderWidth: 2
      }
    },
    regions: makeTakenRegions(takenSeatNames)
  }
}

const chartOption = ref({
  title: {
    text: "Traffic Sources",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
});


</script>


<template>
  <!-- <v-chart class="chart" :option="chartOption" /> -->
  <!-- <v-chart id="plane" class="chart" :option="planeOption" ref="map" autoresize  /> -->

</template>


<style scoped>
.chart {
  height: 400px;
}

</style>

<!-- https://echarts.apache.org/examples/data/asset/geo/Beef_cuts_France.svg -->
<!-- https://echarts.apache.org/examples/data/asset/geo/flight-seats.svg -->