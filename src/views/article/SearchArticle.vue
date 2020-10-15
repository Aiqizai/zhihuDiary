<template>
  <div class="search-wrapper">
    <p class="back-title">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
    </p>
      <div class="search-result">搜索结果</div>
      <ArticleItem :article="articleList" />
    <van-empty image="search" :description="description" v-show="ShowTips" />
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";

export default {
  data() {
    return {
      data: "",
      articleList: [],
      ShowTips: false,
      description: '暂无相关文章！！！'
    };
  },
  created() {
    this.getDataFromServe();
  },
  methods: {
    Back() {
      // 判断回到的页面
      this.$router.push("/");
    },
    getDataFromServe() {
      this.$toast.loading({
        message: "搜索中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      this.data = Number(JSON.parse(localStorage.getItem("val")));
      console.log(this.data, typeof this.data, "前");
      // 判断data的值，如果是number类型才允许请求数据
      // if(typeof this.data !== Number){
      //     return
      // }else{
      console.log(this.data, typeof this.data, "后");
      // 请求数据
      this.axios(
        `/api/before?token=XuFmemPOGDu9OuaV7wUM&date=${this.data}`
      ).then((res) => {
        this.$toast.clear();

        if (res.status === 200) {
          this.articleList = res.data.data.stories;
          console.log(this.articleList);
        }

        if(res.status === 422) {
          this.description = '请输入正确的日期再搜索！！！'
        }

        // 判断是否有数据返回
        if (this.articleList === undefined) {
          console.log(11111);
          // 提示搜索结果为空
          this.ShowTips = true;
        }
      })
    }
  },
  components: {
    ArticleItem
  },
}
</script>

<style lang="scss" scoped>
.search-wrapper {
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

  .search-result {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    background-color: #f6f6f6;
  }
}
</style>