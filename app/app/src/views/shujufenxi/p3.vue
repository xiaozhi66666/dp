<template>
  <div id="app" style="height: 100vh; display: flex; flex-direction: column">
    <div id="main" ref="chartDom" style="flex: 1"></div>
  </div>
</template>  
    
  <script>
import * as echarts from "echarts";
import axios from 'axios';  
export default {
  name: "AgeCompositionChart",
  data() {
    return {
      chart: null,
      option: null, 
      // 其他可能需要的数据
    };
  },
  mounted() {
    // 在这里可以初始化你的图表
    this.chart = echarts.init(this.$refs.chartDom);
    this.loadCSVData('各市州年龄构成.csv'); // 假设CSV文件在public文件夹下  
  },
  methods: {
    
    loadCSVData(url) {  
      axios.get(url, { responseType: 'text' })  
        .then(response => {  
          const csvData = response.data;  
          // 假设parseCSV是一个将CSV字符串解析为数据数组的函数  
          const data = this.parseCSVData(csvData);  
          this.updateChart(data);  
        })  
        .catch(error => {  
          console.error('Error loading CSV data:', error);  
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
      var yIncrement = 50 / (half + 1); // 上半部分和下半部分节点的增量

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
      this.option = {
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
      this.chart.setOption(this.option);
    },
    // 可能需要的其他方法...
  },
  // 可能需要的其他生命周期钩子...
};
</script>  
    
  <style scoped>
/* 你的样式代码 */
</style>