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
                dimensions: ['city', 'population', 'Brate', 'Drate', 'Jrate'],
                source: [
                ['成都', 2126.8, 6.92, 5.96, 0.96],
                ['自贡', 245.2, 5.18, 10.56, -5.38],
                ['攀枝花', 121.6, 6.58, 7.24, -0.66],
                ['泸州', 426.3, 7.36, 11.97, -4.61],
                ['德阳', 346.1, 5.98, 10.14, -4.16],
                ['绵阳', 489.8, 6.41, 8.80, -2.39],
                ['广元', 227.1, 7.03, 9.25, -2.23],
                ['遂宁', 277.2, 6.31, 6.60, -0.29],
                ['内江', 308.8, 7.35, 14.71, -7.36],
                ['乐山', 315.3, 7.20, 10.20, -3.00],
                ['南充', 554.9, 5.65, 6.88, -1.23],
                ['眉山', 296.1, 6.84, 10.58, -3.74],
                ['宜宾', 461.8, 9.31, 11.48, -2.17],
                ['广安', 323.8, 9.65, 14.16, -4.51],
                ['达州', 535.5, 5.75, 7.19, -1.44],
                ['雅安', 143.3, 6.91, 8.58, -1.67],
                ['巴中', 265.8, 7.91, 8.64, -0.73],
                ['资阳', 226.9, 6.13, 12.25, -6.13],
                ['阿坝', 82.3, 9.64, 4.94, 4.70],
                ['甘孜', 110.3, 8.43, 3.17, 5.26],
                ['凉山', 489.1, 17.17, 7.56, 9.61]
                ]
                },
                {
                transform: {
                    type: 'sort',
                    config: { dimension: 'population', order: 'desc' }
                }
                }
            ],
            legend:{
                data:['人口','出生率','死亡率','净增长率']
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    interval: 0 
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '万人',
                    splitLine: {
                        show: false,
                    }
                },
                {
                    type: 'value',
                    name: '%',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                        },
                    },
                    max: 40,
                    min: -40
                }
            ],
            tooltip: {
                trigger:'item'
            },
            series: [
                {
                    name: '人口',
                    type: 'bar',
                    encode: {x: 'city', y: 'population'},
                    datasetIndex: 1,
                    yAxisIndex: 0,
                    barWidth: '20%',
                    markLine: {
                        symbol: 'none',
                        label: {
                            show: false 
                        },
                        data: [
                            {type: 'average', name: '平均值'} 
                        ]
                    }
                },
                {
                    name: '出生率',
                    type: 'bar',
                    encode: {x: 'city', y: 'Brate'},
                    datasetIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: 'red'
                    },
                    markLine: {
                        symbol: 'none',
                        label: {
                            show: false 
                        },
                        data: [
                            {type: 'average', name: '平均值'} 
                        ]
                    }
                },
                {
                    name: '死亡率',
                    type: 'bar',
                    encode: {x: 'city', y: 'Drate'},
                    datasetIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: 'green'
                    },
                    markLine: {
                        symbol: 'none',
                        label: {
                            show: false 
                        },
                        data: [
                            {type: 'average', name: '平均值'} 
                        ]
                    }
                },
                {
                    name: '净增长率',
                    type: 'bar',
                    encode: {x: 'city', y: 'Jrate'},
                    datasetIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: 'orange'
                    },
                    markLine: {
                        symbol: 'none',
                        label: {
                            show: false 
                        },
                        data: [
                            {type: 'average', name: '平均值'} 
                        ]
                    }
                }
            ]
        }
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
    