<template>
  <div>
    <!-- <van-collapse v-model="activeNames">
      <van-collapse-item :title="name" name="1" border="false"> -->
    <li class="comment-li" v-for="item in Comment" :key="item.id" @click="show">
      <div class="img-box">
        <img :src="item.avatar" alt="头像" />
      </div>
      <div class="comment-content">
        <div class="content-header">
          <div class="author">{{ item.author }}</div>
          <div class="likes">{{ item.likes }}</div>
        </div>
        <div class="content-main">
          <p class="comment-text">{{ item.content }}</p>
          <p class="reply" v-if="item.reply_to">
            <span class="reply_author">{{ item.reply_to.author }}</span>
            <span class="replying">&nbsp;回复：</span>
            <span>{{ item.reply_to.content }}</span>
          </p>
        </div>
        <br />
        <div class="content-time">
          {{ item.time | getTemplateTimeByDate("hh:mm") }}
        </div>
      </div>
    </li>
    <!-- </van-collapse-item>
    </van-collapse> -->
  </div>
</template>

<script>
import { getTemplateTimeByDate } from "../../assets/js/tool";

export default {
  props: {
    Comment: {
      type: Array,
    },
    item: {
      type: Object,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      activeNames: ["1"],
    };
  },
  methods: {
    show() {
      this.$emit("show-mask");
    },
  },
  filters: {
    getTemplateTimeByDate,
  },
};
</script>

<style lang="scss" scoped>
.comment-li {
  position: relative;
  padding: 10px 15px 10px 55px;
  border-top: 1px solid #c3c3c3;

  .img-box {
    position: absolute;
    top: 12px;
    left: 15px;

    img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
  }

  .comment-content {
    display: flex;
    flex-direction: column;

    .content-header {
      display: flex;
      margin-bottom: 5px;
      flex-direction: row;

      .author {
        flex: 1;
        font-size: 15;
        font-weight: bold;
      }
      .likes {
        font-size: 12px;
        color: #b0b0b0;
      }
    }

    .content-main {
      padding-right: 15px;
      font-size: 14px;

      .comment-text {
        line-height: 20px;
        color: #1d1d1d;
      }

      .reply {
        margin-top: 10px;
        font-size: 15px;
        font-weight: bold;

        > span {
          font-size: 14px;
          font-weight: normal;
          color: #8c8c8c;
        }

        .replying {
          font-weight: 700;
          color: #1a1a1a;
        }
      }
    }

    .content-time {
      font-size: 13px;
      color: #b0b0b0;
    }
  }
}
</style>