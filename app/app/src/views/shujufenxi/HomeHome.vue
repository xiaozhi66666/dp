<template>
  <div class="all">
    <div class="nav"><div class="wenzi">大川小界</div></div>
    <div class="main">
      <div class="p1">
        <div class="pp1" ref="chart1"></div>
        <div class="pp2">
          <div class="pp21" ref="chart2"></div>
          <div class="pp22">
            <!-- 选择chart2排列方式的 -->
            <el-select
              v-model="sortSelect1"
              placeholder="请选择"
              @change="updateChart1"
              class="choose1"
            >
              <el-option
                v-for="item in coption1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- 选择chart2时间的 -->
            <el-select
              v-model="sortSelect2"
              placeholder="请选择"
              @change="updateChart2"
              class="choose2"
            >
              <el-option
                v-for="item in coption2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="p2">
        <div class="p21" ref="chart3"></div>
        <div class="p22" ref="chart4"></div>
      </div>
      <div class="p3">
        <el-select
          v-model="sortSelect3"
          placeholder="请选择"
          @change="updateChart3"
          class="choose3"
        >
          <el-option
            v-for="item in coption3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="p4">
        <div class="p41" ref="chart5"></div>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
* {
  /* height: 100vb; */
  width: 100vb;
  margin: 0%;
  padding: 0%;
}
.all {
  /* overflow: hidden; */
  height: 2000px;
  width: 100%;
  margin: 0%;
  padding: 0%;
  display: flex;
  flex-direction: column;
}

.nav {
  display: flex;
  justify-content: center;
  height: 60px;
  width: 100%;
  background-color: #e5f0f4;
}
.wenzi {
  background-color: #81959b;
  display: grid;
  place-items: center;
  font-size: 30px;
  color: #ecf6f8;
  height: 100%;
  width: 20%;
  border-radius: 0px 0px 10px 10px;
}
.main {
  height: 1940px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #e5f0f4;
}
.p1 {
  height: 600px;
  width: 100%;
  display: flex;
}
.pp1 {
  background-color: #cfdde2;
  margin: 10px;
  height: 580px;
  flex: 2;
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
}
.pp2 {
  flex: 1;
  margin: 10px;
  height: 580px;
  display: block;
}
.pp21 {
  margin: 10px;
  height: 370px;
  width: 600px;
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: #cfdde2;
}
.pp22 {
  margin: 10px;
  height: 190px;
  width: 600px;
  display: flex;
  flex-direction: column;
}
.p3 {
  height: 50px;
  width: 100%;
  display: flex;
}
.choose1 {
  width: 350px;
  margin: 20px;
}
.choose2 {
  width: 350px;
  margin: 20px;
}
.choose3 {
  margin: 0 30%;
  height: 50px;
  width: 40%;
}
.p2 {
  height: 400px;
  width: 100%;
  display: flex;
}
.p21 {
  margin: 10px;
  flex: 1;
  height: 350px;
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: #cfdde2;
}
.p22 {
  margin: 10px;
  flex: 1;
  height: 350px;
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: #cfdde2;
}
.p4 {
  height: 700px;
  width: 100%;
  display: flex;
}
.p41 {
  width: 90%;
  height: 600px;
  margin: 50px;
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: #cfdde2;
}
</style>
  
