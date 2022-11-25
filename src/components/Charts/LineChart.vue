<script setup lang="ts">
import { ref, computed, watch, toRefs, onMounted } from 'vue';
import type { PlantStatusData } from '@/types/data';

import * as echarts from 'echarts'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
    LineChart,
    BarChart
} from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    AxisPointerComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import theme from '@/assets/chartsTheme/wonderland.json';


use([
    CanvasRenderer,
    LineChart, BarChart,
    TitleComponent,
    TooltipComponent,
    AxisPointerComponent,
    LegendComponent
]);


echarts.registerTheme('customTheme', theme)

const props = defineProps({
    device: {
        type: Number,
        default: 0
    },
    data: {
        type: Array<PlantStatusData>,
        default: []
    },
})



// 如果不是计算属性，就不会更新？
const temperatureOption = computed(() => {
    var label = props.data.map((item) => {
        return item.time
    })
    var minTemperature = 99; //new Number(99)
    var maxTemperature = -99;
    var data = props.data.map((item) => {
        if (item.temperature < minTemperature) {
            minTemperature = item.temperature
        }
        if (item.temperature > maxTemperature) {
            maxTemperature = item.temperature
        }
        return item.temperature.toFixed(2)
    })

    return {
        // title: { text: '温度数据' + ' 设备编号(' + props.device + ')' },
        tooltip: {},
        grid: { // https://www.jianshu.com/p/b07695eec257
            top: '20%',
            bottom: '20%',
            left: '20%',
            right: '20%'
        },
        xAxis: {
            data: label,
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                interval: 0, //横轴信息全部显示
                formatter: (value: Number) => {
                    return value + ' °C'
                }

            },
            min: minTemperature - Math.abs(minTemperature) * 0.1,
            max: maxTemperature + Math.abs(maxTemperature) * 0.1,
        },
        series: [
            // {
            //     name: '温度',
            //     type: 'bar',
            //     data: data,
            //     markPoint: {
            //         data: [
            //             { type: 'max', name: '最高温度' },
            //             { type: 'min', name: '最低温度' }
            //         ]
            //     },
            //     markLine: {
            //         data: [{ type: 'average', name: 'Avg' }]
            //     }
            // },
            {
                name: '温度',
                type: 'line',
                smooth: true,
                data: data,
                markPoint: {
                    data: [
                        { type: 'max', name: '最高温度' },
                        { type: 'min', name: '最低温度' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ]
    }
})

onMounted(() => {

})

</script>


<template>
    <div class="container">
        <div>温度变化</div>
        <div>设备编号: {{ props.device }}</div>
        <div class="chart-container">
            <v-chart class="chart" :option="temperatureOption" ref="chart" theme="customTheme"
                style="width: 100%;height:100%;" />
        </div>
    </div>

</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 100%;
    /* background-color: rgb(0, 0, 0); */
}

canvas {
    width: 100% !important;
}
</style>