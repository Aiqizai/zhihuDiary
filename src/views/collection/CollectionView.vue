<template>
  <div class="collect-wrapper">
    <p class="back-title">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
      <span class="text">收藏</span>
    </p>
    <div class="collect-content">
      <ul class="ul" v-if="idInfo">
        <li class="article-list" @click="gotoDetail">
          <div class="article-list-text">
            <p class="article-title">{{ title }}</p>
          </div>
          <div class="article-list-img">
            <img :src="images" alt />
          </div>
        </li>
      </ul>
      <!-- 没有收藏文章的提示 -->
      <van-empty description="暂无收藏" v-show="!idInfo" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idInfo: "",
      id: "", // 获取id
      data: "",
      title: "",
      images: "",
    };
  },
  created() {
    this.getId();
  },
  methods: {
    Back() {
      this.$router.back();
    },
    getId() {
      if (localStorage.getItem("collectId")) {
        this.idInfo = JSON.parse(localStorage.getItem("collectId"));
        // console.log(this.id.id);
        this.id = this.idInfo;
        console.log(this.id);
        // console.log(this.arr.id, "收藏");
        // this.id = this.arr.id;

        this.axios(`/api/news?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`).then(
          (res) => {
            this.data = res.data.data;
            this.title = this.data.title;
            this.images = this.data.images;
          }
        );
      }
    },
    gotoDetail() {
      this.$router.push({ name: "Detail", params: { id: this.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.collect-wrapper {
  .back-title {
    position: relative;
    padding: 10px;
    border-bottom: 1px solid #ebebeb;
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

  .collect-content {
    height: 94vh;
    background-color: #f6f6f6;

    .article-list {
      display: flex;
      overflow: auto;
      //   margin-top: 25px;
      padding: 10px;
      background-color: #fff;

      .article-list-text {
        flex: 1;

        .article-title {
          font-size: 14px;
          line-height: 2;
          color: #c1c8d6;
        }
      }

      .article-list-img {
        flex: 0 0 50px;
        width: 50px;
        height: 50px;

        img {
          border-radius: 5px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>