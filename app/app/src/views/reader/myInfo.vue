<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="我的信息"
      :column="1"
      :size="size"
      border
    >
      <template slot="extra">
        
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-postcard"></i>
          证号
        </template>
        2021141460110
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          姓名
        </template>
        陈博
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-female"></i>
          性别
        </template>
        塑料袋
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-house"></i>
          系名
        </template>
        计算机系
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
           年级
        </template>
        2021级
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>