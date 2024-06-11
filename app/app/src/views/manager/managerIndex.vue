<template>
  <div>
    <!-- 头部和主体的总体容器 -->
    <el-container class="all">
      <!-- 头部 -->
      <el-header class="HEAD"> 图书管理系统 </el-header>
      <!-- 包含侧边栏和路由界面的主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside class="Stab">
          <el-menu
            router
            class="el-menu-vertical-demo"
            default-active="/mbookList"
            unique-opened
            style=""
          >
            <el-menu-item index="/mbookList" id="tab">
              <i class="el-icon-menu"></i>
              <span slot="title"> 书籍总览 </span>
            </el-menu-item>
            <el-menu-item index="/readerList">
              <i class="el-icon-document"></i>
              <span slot="title"> 读者管理 </span>
            </el-menu-item>
            <el-menu-item index="/blackList">
              <i class="el-icon-s-promotion"></i>
              <span slot="title"> 黑名单读者 </span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 路由出口 -->
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
</script>

<style scoped>
.all {
  height: 100vh;
  overflow: hidden; /* 防止页面滚动 */
}
.HEAD {
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: rgb(32, 34, 35);
  color: azure;
  position: fixed; /* 固定头部位置 */
  width: 100%;
}
.Stab {
  min-height: 100px;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  position: fixed; /* 固定侧边栏位置 */
  top: 60px; /* 距离顶部头部的高度 */
  bottom: 0; /* 侧边栏固定到底部 */
}
.main-content {
  margin-left: 300px; /* 让路由页面内容不被侧边栏遮挡 */
  margin-top: 60px;
  height: calc(100vh - 60px); /* 让路由页面内容占据剩余的高度 */
  overflow-y: auto; /* 让路由页面内容有滚动条 */
}
</style>