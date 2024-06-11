<template>
  <div>
    <!-- 上面模块，包含搜索栏-->
    <div class="topmod">
      <el-input
        placeholder="书号"
        v-model="input_bId"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-input
        placeholder="书名"
        v-model="input_bName"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-input
        placeholder="出版社"
        v-model="input_press"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-date-picker
        v-model="input_pubDate"
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
        v-model="input_note"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-button
        type="primary"
        round
        style="width: 10vw; margin: 10px; background-color: rgb(32, 34, 35)"
        @click="searchBook"
        >搜索</el-button
      >
    </div>
    <!-- 下面模块，包含书籍列表和翻页模块-->
    <div class="bottommod">
      <el-table :data="tableData_booklist_reader" border style="width: 100%">
        <el-table-column
          fixed
          prop="bId"
          label="书号"
          width="150"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="bName"
          label="书名"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="press"
          label="出版社"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="pubDate"
          label="出版日期"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="writer"
          label="作者"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="note"
          label="内容摘要"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column label="操作" style="width: 10vw; margin: 0px">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              style="width: 10vw; margin: 0px"
              >借阅</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.js";
import {gettoken} from "@/utils/storage.js"
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    searchBook() {
      const requestData = {
        bId: this.input_bId,
        bName: this.input_bName,
        press: this.input_press,
        pubDate: this.input_pubDate,
        writer: this.input_writer,
        note: this.input_note,
      };
      request
        .post("/reader/searchBook", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.tableData_booklist_reader = response.data; // 更新书籍列表数据
        })
        .catch((error) => {
          console.error("Error searching for books: ", error);
        });
    },
    fetchReaderInfo() {
      const token = gettoken(); // 获取存储在 localStorage 中的 token
      request
        .get("/reader", {
          // 在请求中使用 token 进行身份验证
          headers: {
            Authorization: `Bearer ${token}` // 替换为你的 token
          }
        })
        .then((response) => {
          this.readerInfo = response.data; // 获取读者基本信息
        })
        .catch((error) => {
          console.error("Error fetching reader information: ", error);
        });
    },
    borrowBook(row) {
      const rId = this.rId; // 获取当前读者的ID，这里的 this.currentReaderId 是示例，请替换为实际的值
      const bId = row.bId; // 获取书籍的ID

      const requestData = {
        rId: rId,
        bId: bId
      };

      request
        .post("/reader/borrowBook", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const result = response.data; // 假设响应参数为 "null"
          console.log("借阅成功", result);
          // 在这里对查询结果做相应的处理
        })
        .catch((error) => {
          console.error("借书失败", error);
        });
    }
  },

  data() {
    return {
      input_bId: "",
      input_bName: "",
      input_press: "",
      input_pubDate: "",
      input_writer: "",
      input_note: "",
      tableData_booklist_reader: [],
      readerInfo: {}, // 存储读者基本信息
    };
  },
  created() {
    // 在组件创建时发送GET请求
    this.fetchReaderInfo(); // 在页面加载时获取读者基本信息
    request
      .get("/reader/allBooks")
      .then((response) => {
        this.tableData_booklist_reader = response.data; // 将响应数据存入bookList中
      })
      .catch((error) => {
        console.error("Error fetching book list: " + error);
      });
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