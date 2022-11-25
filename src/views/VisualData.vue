<script setup lang="ts">
import { ref, onMounted } from "vue";

import type { PlantStatusData } from "@/types/data";

import LinkedList from "@/utils/data_manager";

import LineChart from "@/components/Charts/LineChart.vue";

import { RandomData } from "@/utils/random_data";

import { getPlantStatus } from "@/api/plantcenter";

const headerTitle = ref({
  title: "Title",
  subtitle: "此数据为实时数据",
});

const device = ref(25);
const plantData = ref(new LinkedList<PlantStatusData>(20));

function update_plant_status() {
  var request_data = ref({
    device: 746,
    time: ["16:21:40", "16:21:55"],
  });
  getPlantStatus(request_data.value).then((response) => {
    if (response.status == 200) {
      // console.log(response.data.Response);
      device.value = response.data.Response.device;
      plantData.value = response.data.Response.data;
      console.log(plantData.value);
    } else {
      console.log(response);
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }
  });
}



onMounted(() => {
  setInterval(() => {
    let random_data = RandomData();
    // console.log(random_data)

    plantData.value.append(random_data);
``
  }, 1000);
});
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
          <el-button type="primary" @click="update_plant_status"
            >Update</el-button
          >

          <div id="temperature-chart">
            <LineChart
              :device="device"
              :data="plantData.toArray(5)"
            ></LineChart>
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
    // background-color: var(--el-color-primary-light-9);
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
