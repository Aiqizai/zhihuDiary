<template>
  <div class="wrapper">
    <!-- 顶部组件 -->
    <NavBar />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 轮播图组件 -->
      <Carousel :banners="banners" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell>
          <!-- 文章组件 -->
          <!-- <ArticleItem :article="article" /> -->
          <!-- 下拉刷新产生的数据 -->
          <RefreshArticle
            v-show="showRefresh"
            :refreshDate="refreshDate"
            :display="display"
          />
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
// import ArticleItem from "./article/ArticleItem";
import RefreshArticle from "./article/RefreshArticle";
// import BScroll from "better-scroll";

export default {
  data() {
    return {
      banners: [],
      article1: [],
      article2: [],
      article3: [],
      isLoading: false,
      showRefresh: false,
      currentData: "",
      resDate: "",
      refreshDate: [],
      loading: false,
      finished: false,
      display: "",
      refreshing: false,
    };
  },
  created() {
    // this.currentData = this.getMonth;
    // this.resDate = Number(this.currentData) - 1;
    // this.getDataFromServe();
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
    GotoArticleDetail(currentId) {
      this.$router.push({ name: "Detail", params: { id: currentId } });
    },
    onLoad() {
      this.axios
        .all([
          this.axios.get(`/latest?token=XuFmemPOGDu9OuaV7wUM`),
          this.axios.get(
            `/before?token=XuFmemPOGDu9OuaV7wUM&date=${
              Number(this.getMonth) - 1
            }`
          ),
          this.axios.get(
            `/before?token=XuFmemPOGDu9OuaV7wUM&date=${
              Number(this.getMonth) - 2
            }`
          ),
        ])
        .then(
          this.axios.spread((data1, data2, data3) => {
            if (this.refreshing) {
              this.refreshDate = [];
              this.refreshing = false;
            }
            this.banners = data1.data.data.top_stories;
            this.article1 = data1.data.data.stories;
            this.article2 = data2.data.data.stories;
            this.article3 = data3.data.data.stories;
            this.article1.push(...this.article2);
            this.article1.push(...this.article3);
            this.refreshDate = this.article1;
            this.display = "block";
            
            // 加载状态结束
            this.loading = false;
            if (data1.status === 200) {
              // 数据全部加载完成
              this.finished = true;
            }
          })
        )
        .catch((err) => {
          // 数据请求失败时展示失败轻提示
          this.$toast.fail({
            message: "网络异常",
            duration: 500,
          })
          console.log(err);
        })
       this.axios({
          method: 'GET',
          url: '/latest',
          params: {
            token: this.token
          }
        }).then(result => {
          this.$toast.clear();
          console.log('result ==> ', result);

        }).catch(err => {
          this.$toast.clear();
          console.log('err ==> ', err);
        })
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();

      this.$toast.success({ message: "刷新成功" });
    }
  },
  components: {
    NavBar,
    Carousel,
    // ArticleItem,
    RefreshArticle,
  }
}
</script>