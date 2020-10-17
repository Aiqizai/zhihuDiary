<template>
  <div class="wrapper" :style="{ display: display }">
    <ArticleItem :article="refreshDate" />
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";

export default {
  props: {
    refreshDate: {
      type: Array,
    },
    display: {
      type: String,
    },
  },
  components: {
    ArticleItem,
  },
};
</script>

<style lang="scss" scoped>
.time {
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  color: #ec8181;
}
</style>