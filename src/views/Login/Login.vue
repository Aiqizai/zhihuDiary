<template>
  <div class="login-cover">
    <i class="icon-arrow_lift" @click="closeLoginCover" />
    <p class="login-title">登录</p>
    <van-form @submit="onSubmit" class="form-wrapper">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="yzm"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      />
      <br />
      <van-button
        type="primary"
        size="mini"
        class="getCode"
        @click="getYzm"
        :disabled="yzm.length !== 0 || !username || !password"
        >{{ codeText }}</van-button
      >
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入vant的消息通知组件 Notify 是一个函数，调用后会直接在页面中弹出相应的消息提示。
import { Notify } from "vant";

export default {
  data() {
    return {
      username: "",
      password: "",
      yzm: "", // 存放验证码
      isyzm: "",
      codeText: "获取验证码",
    };
  },
  created() {
    console.log(this.$route.params);
  },
  methods: {
    closeLoginCover() {
      this.$router.back();
    },
    //获取验证码
    getYzm() {
      //生成时间戳验证码
      var time = String(new Date().getTime()).slice(-3);

      //生成随机数验证码
      var random = String(Math.random()).slice(-3);

      alert("验证码：" + time + random);

      this.yzm = time + random;

      this.isyzm = this.yzm;

      this.timer();
    },
    timer() {
      //验证码倒计时
      let num = 60;
      this.codeText = num + "秒后重新发送";
      let time = setInterval(() => {
        if (num == 0) {
          clearInterval(time);
          time = null;
          this.codeText = "重发验证码";
        } else {
          num--;
          this.codeText = num + "秒后重新发送";
        }
      }, 1000);
    },
    onSubmit() {
      console.log(this.username, this.password);

      // 判断验证码是否相同
      if (this.yzm === this.isyzm) {
        console.log("相同");
        // 获取用户信息
        let info = {
          username: this.username,
          password: this.password,
        };
        // 存入本地存储
        localStorage.setItem("info", JSON.stringify(info));

        // 成功通知
        Notify({ type: "success", message: "登录成功！" });

        // 页面跳转
        if (this.$route.params) {
          this.$router.push({
            name: "Mine",
            params: {
              isBackDetail: this.$route.params.isBackDetail,
              id: this.$route.params.id,
            },
          });
        } else {
          this.$router.push("/mine");
        }
      } else if (!this.yzm) {
        Notify({ type: "danger", message: "请填写验证码！" });
      } else {
        // 危险通知
        Notify({ type: "danger", message: "登录失败！" });

        // 页面不跳转
        // this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-cover {
  padding: 64px 36px;
  height: 100vh;
  background-color: #fff;

  .login-title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
  }

  .form-wrapper {
    margin-top: 50px;
  }

  .getCode {
    display: block;
    margin: 0 auto;
  }

  .icon-arrow_lift {
    position: absolute;
    left: 10%;
    top: 32px;
    font-size: 18px;
    color: #1a1a1a;
    transform: translateX(-50%);
  }
}
</style>