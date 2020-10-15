<template>
  <div>
    <van-swipe :autoplay="3000" class="wrapper">
      <van-swipe-item
        class="articlr-wrapper"
        v-for="banner in banners"
        :key="banner.id"
        @click="GotoArticleDetail(banner.id)"
      >
        <img v-lazy="banner.image" />
        <div class="article-info">
          <p class="title">{{banner.title}}</p>
          <p class="hint">{{banner.hint}}</p>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["banners"],
  methods: {
    GotoArticleDetail(currentId) {
      this.$router.push({ name: "Detail", params: { id: currentId } });
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 50px;
  height: 350px;

  img {
    width: 100%;
    height: 100%;
    background-size: contain;
  }

  .articlr-wrapper {
    position: relative;

    .article-info {
      position: absolute;
      bottom: 40px;
      left: 15px;

      .title {
        font-size: 18px;
        margin-bottom: 10px;
        color: #f9fcff;
      }

      .hint {
        font-size: 16px;
        color: #c1c8d6;
      }
    }
  }
}
</style>