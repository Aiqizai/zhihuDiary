<template>
  <div>
    <div class="article-wrapper">
      <div
        class="article-list"
        v-for="item in article"
        :key="item.id" 
        @click="GotoArticleDetail(item.id)"
      >
        <div class="article-list-text">
          <p class="article-title">{{ item.title }}</p>
          <p class="article-hint">{{ item.hint }}</p>
        </div>
        <div class="article-list-img">
          <img :src="item.images" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  props: {
    article: {
      type: Array,
    }
  },
  methods: {
    GotoArticleDetail(currentId) {
      this.$router.push({ name: "Detail", params: { id: currentId } });
    }
  }
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  padding: 0 10px;
}

.article-list {
  display: flex;
  overflow: auto;
  margin-top: 25px;

  .article-list-text {
    flex: 1;

    .article-title {
      font-size: 14px;
      margin-bottom: 10px;
      color: #1a1a1a;
    }

    .article-hint {
      font-size: 12px;
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
</style>