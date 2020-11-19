<template>
  <div class="mine-wrapper">
    <p class="back-title">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
    </p>
    <div class="user-content">
      <div class="img-box">
        <van-image
          class="user-img"
          round
          width="8rem"
          height="8rem"
          :src="require('../assets/images/default.jpg')"
        />
      </div>
    </div>
    <ul>
      <li class="list-item">
        <span>用户名:</span>
        <span class="username">{{ getUsername }}</span>
        <!-- <i class="icon-keyboard_arrow_right right-icon"></i> -->
      </li>
      <li class="list-item">
        <van-field
          id="a"
          class="input-control"
          v-model="value"
          label="个性签名"
          placeholder="这家伙很懒，什么也没留下..."
        />
      </li>
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
      <van-button class="log-btn" type="warning">退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      show: false,
      value: "",
    };
  },
  created() {
    
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
      this.$dialog
        .confirm({
          message: "是否要退出登录?",
          theme: "round-button",
        })
        .then(() => {
          // on confirm
          localStorage.removeItem("info");
          this.$router.push("/");
        })
        .catch(() => {
          // on cancel
          
        });
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
      
      // 跳转到收藏页
      this.$router.push("/collect");
    },
    changeTheme() {
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    margin-bottom: 20px;
    .user-img {
      left: 50%;
      transform: translateX(-4rem);
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

    .username {
      display: inline-block;
      float: right;
      // margin-right: 20px;
    }

    .input-control {
      padding: 10px 0 10px 0;
      text-align: right;

      /deep/ .van-field__control {
        text-align: right !important;
      }
    }

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

    .log-btn{
      width: 100vw;
    }
  }

  .changeTheme {
    // width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    background-color: red;
  }
}
</style>