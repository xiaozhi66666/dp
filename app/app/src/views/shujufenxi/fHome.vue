<template>
  <div class="all">
    <div class="nav"><div class="wenzi">大川小界</div></div>
    <div class="main">
      <el-button class="f1" @click="toFpage">人口信息柱状图</el-button>
      <el-button class="s2" @click="toSpage">城镇男女饼状图</el-button>
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
.wenzi {
  font-size: 30px;
  color: #8ad0ff;
  height: 100%;
  width: 95%;
}
.main {
  height: calc(100vh - 60px); /* 让路由页面内容占据剩余的高度 */
  display: flex;
  width: 100%;
  background-color: #f2f6fc;
}
.f1 {
  margin: 100px;
  height: 200px;
  width: 40%;
}
.s2 {
  margin: 100px;
  height: 200px;
  width: 40%;
}
</style>
  
<script>
export default {
  methods: {
    toFpage() {
      this.$router.push('/Fpage'); // 注意：这里应该是一个 Vue Router 的路由名称或路径，而不是完整的 URL。但如果你想要跳转到外部链接，可以直接使用 URL。
    },
    toSpage() {
      this.$router.push('/Spage'); // 注意：这里应该是一个 Vue Router 的路由名称或路径，而不是完整的 URL。但如果你想要跳转到外部链接，可以直接使用 URL。
    },
  },
};
</script>
    
