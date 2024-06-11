<template>
  <div>
    <!-- 上面模块，包含搜索栏-->
    <div class="topmod">
      <el-input
        placeholder="书号"
        v-model="input_bkid"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-input
        placeholder="书名"
        v-model="input_bkname"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-input
        placeholder="出版社"
        v-model="input_bkph"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-date-picker
        v-model="input_phtime"
        type="date"
        placeholder="出版日期"
        style="width: 10vw; margin: 10px"
      >
      </el-date-picker>
      <el-input
        placeholder="作者"
        v-model="input_writer"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-input
        placeholder="内容摘要"
        v-model="input_bkcontent"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-button
        type="primary"
        round
        style="width: 10vw; margin: 10px; background-color: rgb(32, 34, 35)"
        >搜索</el-button
      >
      <el-button type="info" round>添加书籍</el-button>
    </div>
    <!-- 下面模块，包含书籍列表和翻页模块-->
    <div class="bottommod">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          fixed
          prop="bkid"
          label="书号"
          width="150"
          style="width: 10vw; margin: 10px"
        >
        </el-table-column>
        <el-table-column
          prop="bkname"
          label="书名"
          style="width: 10vw; margin: 10px"
        >
        </el-table-column>
        <el-table-column
          prop="bkph"
          label="出版社"
          style="width: 10vw; margin: 10px"
        >
        </el-table-column>
        <el-table-column
          prop="phtime"
          label="出版日期"
          style="width: 10vw; margin: 10px"
        >
        </el-table-column>
        <el-table-column
          prop="writer"
          label="作者"
          style="width: 10vw; margin: 10px"
        >
        </el-table-column>
        <el-table-column
          prop="bkcontent"
          label="内容摘要"
          style="width: 10vw; margin: 10px"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          style="width: 10vw; margin: 10px"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              style="width: 10vw; margin: 0px"
              >总数</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              style="width: 10vw; margin: 0px"
              >在库数量</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              style="width: 10vw; margin: 0px"
              >删除</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              style="width: 10vw; margin: 0px"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  data() {
    return {
      input_bkid: "",
      input_bkname: "",
      input_phtime: "",
      input_writer: "",
      input_bkcontent: "",
      input_bkph: "",
      tableData: [
        {
          bkid: "0",
          bkname: "我的奋斗",
          bkph: "波兰出版社",
          phtime: "1900",
          writer: "***",
          bkcontent: "这是一本励志书",          
        },
        
      ],
    };
  },
};
</script>

<style scoped>
.topmod {
  width: 100%;
}
.bottommod {
  width: 100%;
}
</style>