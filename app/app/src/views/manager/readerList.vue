<template>
  <div>
    <!-- 上面模块，包含搜索栏-->
    <div class="topmod">
      <el-input
        placeholder="证号"
        v-model="input_readerid"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-input
        placeholder="姓名"
        v-model="input_readername"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-input
        placeholder="性别"
        v-model="input_sex"
        clearable
        style="width: 10vw; margin: 10px"
      >
      </el-input>
      <el-date-picker
        v-model="input_xiname"
        type="date"
        placeholder="系名"
        style="width: 10vw; margin: 10px"
      >
      </el-date-picker>
      <el-input
        placeholder="年级"
        v-model="input_level"
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
    </div>
    <!-- 下面模块，包含书籍列表和翻页模块-->
    <el-button type="button" @click="key = 2">添加读者</el-button>
    <div class="bottommod">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          fixed
          prop="readerid"
          label="证号"
          width="150"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="readername"
          label="姓名"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="xiname"
          label="系名"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="年级"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="未还书数"
          style="width: 10vw; margin: 0px"
        >
        </el-table-column>
        <el-table-column
          
          label="操作"
          style="width: 10vw; margin: 0px"
        >
          <el-button type="button" @click="deletereader" style="width: 5vw; margin: 0px">删除</el-button>
          <el-button type="button" @click="key = 1" style="width: 5vw; margin: 0px">修改</el-button>
        </el-table-column>
      </el-table>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="rereader"
        v-show="key === 1"
      >
        <el-form-item label="证号" prop="readerid">
          <el-input v-model="ruleForm.readerid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="readername">
          <el-input v-model="ruleForm.readername"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="" prop="sex">
            <el-option  label="男" value="男"></el-option>
            <el-option  label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系名" prop="xiname">
          <el-input v-model="ruleForm.xiname"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="level">
          <el-input v-model="ruleForm.level"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="key = 0">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="ruleForm_add"
        status-icon
        :rules="rules_add"
        ref="ruleForm_add"
        label-width="100px"
        class="addreader"
        v-show="key === 2"
      >
        <el-form-item label="证号" prop="readerid">
          <el-input v-model="ruleForm_add.readerid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="readername">
          <el-input v-model="ruleForm_add.readername"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm_add.sex" placeholder="" prop="sex">
            <el-option  label="男" value="男"></el-option>
            <el-option  label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系名" prop="xiname">
          <el-input v-model="ruleForm_add.xiname"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="level">
          <el-input v-model="ruleForm_add.level"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm_add')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm_add')">重置</el-button>
          <el-button @click="key = 0">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    deletereader() {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("成功修改！");
        } else {
          console.log("修改有误");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  data() {
    return {
      key: 0,
      input_readerid: "",
      input_readername: "",
      input_sex: "",
      input_xiname: "",
      input_level: "",
      tableData: [
        {
          readerid: "2021141414141",
          readername: "邓文杰",
          sex: "男",
          xiname: "计算机",
          level: "2021",
          num:"1",
        },
        
      ],
      ruleForm: {
        readerid: "",
        readername: "",
        sex: "",
        xiname: "",
        level: "",
      },
      rules: {
        readerid: [
          { required: true, message: "请输入证号", trigger: "blur" },
          {
            min: 0,
            max: 10,
            message: "不可超过10位哦",
            trigger: "blur",
          },
        ],
        readername: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 0,
            max: 12,
            message: "名字太长了",
            trigger: "blur",
          },
        ],
        xiname: [
          { required: true, message: "请输入系名", trigger: "blur" },
          {
            min: 0,
            max: 15,
            message: "输入太长了",
            trigger: "blur",
          },
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" },
          {
            
          },
        ],
        level: [
          { required: true, message: "请输入年级", trigger: "blur" },
          {
            
          },
        ],
      },
      ruleForm_add: {
        readerid: "",
        readername: "",
        sex: "",
        xiname: "",
        level: "",
      },
      rules_add: {
        readerid: [
          { required: true, message: "请输入证号", trigger: "blur" },
          {
            min: 0,
            max: 10,
            message: "不可超过10位哦",
            trigger: "blur",
          },
        ],
        readername: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 0,
            max: 12,
            message: "名字太长了",
            trigger: "blur",
          },
        ],
        xiname: [
          { required: true, message: "请输入系名", trigger: "blur" },
          {
            min: 0,
            max: 15,
            message: "输入太长了",
            trigger: "blur",
          },
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" },
          {
            
          },
        ],
        level: [
          { required: true, message: "请输入年级", trigger: "blur" },
          {
            
          },
        ],
      },
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
.rereader {
  background-color: #fff;
  box-sizing: border-box;
  padding: 50px 20px 20px 10px;
  border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
}
.addreader {
  background-color: #fff;
  box-sizing: border-box;
  padding: 50px 20px 20px 10px;
  border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
}
</style>