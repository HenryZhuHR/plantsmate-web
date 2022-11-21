<script setup lang="ts">
// import SvgMap from "@/components/SvgMap/SvgMap.vue";
import { ref, type Ref, computed } from 'vue';
import { getPlantStatus } from "@/api/plantcenter";
import type { PlantStatusData } from '@/types/data';
import TemperatureChart from '@/components/TemperatureData/TemperatureChart.vue';

const headerTitle = ref({
    title: "Title",
    subtitle: "此数据为实时数据"
})

const device = ref(25);
const plantData: Ref<Array<PlantStatusData>> = ref([
    { date: '2022-10-28', time: '16:21:40', light: 1, temperature: 30, humidity: 1 },
    { date: '2022-10-28', time: '16:21:41', light: 20, temperature: 40, humidity: 12 },
    { date: '2022-10-28', time: '16:21:41', light: 99, temperature: 60, humidity: 46 },
]);// 

const temperatureData = computed(() => {
    var dateArray: Array<String> = [];
    var timeArray: Array<String> = [];
    var temperatureArray: Array<Number> = [];

    plantData.value.forEach((item, index, array) => {
        dateArray.push(item.date);
        timeArray.push(item.time);
        temperatureArray.push(item.temperature);
    })
    return {
        timeArray: timeArray,
        temperatureArray: temperatureArray
    }
})

function update_plant_status() {
    var request_data = ref({
        "device": 746,
        "time": ["16:21:40", "16:21:55"],
    })
    getPlantStatus(request_data.value)
        .then((response) => {
            if (response.status == 200) {
                // console.log(response.data.Response);
                device.value = response.data.Response.device;
                plantData.value = response.data.Response.data;
                console.log(plantData.value)
            } else {
                console.log(response);
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            }
        })
}
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header">
                <h1>{{ headerTitle.title }}</h1>
                <div class="header-tip">
                    <div class="sub-title">{{ headerTitle.subtitle }}</div>
                    <div class="last-update-time">
                        <!-- 更新时间：{{ basicData.updateTime }} -->
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-main>
                    <el-button type="primary" @click="update_plant_status">Update</el-button>

                    <div id="temperature-chart">
                        <TemperatureChart :device="device" :data="plantData"></TemperatureChart>
                    </div>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="scss">
.common-layout {
    .el-header {
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
        text-align: center;
    }

    .el-aside {
        background-color: var(--el-color-primary-light-8);
        color: var(--el-text-color-primary);
        text-align: center;
    }

    .el-main {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-text-color-primary);
        text-align: center;
    }
}


.header-tip {
    text-align: right;
    position: absolute;
    top: 0;
    right: 0;
}

#temperature-chart {
    width: 30%;
}
</style>