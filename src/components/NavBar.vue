<template>
  <div class="nav">
    <div class="nav-left">
      <ul class="time-list">
        <li>
          <span class="day">{{ getDay }}</span>
        </li>
        <li>
          <span class="month">{{ getMonth }}月</span>
        </li>
      </ul>
    </div>
    <!-- 搜索框 -->
    <!-- <NavSearch/> -->
    <div class="search">
      <van-search v-model="value" placeholder="日期(如:20200923)" />
      <div class="search-btn" @click="GotoSearch">搜索</div>
    </div>
    <div class="nav-right" @click="GotoLogin">
      <img src="../assets/images/default_header.png" alt="默认头像" />
    </div>
  </div>
</template>

<script>
// import NavSearch from './NavSearch'
import { Notify } from "vant";

export default {
  data() {
    return {
      value: "",
    };
  },
  computed: {
    getMonth() {
      // 获取月份
      let nowDate = new Date();
      let month = nowDate.getMonth() + 1;
      if (month === 1) {
        month = "一";
      }
      if (month === 2) {
        month = "二";
      }
      if (month === 3) {
        month = "三";
      }
      if (month === 4) {
        month = "四";
      }
      if (month === 5) {
        month = "五";
      }
      if (month === 6) {
        month = "六";
      }
      if (month === 7) {
        month = "七";
      }
      if (month === 8) {
        month = "八";
      }
      if (month === 9) {
        month = "九";
      }
      if (month === 10) {
        month = "十";
      }
      if (month === 11) {
        month = "十一";
      }
      if (month === 12) {
        month = "十二";
      }
      return month;
    },
    getDay() {
      // 获取日
      let nowDate = new Date();
      let day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
      return day;
    },
  },
  methods: {
    GotoSearch() {
      // 判断输入框是否有值
      if (!this.value) {
        // 警告通知
        Notify({ type: "warning", message: "请输入搜索日期" });
        return;
      } else {
          // 路由跳转,把搜索的内容作为参数传递给下一个页面
          localStorage.setItem("val", JSON.stringify(this.value));
          this.$router.push("/search");
          // 20200323
      }
    },

    GotoLogin() {
      // 模拟登录验证
      // 判断本地存储是否含有info这个字段，如果没有就跳转到登录页面，如果有就跳转到我的(设置页面)
      if (localStorage.getItem("info")) {
        this.$router.push("/mine");
      } else {
        // 跳转登录页面
        this.$router.push("/login");
      }
    },
  },
  components: {
    // NavSearch
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  text-align: center;
  width: 100%;
  height: 50px;
  color: #444;
  background-color: #fff;

  .nav-left {
    overflow: hidden;
    float: left;
    width: 66px;
    height: 100%;
    // background-color: red;

    .time-list {
      margin-top: 8px;

      li {
        margin-top: 5px;
      }

      li:first-child {
        margin: 0;
      }
    }

    .day {
      font-size: 18px;
    }

    .month {
      font-size: 16px;
    }
  }

  .nav-right {
    float: right;
    margin-top: 5px;
    margin-right: 10px;
    width: 40px;
    height: 40px;

    img {
      display: inline-block;
      vertical-align: top;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }

  .search {
    float: left;
    margin-top: 8px;
    width: 290px;

    .van-search {
      float: left;
      padding: 0;
      width: 227px;
    }

    .search-btn {
      // display: inline-block;
      // padding: 10px;
      float: left;
      width: 60px;
      height: 34px;
      font-size: 14px;
      line-height: 34px;
      text-align: center;
      color: #444;
      background-color: #f2f2f2;
    }
  }
}
</style>