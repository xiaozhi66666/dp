<template>
  <div class="all">
    <div class="nav"><div class="wenzi">大川小界</div></div>
    <div class="main">
      <div class="biaoti">四川城市的人口信息</div>
      <div class="chart" ref="echarts" style="height: 400px"></div>
      <div class="other">
        <el-select
          v-model="sortSelect"
          placeholder="请选择"
          @change="updateChart"
          class="choose"
        >
          <el-option
            v-for="item in coption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  height: 100vb;
  width: 100vb;
  margin: 0%;
  padding: 0%;
}
.all {
  overflow: hidden; /* 防止页面滚动 */
  height: 100%;
  width: 100%;
  margin: 0%;
  padding: 0%;
  display: block;
}

.nav {
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #303133;
  padding: 5px 0 0 50px;
}
.wenzi{
  font-size: 30px;
  color: #8ad0ff;
  height: 100%;
  width: 95%;
}
.jump{
  width: 50px;
  color: #f2f6fc;
  height: 50px;
  margin: 15px;
}
.main {
  height: calc(100vh - 60px); /* 让路由页面内容占据剩余的高度 */
  display: block;
  width: 100%;
  background-color: #f2f6fc;
}
.biaoti {
  width: 100%;
  height: 50px;
  text-align: center;
  padding: 10px;
}
.chart {
  width: 100%;
  height: 40%;
}
.other {
  width: 100%;
  height: 100px;
}
.choose{
  width: 200px;
  margin: 0px 150px;
}
</style>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      sortSelect: "population", // 使用与options相同的value类型
      chartInstance: null, // 用于保存ECharts实例
      coption: [
        {
          value: "population",
          label: "按人口排序",
        },
        {
          value: "Brate",
          label: "按出生率排序",
        },
        {
          value: "Drate",
          label: "按死亡率排序",
        },
        {
          value: "Jrate",
          label: "按净增长率排序",
        },
      ],
      option: {
        dataset: [
          {
            dimensions: ["city", "population", "Brate", "Drate", "Jrate"],
            source: [
              ["成都", 500, 0.6, 0.6, 0],
              ["绵阳", 350, 0.8, 0.4, 0.4],
              ["内江", 200, 0.4, 0.5, -0.1],
              ["德阳", 300, 0.7, 0.5, -0.2],
              ["乐山", 250, 0.8, 0.5, 0.3],
              ["宜宾", 180, 0.5, 0.5, 0],
              ["自贡", 150, 0.8, 0.6, 0.2],
              ["泸州", 120, 0.6, 0.4, 0.2],
              ["攀枝花", 90, 0.3, 0.2, 0.1],
              ["广元", 200, 1.2, 0.8, 0.4],
              ["达州", 170, 1, 0.5, 0.5],
              ["遂宁", 120, 0.5, 0.3, 0.2],
              ["南充", 220, 1.5, 1, 0.5],
              ["广安", 130, 0.7, 0.4, 0.3],
              ["巴中", 100, 0.4, 0.3, 0.1],
              ["眉山", 110, 0.5, 0.3, 0.2],
              ["雅安", 80, 0.3, 0.2, 0.1],
              ["资阳", 70, 0.2, 0.1, 0.1],
              ["阿坝", 50, 0.2, 0.1, 0.1],
              ["甘孜", 60, 0.3, 0.2, 0.1],
              ["凉山", 100, 0.5, 0.4, 0.1],
            ],
          },
          {
            transform: {
              type: "sort",
              config: { dimension: "population", order: "desc" },
            },
          },
        ],
        legend: {
          data: ["人口", "出生率", "死亡率", "净增长率"],
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: [
          {
            type: "value",
            name: "万人",
            splitLine: {
              show: false,
              lineStyle: {
                type: "",
                color: "#8ad0ff",
              },
            },
          },
          {
            type: "value",
            name: "%",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#606266",
              },
            },
          },
        ],
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "人口",
            type: "bar",
            encode: { x: "city", y: "population" },
            datasetIndex: 1,
            yAxisIndex: 0,
            barWidth: "60%",
            markLine: {
              symbol: "none",
              label: {
                show: false,
              },
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "出生率",
            type: "line",
            encode: { x: "city", y: "Brate" },
            datasetIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "green",
            },
            markLine: {
              symbol: "none",
              label: {
                show: false,
              },
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "死亡率",
            type: "line",
            encode: { x: "city", y: "Drate" },
            datasetIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "red",
            },
            markLine: {
              symbol: "none",
              label: {
                show: false,
              },
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "净增长率",
            type: "line",
            encode: { x: "city", y: "Jrate" },
            datasetIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "orange",
            },
            markLine: {
              symbol: "none",
              label: {
                show: false,
              },
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      },
    };
  },
  name: "EChartsComponent",
  mounted() {
    // 在组件挂载后初始化图表
    this.chart = echarts.init(this.$refs.echarts);
    this.chart.setOption(this.option);
  },
  methods: {
    updateChart() {
      this.option.dataset[1].transform.config.dimension = this.sortSelect; // 替换为实际的属性名
      // 使用新的配置项更新图表
      this.chart.setOption(this.option);
    },
  },
  beforeDestroy() {
    // 在组件销毁前，确保释放图表实例以避免内存泄漏
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>
  