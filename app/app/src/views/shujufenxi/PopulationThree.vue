<template>  
  <div ref="chartContainer" style="height: 800px; width: 800px;"></div>  
</template>  
  
<script>  
import * as echarts from 'echarts';  
import axios from 'axios'; // 如果你没有使用axios，可以使用fetch或其他HTTP客户端  
  
export default {  
  name: 'MapChart',  
  data() {  
    return {  
      chart: null, // 用于存储ECharts实例  
      option: null, // 用于存储图表配置  
    };  
  },  
  mounted() {  
    this.initChart();  
  },  
  methods: {  
    async initChart() {  
      // 初始化ECharts实例  
      this.chart = echarts.init(this.$refs.chartContainer, null, {  
        renderer: 'canvas',  
        useDirtyRect: false,  
      });  
  
      // 加载地图数据  
      const ROOT_PATH = 'https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json';  
      try {  
        const response = await axios.get(ROOT_PATH);  
        const geoJson = response.data;  
        echarts.registerMap('SC', geoJson);  
  
        // 这里应该设置option的具体配置  
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (人/平方公里)'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
          },
          visualMap: {
            min: 0,
            max: 1500,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#FFE4B5', '#FFA07A', '#CD5C5C', '#8B0000']
            }
          },
          series: [
            {
              name: '四川省各市人口密度',
              type: 'map',
              map: 'SC',
              label: {
                show: true
              },
              data: [
                { name: '成都市', value: 1484 },
                { name: '自贡市', value: 560 },
                { name: '攀枝花市', value: 164 },
                { name: '泸州市', value: 348 },
                { name: '德阳市', value: 586 },
                { name: '绵阳市', value: 242 },
                { name: '广元市', value: 139 },
                { name: '遂宁市', value: 521 },
                { name: '内江市', value: 573 },
                { name: '乐山市', value: 248 },
                { name: '南充市', value: 445 },
                { name: '眉山市', value: 415 },
                { name: '宜宾市', value: 348 },
                { name: '广安市', value: 511 },
                { name: '达州市', value: 323 },
                { name: '雅安市', value: 95 },
                { name: '巴中市', value: 216 },
                { name: '资阳市', value: 395 },
                { name: '阿坝藏族羌族自治州', value: 10 },
                { name: '甘孜藏族自治州', value: 7 },
                { name: '凉山彝族自治州', value: 81 }
              ],
              nameMap: {
                'Chengdu': '成都市',
                'Zigong': '自贡市',
                'Panzhihua': '攀枝花市',
                'Luzhou': '泸州市',
                'Deyang': '德阳市',
                'Mianyang': '绵阳市',
                'Guangyuan': '广元市',
                'Suining': '遂宁市',
                'Neijiang': '内江市',
                'Leshan': '乐山市',
                'Nanchong': '南充市',
                'Meishan': '眉山市',
                'Yibin': '宜宾市',
                'Guangan': '广安市',
                'Dazhou': '达州市',
                'Yaan': '雅安市',
                'Bazhong': '巴中市',
                'Ziyang': '资阳市',
                'Aba Tibetan Qiang Autonomous Prefecture': '阿坝藏族羌族自治州',
                'Garze Tibetan Autonomous Prefecture': '甘孜藏族自治州',
                'Liangshan Yi Autonomous Prefecture': '凉山彝族自治州'
              }
            }
          ]
        };  
  
        // 设置图表配置  
        this.chart.setOption(this.option);  
  
        // 图表点击事件  
        this.chart.on('click', (params) => {  
          if (params.seriesType === 'map') {  
            const cityName = params.name;  
            // 点击函数  
            this.updateAnotherChart(cityName);  
          }  
        });  
  
        // 监听窗口大小变化  
        window.addEventListener('resize', () => {  
          this.chart.resize();  
        });  
      } catch (error) {  
        console.error('Error loading map data:', error);  
      }  
    },  
    
  },  
  beforeDestroy() {  
    // 组件销毁前，清除窗口大小变化事件监听  
    window.removeEventListener('resize', this.chart.resize);  
    // 如果需要，还可以销毁ECharts实例  
    // this.chart.dispose();  
  },  
};  
</script>  
  
<style scoped>  
/* 样式可以在这里定义 */  
</style>