<script>
import * as echarts from "echarts";
import axios from "axios";
import ROOT_PATH from '@/assets/map.json'
export default {
  name: "MapChart",
  data() {
    return {
      sortSelect1: "population", // 第一个选项
      sortSelect2: "2011", // 第er个选项
      coption1: [
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
      coption2: [
        {
          value: "2011",
          label: "2011",
        },
        {
          value: "2012",
          label: "2012",
        },
        {
          value: "2013",
          label: "2013",
        },
        {
          value: "2014",
          label: "2014",
        },
      ],
      chart1: null, // 用于存储ECharts实例
      option1: null, // 用于存储图表配置
      chart2: null,
      option2: {
        dataset: [
          {
            dimensions: ["city", "population", "Brate", "Drate", "Jrate"],
            source: [
              ["成都", 2126.8, 6.92, 5.96, 0.96],
              ["自贡", 245.2, 5.18, 10.56, -5.38],
              ["攀枝花", 121.6, 6.58, 7.24, -0.66],
              ["泸州", 426.3, 7.36, 11.97, -4.61],
              ["德阳", 346.1, 5.98, 10.14, -4.16],
              ["绵阳", 489.8, 6.41, 8.8, -2.39],
              ["广元", 227.1, 7.03, 9.25, -2.23],
              ["遂宁", 277.2, 6.31, 6.6, -0.29],
              ["内江", 308.8, 7.35, 14.71, -7.36],
              ["乐山", 315.3, 7.2, 10.2, -3.0],
              ["南充", 554.9, 5.65, 6.88, -1.23],
              ["眉山", 296.1, 6.84, 10.58, -3.74],
              ["宜宾", 461.8, 9.31, 11.48, -2.17],
              ["广安", 323.8, 9.65, 14.16, -4.51],
              ["达州", 535.5, 5.75, 7.19, -1.44],
              ["雅安", 143.3, 6.91, 8.58, -1.67],
              ["巴中", 265.8, 7.91, 8.64, -0.73],
              ["资阳", 226.9, 6.13, 12.25, -6.13],
              ["阿坝", 82.3, 9.64, 4.94, 4.7],
              ["甘孜", 110.3, 8.43, 3.17, 5.26],
              ["凉山", 489.1, 17.17, 7.56, 9.61],
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
            rotate: 90,
          },
        },
        yAxis: [
          {
            type: "value",
            name: "万人",
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "%",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
            max: 40,
            min: -40,
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
            barWidth: "20%",
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
            type: "bar",
            encode: { x: "city", y: "Brate" },
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
            name: "死亡率",
            type: "bar",
            encode: { x: "city", y: "Drate" },
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
            name: "净增长率",
            type: "bar",
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
      chart3: null,
      option3: null,
      chart4: null,
      option4: null,
      chart5: null, // 用于存储ECharts实例
      option5: null, // 用于存储图表配置
      dataBing: [
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
    this.initChartmap();
    this.chart2 = echarts.init(this.$refs.chart2);
    this.chart2.setOption(this.option2);
    this.initChartBing();
    this.chart5 = echarts.init(this.$refs.chart5);
    this.loadCSVData("各市州年龄构成.csv"); // 假设CSV文件在public文件夹下
  },

  methods: {
    loadCSVData(url) {
      axios
        .get(url, { responseType: "text" })
        .then((response) => {
          const csvData = response.data;
          // 假设parseCSV是一个将CSV字符串解析为数据数组的函数
          const data = this.parseCSVData(csvData);
          this.updateChart(data);
        })
        .catch((error) => {
          console.error("Error loading CSV data:", error);
        });
    },
    parseCSVData(csvData) {
      // 解析CSV数据的逻辑
      // ...（与你的原始代码类似，但需要调整为Vue的方法）
      var lines = csvData.split("\n").filter((line) => line.trim() !== "");
      var headers = lines[0].split(",").map((header) => header.trim());
      var data = [];
      var links = [];
      var cityColors = ["#1f78b4", "#6baed6", "#9ecae1", "#c6dbef", "#deebf7"];
      var ageGroupColors = [
        "#2171b5",
        "#4292c6",
        "#6baed6",
        "#9ecae1",
        "#c6dbef",
      ];

      // 解析节点数据
      for (var i = 1; i < lines.length; i++) {
        var parts = lines[i].split(",").map((part) => part.trim());
        if (parts.length < headers.length) continue; // 跳过空行或数据不全的行
        var city = parts[0];
        data.push({
          name: city,
          category: "city",
          itemStyle: { color: cityColors[i % cityColors.length] },
        });

        for (var j = 1; j < parts.length; j++) {
          var value = parseFloat(parts[j]);
          if (!isNaN(value) && value > 0) {
            // 过滤无效值
            var ageGroup = headers[j];

            // 创建链接
            links.push({
              source: city,
              target: ageGroup,
              value: value,
            });
          }
        }
      }

      // 添加年龄段节点
      var ageGroups = headers.slice(1).map((ageGroup, index) => ({
        name: ageGroup,
        category: "ageGroup",
        itemStyle: { color: ageGroupColors[index % ageGroupColors.length] },
      }));
      data = data.concat(ageGroups);

      // 调整节点位置
      var half = Math.ceil((data.length - ageGroups.length) / 2);
      var yIncrement = 100 / (half + 1); // 上半部分和下半部分节点的增量

      data.forEach((node, index) => {
        if (node.category === "ageGroup") {
          node.x = 50; // 固定年龄段节点的 x 坐标
          node.y = (index + 1) * (100 / (ageGroups.length + 1)); // 在中间垂直排列
          node.label = {
            position: "bottom", // 标签显示在节点的下方
          };
        } else {
          if (index - ageGroups.length < half) {
            node.x = 10; // 上半部分城市节点 x 坐标
            node.y = (index - ageGroups.length + 1) * yIncrement; // 上半部分城市节点 y 坐标
          } else {
            node.x = 90; // 下半部分城市节点 x 坐标
            node.y = (index - ageGroups.length - half + 1) * yIncrement; // 下半部分城市节点 y 坐标
          }
          node.label = {
            position: "top", // 标签显示在节点的上方
          };
        }
      });
      // 解析后设置图表选项
      this.option5 = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: function (params) {
            if (params.dataType === "edge") {
              return `${params.data.source} → ${params.data.target}: ${params.data.value}%`;
            } else {
              return `${params.data.name}`;
            }
          },
        },
        series: [
          {
            type: "sankey",
            layout: "none",
            emphasis: {
              focus: "adjacency",
            },
            data: data,
            links: links,
            orient: "vertical",
            lineStyle: {
              color: "source",
              curveness: 0.5,
            },
            itemStyle: {
              color: function (params) {
                if (params.data.category === "city") {
                  return cityColors[params.dataIndex % cityColors.length];
                } else {
                  return ageGroupColors[
                    (params.dataIndex - data.length + ageGroups.length) %
                      ageGroupColors.length
                  ];
                }
              },
            },
          },
        ],
      };

      // 设置选项并渲染图表
      this.chart5.setOption(this.option5);
    },
    updateChart1() {
      this.option2.dataset[1].transform.config.dimension = this.sortSelect1; // 替换为实际的属性名
      // 使用新的配置项更新图表
      this.chart2.setOption(this.option2);
    },
    async initChartmap() {
      // 初始化地图实例
      this.chart1 = echarts.init(this.$refs.chart1, null, {
        renderer: "canvas",
        useDirtyRect: false,
      });

      // 加载地图数据
      // const ROOT_PATH =
      //   "https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json";
      console.log('ROOT_PATH', ROOT_PATH)
      try {
        // const response = await axios.get(ROOT_PATH);
        const geoJson = ROOT_PATH;
        echarts.registerMap("SC", geoJson);

        // 这里应该设置option的具体配置
        this.option1 = {
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>{c} (人/平方公里)",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
          },
          visualMap: {
            min: 0,
            max: 1500,
            text: ["High", "Low"],
            realtime: false,
            calculable: true,
            inRange: {
              color: ["#FFE4B5", "#FFA07A", "#CD5C5C", "#8B0000"],
            },
          },
          series: [
            {
              name: "四川省各市人口密度",
              type: "map",
              map: "SC",
              label: {
                show: true,
              },
              data: [
                { name: "成都市", value: 1484 },
                { name: "自贡市", value: 560 },
                { name: "攀枝花市", value: 164 },
                { name: "泸州市", value: 348 },
                { name: "德阳市", value: 586 },
                { name: "绵阳市", value: 242 },
                { name: "广元市", value: 139 },
                { name: "遂宁市", value: 521 },
                { name: "内江市", value: 573 },
                { name: "乐山市", value: 248 },
                { name: "南充市", value: 445 },
                { name: "眉山市", value: 415 },
                { name: "宜宾市", value: 348 },
                { name: "广安市", value: 511 },
                { name: "达州市", value: 323 },
                { name: "雅安市", value: 95 },
                { name: "巴中市", value: 216 },
                { name: "资阳市", value: 395 },
                { name: "阿坝藏族羌族自治州", value: 10 },
                { name: "甘孜藏族自治州", value: 7 },
                { name: "凉山彝族自治州", value: 81 },
              ],
              nameMap: {
                Chengdu: "成都市",
                Zigong: "自贡市",
                Panzhihua: "攀枝花市",
                Luzhou: "泸州市",
                Deyang: "德阳市",
                Mianyang: "绵阳市",
                Guangyuan: "广元市",
                Suining: "遂宁市",
                Neijiang: "内江市",
                Leshan: "乐山市",
                Nanchong: "南充市",
                Meishan: "眉山市",
                Yibin: "宜宾市",
                Guangan: "广安市",
                Dazhou: "达州市",
                Yaan: "雅安市",
                Bazhong: "巴中市",
                Ziyang: "资阳市",
                "Aba Tibetan Qiang Autonomous Prefecture": "阿坝藏族羌族自治州",
                "Garze Tibetan Autonomous Prefecture": "甘孜藏族自治州",
                "Liangshan Yi Autonomous Prefecture": "凉山彝族自治州",
              },
            },
          ],
        };

        // 设置图表配置
        this.chart1.setOption(this.option1);

        // 图表点击事件
        // this.chart.on('click', (params) => {
        //   if (params.seriesType === 'map') {
        //     const cityName = params.name;
        //     // 点击函数
        //     this.updateAnotherChart(cityName);
        //   }
        // });

        // 监听窗口大小变化
        window.addEventListener("resize", () => {
          this.chart1.resize();
        });
      } catch (error) {
        console.error("Error loading map data:", error);
      }
    },
    initChartBing() {
      this.chart3 = echarts.init(this.$refs.chart3);
      this.chart4 = echarts.init(this.$refs.chart4);
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
            { value: this.dataBing[index][0], name: "男性" },
            { value: this.dataBing[index][1], name: "女性" },
          ],
        };
      });

      const pieSeries1 = this.cities.map((city, index) => {
        return {
          type: "pie",
          name: city + " - 城镇/农村",
          radius: "13%",
          center: [
            (index % 7) * 13 + 4 + "%",
            Math.floor(index / 7) * 27 + 20 + "%",
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
            formatter: "{b}: {c} ({d}%)",
          },
          data: [
            { value: this.dataBing[index][2], name: "农村" },
            { value: this.dataBing[index][3], name: "城镇" },
          ],
        };
      });
      const option3 = {
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

      const option4 = {
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
        series: pieSeries1,
      };
      this.chart4.setOption(option4);
      this.chart3.setOption(option3);
    },
  },
  handleResize() {
    if (this.chart3) {
      this.chart3.resize();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.chart1.resize);
    this.chart1.dispose();
    window.removeEventListenerBing("resize", this.handleResize);
    // 销毁bing图表实例
    if (this.chart3) {
      this.chart3.dispose();
    }
  },
};
</script>  
    