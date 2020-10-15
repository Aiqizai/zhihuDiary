<template>
  <div class="wrapper">
    <!-- 顶部组件 -->
    <NavBar />
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <!-- 轮播图组件 -->
    <Carousel :banners="banners" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getRefreshDate"
    >
      <van-cell>
        <!-- 文章组件 -->
        <ArticleItem :article="article" />
        <!-- 下拉刷新产生的数据 -->
        <RefreshArticle
          v-show="showRefresh"
          :refreshDate="refreshDate"
          :resDate="resDate"
          :display="display"
        />
      </van-cell>
    </van-list>

    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import ArticleItem from "./article/ArticleItem";
import RefreshArticle from "./article/RefreshArticle";
// import BScroll from "better-scroll";

export default {
  data() {
    return {
      banners: [],
      article: [],
      isLoading: false,
      showRefresh: false,
      currentData: "",
      resDate: "",
      refreshDate: [],
      loading: false,
      finished: false,
      display: ""
    };
  },
  created() {
    this.currentData = this.getMonth;
    this.resDate = Number(this.currentData) - 1;
    this.getDataFromServe();
  },
  computed: {
    getMonth() {
      // 获取月份
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month =
        nowDate.getMonth() + 1 < 10
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
      let day =
        nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();

      return year.toString() + month.toString() + day.toString();
    },
  },
  methods: {
    getDataFromServe() {
      // 开始网络请求 弹出加载轻提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      this.axios(`/api/latest?token=XuFmemPOGDu9OuaV7wUM`)
        .then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();

          console.log(res);
          if (res.status === 200) {
            this.banners = res.data.data.top_stories;
            this.article = res.data.data.stories;
            console.log(this.article);
          }
          // this.initalBScoller()
        })
        .catch(() => {
          // 数据请求失败时展示失败轻提示
          this.$toast.fail({
            message: "网络异常",
            duration: 500,
          });
          // alert("网络出现异常!");
        });
    },
    GotoArticleDetail(currentId) {
      // this.axios('/api/news?token=XuFmemPOGDu9OuaV7wUM')
      this.$router.push({ name: "Detail", params: { id: currentId } });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.showRefresh = true;
        console.log(this.currentData);
        console.log(this.resDate, "最终");
        console.log(Number(this.currentData) - 1);
        this.getRefreshDate();
      }, 1000);
    },
    getRefreshDate() {
      this.axios(
        `/api/before?token=XuFmemPOGDu9OuaV7wUM&date=${
          Number(this.currentData) - 1
        }`
      ).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.refreshDate = res.data.data.stories;
          this.display = "block"
          console.log(this.refreshDate, "刷新请求的数据");
          // 加载状态结束
          this.loading = false;
        // 数据全部加载完成
          this.finished = true;
        }
      })
      .catch(() => {
          // 数据请求失败时展示失败轻提示
          this.$toast.fail({
            message: "网络异常",
            duration: 500,
          });
          // alert("网络出现异常!");
        });
    }
  },
  components: {
    NavBar,
    Carousel,
    ArticleItem,
    RefreshArticle,
  },
};
</script>