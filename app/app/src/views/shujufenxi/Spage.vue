<template>
  <div class="all">
    <div class="nav"><div class="wenzi">大川小界</div></div>
    <div class="main">
      <div class="biaoti">四川城市的城镇以及男女比例信息</div>
      <div
        class="chart"
        ref="chartContainer"
        style="height: 400px; width: 700px; margin: auto"
      ></div>
      <div class="other"></div>
    </div>
  </div>
</template>  
    
  <script>
import * as echarts from "echarts";

export default {
  name: "EChartsPieGrid",
  data() {
    return {
      chart: null,
      fixedData: [
        // ... 你的数据
        [10, 90, 15, 85],
        [20, 80, 25, 75],
        [30, 70, 35, 65],
        [40, 60, 50, 50],
        [9, 4, 8, 6],
        [4, 8, 6, 7],
        [8, 6, 7, 5],
        [6, 7, 5, 8],
        [5, 8, 6, 7],
        [7, 5, 8, 6],
        [8, 6, 7, 5],
        [6, 7, 5, 8],
        [5, 8, 6, 7],
        [5, 5, 8, 2],
        [4, 6, 7, 3],
        [6, 4, 5, 5],
        [5, 5, 6, 4],
        [7, 3, 8, 2],
        [4, 6, 7, 3],
        [3, 7, 5, 5],
        [5, 8, 6, 4],
      ],
      cities: [
        // ... 你的城市列表
        "成都",
        "绵阳",
        "德阳",
        "攀枝花",
        "广元",
        "遂宁",
        "阿坝藏族羌族自治州",
        "内江",
        "乐山",
        "南充",
        "宜宾",
        "自贡",
        "泸州",
        "甘孜藏族自治州",
        "广安",
        "达州",
        "眉山",
        "雅安",
        "巴中",
        "资阳",
        "凉山彝族自治州",
      ],
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 清理事件监听器
    window.removeEventListener("resize", this.handleResize);
    // 销毁图表实例
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chartContainer);

      const pieSeries = this.cities.map((city, index) => {
        return {
          type: "pie",
          name: city,
          radius: "16%",
          center: [
            (index % 7) * 13 + 8 + "%",
            Math.floor(this.cities.indexOf(city) / 7) * 27 + 19 + "%",
          ], // 调整位置
          label: {
            show: false,
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          tooltip: {
            formatter: function (params) {
              var percent = (params.percent * 2).toFixed(2);
              return params.name + ": " + params.value + " (" + percent + "%)";
            },
          },
          data: [
            { value: this.fixedData[index][0], name: "男性" },
            { value: this.fixedData[index][1], name: "女性" },
            { value: this.fixedData[index][2], name: "城镇" },
            { value: this.fixedData[index][3], name: "农村" },
          ],
        };
      });

      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          bottom: 10,
          left: "center",
          itemWidth: 14,
          itemHeight: 14,
          textStyle: {
            color: "#333",
          },
          data: ["男性", "女性", "城镇", "农村"],
        },
        graphic: this.cities.map((city, index) => ({
          type: "text",
          left: (index % 7) * 13 + 4 + "%",
          top: Math.floor(index / 7) * 27 + 5 + "%",
          style: {
            text: city,
            font: "bold 12px Microsoft YaHei",
          },
        })),
        series: pieSeries,
      };

      this.chart.setOption(option);
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
  },
};
</script>  
    
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
.wenzi {
  font-size: 30px;
  color: #8ad0ff;
  height: 100%;
  width: 95%;
}
.jump {
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
.choose {
  width: 200px;
  margin: 0px 150px;
}
</style>


