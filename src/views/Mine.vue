<template>
  <div class="mine-wrapper">
    <p class="back-title">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
    </p>
    <div class="user-content">
      <div class="user-img">
        <img src="../assets/images/default_header.png" alt="" />
      </div>
      <p class="user-name">{{ getUsername }}</p>
    </div>
    <ul>
      <li class="list-item" @click="GotoCollectView">
        <span>我的收藏</span>
        <i class="icon-keyboard_arrow_right right-icon"></i>
      </li>
      <li class="list-item">
        <span>消息中心</span>
        <i class="icon-keyboard_arrow_right right-icon"></i>
      </li>
    </ul>
    <div class="log-out" @click="LogOut">
      <span>退出登录</span>
    </div>
    <!-- <p class="changeTheme" @click="changeTheme">换肤</p>
    <div class="theme-wrapper">
      <van-popup
        v-model="show"
        position="bottom"
        round
        :style="{ height: '30%' }"
      >
        <span class="theme-name dark" @click="toggleTheme('theme1')">dark</span>
        <span class="theme-name light" @click="toggleTheme('theme2')"
          >light</span
        >
      </van-popup>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      show: false,
    };
  },
  created() {
    console.log("详情登录路由", this.$route.params);
  },
  computed: {
    getUsername() {
      // 获取当前用户名
      return JSON.parse(localStorage.getItem("info")).username;
    },
  },
  methods: {
    LogOut() {
      // 退出登录删除用户信息并回到首页
      localStorage.removeItem("info");
      this.$router.push("/");
    },
    Back() {
      // 判断回到的页面
      if (this.$route.params.id) {
        this.$router.push({
          name: "Detail",
          params: { id: this.$route.params.id },
        });
      } else {
        this.$router.push("/");
      }
    },
    BackHomePage() {
      // 返回首页
      this.$router.push("/");
    },
    GotoCollectView() {
      console.log(111);
      // 跳转到收藏页
      this.$router.push("/collect");
    },
    changeTheme() {
      this.show = true;
    },
    toggleTheme(theme) {
      // window.document.documentElement.setAttribute(
      //   "data-theme",
      //   index ? "dark" : "light"
      // );
      window.document.documentElement.setAttribute("data-theme", theme);
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "@/style/_handle.scss";

.mine-wrapper {
  height: 100vh;

  .back-title {
    position: relative;
    padding: 10px;
    line-height: 1.5;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    height: 40px;
    color: #191919;

    .back-icon {
      position: absolute;
      top: 50%;
      left: 5%;
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      transform: translateY(-50%);
    }
  }

  .user-content {
    .user-img {
      margin: 0 auto 10px;
      width: 80px;
      height: 80px;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }

    .user-name {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      color: #212121;
    }
  }

  .list-item {
    position: relative;
    padding: 0 15px;
    border-top: 2px solid #f8f8f8;
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    color: #4d4d4d;

    .right-icon {
      display: block;
      position: absolute;
      top: 50%;
      right: 10px;
      font-size: 20px;
      transform: translateY(-50%);
      color: #ccc;
    }
  }

  .log-out {
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #e1525d;
  }

  .changeTheme {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    background-color: red;
  }

  .theme-wrapper {
    position: relative;

    .theme-name {
      position: absolute;
      top: 50%;
      transform: translateY(-25px);
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
      border: 1px solid #999;
    }

    .dark {
      left: 25%;
    }

    .light {
      left: 65%;
    }
  }
}
</style>