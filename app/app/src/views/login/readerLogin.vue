<template>
  <div>
    <div class="container">
      <div class="login-wrapper">
        <div class="toubu">登 录</div>
        <div class="form-wrapper">
          <input
            type="text"
            name="username"
            placeholder="用户名"
            class="input-item"
            v-model="input_rName"
          />
          <input
            type="password"
            name="password"
            placeholder="密码"
            class="input-item"
            v-model="input_rPassword"
          />
          <div class="btn" @click="readerLogin">login</div>
        </div>
        <div class="msg">
          <p >创建新账户 </p>
          <p></p>
        </div>
      </div>
      <div class="biaoti">
        欢迎使用图书管理系统
        <p></p>
      </div>
    </div>
  </div>
</template>
<script>
// 假设 request 是你使用的 HTTP 请求库，这里使用 Axios 作为例子
import request from "@/utils/request.js";

export default {
  methods: {
    async readerLogin() {
      const requestData = {
        rName: this.rName,
        rPassword: this.rPassword
      };
      try {
        const response = await request.post("/login/reader", requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const token = response.data; 
        this.$store.commit("setToken", token); //存读者token到本地

        // 跳转到 readerIndex 路由
        this.$router.replace("/readerIndex");

        console.log("登录成功，令牌已保存：", token);
      } catch (error) {
        console.error("登录失败: ", error);
      }
    }
  },
  data() {
    return {
      rName: "",
      rPassword: ""
    };
  }
};
</script>

<style scoped>


.container {
  height: 100vb;
  background: linear-gradient(to top, #afd9f3, rgb(255, 173, 252));
  background-size: cover;
}

.login-wrapper {
  background-color: rgb(255, 255, 255);
  width: 400px;
  height: 500px;
  border-radius: 100px;
  padding: 0 40px;
  position: relative;
  left: 20%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid rgba(40, 37, 37, 0.589);
}

.toubu {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgba(32, 34, 35, 0.902);
  font-size: 15px;
  outline: none;
}

.input-item::placeholder {
  text-transform: uppercase;
}

.btn {
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-color:rgba(32, 34, 35, 0.902);
  color: #fff;
  border-radius: 10px;
  text-align: center;
}
.btn:hover {
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-color: rgb(32, 34, 35);
  color: #fff;
  border-radius: 10px;
  text-align: center;
  cursor: default;
}

.msg {
  text-align: center;
  line-height: 25px;
  margin-top: 10px;
}

.msg p {
  text-decoration-line: none;
  color: rgba(32, 34, 35, 0.523);
}
.msg p:hover{
  cursor: default;
  color: rgb(32, 34, 35);
}
.decorationpicture img {
  position: absolute;
  bottom: -0px;
  right: 10%;
  height: 400px;
  width: 550px;
}

.biaoti {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 50%;
  bottom: 600px;
  font-size: 35px;
  font-weight: bolder;
  height: 10px;
  color: #010203;
}

.biaoti p {
  margin: 0;
  padding: 0;
  position: relative;
  top: 15px;
  font-size: 15px;
  left: 0px;
  color: #000;
}
</style>