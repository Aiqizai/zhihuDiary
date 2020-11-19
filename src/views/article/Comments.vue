<template>
  <div class="comment-wrapper">
    <div class="comment-title">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
      <!-- 总评论数 -->
      <span class="comment-count">{{ getCommentLenght }}条评论</span>
    </div>
    <div class="line"></div>
    <div class="comment-content">
      <!-- 短评 -->
      <div class="short-comment">
        <p class="all-short-comment">{{ shortComment.length }}条短评</p>
        <ul class="comment-list">
          <!-- 引入评论单元组件  li -->
          <CommentsComp
            :name="name1"
            :Comment="shortComment"
            @show-mask="show"
          />
        </ul>
      </div>
      <!-- 长评 -->
      <div class="long-comment" v-show="longComment.length !== 0">
        <p class="all-long-comment">{{ longComment.length }}条长评</p>
        <!-- 深度长评虚位以待... -->
        <CommentsComp :name="name2" :Comment="longComment" @show-mask="show" />
      </div>
    </div>
    <!--操作框-->
    <div v-if="showReply" class="mask" @click="hidden">
      <div class="reply-box" @click.stop>
        <p @click="agree">赞同</p>
        <p @click="report">举报</p>
        <p @click="copy">复制</p>
        <p @click="reply">回复</p>
      </div>
    </div>
    <!-- 登录提示 -->
    <van-popup
      v-model="showlog"
      position="bottom"
      round
      :style="{ height: '30%' }"
    >
      <p class="login-tips">亲,你还没有登录哟~</p>
      <van-button plain type="primary" class="login-btn" @click="GotoLogin"
        >去登录</van-button
      >
    </van-popup>
    <!-- 回复框 -->
    <van-popup v-model="showRepInp" position="bottom" :style="{ height: '8%' }">
      <van-field center clearable label="回复内容" placeholder="请输入回复内容">
        <template #button>
          <van-button size="small" type="primary" @click="closeRepInp"
            >发送</van-button
          >
        </template>
      </van-field>
    </van-popup>
  </div>
</template>


<script>
import CommentsComp from "./Comments-Comp";

export default {
  data() {
    return {
      id: "",
      shortComment: [],
      longComment: [],
      name1: "短评",
      name2: "长评",
      showReply: false,
      showlog: false,
      showRepInp: false,
    };
  },
  created() {
    
    this.id = Number(this.$route.params.id);
    this.getDateFromServer();
  },
  computed: {
    getCommentLenght() {
      // 计算评论的总数
      let length = this.shortComment.length + this.longComment.length;
      return length;
    },
  },
  methods: {
    getDateFromServer() {
      
      // 开始网络请求 弹出加载轻提示
      this.$toast.loading({
        message: "评论正在赶来！！！",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      this.axios
        .all([
          this.axios.get(
            `/short_comments?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`
          ),
          this.axios.get(
            `/long_comments?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`
          ),
        ])
        .then(
          this.axios.spread((shortComment, longComment) => {
            // 关闭轻提示
            this.$toast.clear();

            // 上面两个请求都完成后，才执行这个回调方法
            this.shortComment = shortComment.data.data.comments;
            this.longComment = longComment.data.data.comments;

            

            
          })
        )
        .catch(() => {
          // 数据请求失败时展示失败轻提示
          this.$toast.fail({
            message: "网络异常",
            duration: 500,
          });
          // alert("网络出现异常!");
        });
    },
    Back() {
      
      
      this.$router.push({ name: "Detail", params: { id: this.id } });
      this.$emit('sendCommentLength',this.getCommentLenght)
    },
    show() {
      // document.body.style.overflow = "hidden";
      this.showReply = !this.showReply;
    },
    hidden() {
      // document.body.style.overflow = "auto";
      this.showReply = !this.showReply;
    },
    GotoLogin() {
      this.$router.push("/login");
    },
    agree() {
      this.$toast({
        message: "赞同+1",
        icon: "smile-o",
      });
      this.showReply = !this.showReply;
    },
    report() {
      this.$toast({
        message: "举报成功",
        icon: "fail",
      });
      this.showReply = !this.showReply;
    },
    copy() {
      this.$toast({
        message: "已复制",
        icon: "passed",
      });
      this.showReply = !this.showReply;
    },
    reply() {
      

      if (!localStorage.getItem("info")) {
        // 显示登录提示框
        this.showlog = true;
      } else {
        this.showRepInp = true;
        
      }
      this.showReply = !this.showReply;
    },
    closeRepInp() {
      this.showRepInp = false;
    },
  },
  components: {
    CommentsComp,
  },
};
</script>


<style lang="scss" scoped>
.comment-wrapper {
  .comment-title {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    padding: 10px;
    line-height: 1.5;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    width: 100%;
    height: 40px;
    color: #191919;
    background-color: #fff;

    .back-icon {
      position: absolute;
      top: 50%;
      left: 8%;
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      transform: translateY(-50%);
    }
  }

  .line {
    position: absolute;
    top: 42px;
    width: 100%;
    border-bottom: 2px solid #f2f2f2;
  }

  .comment-content {
    padding: 10px;
    margin-top: 40px;

    .short-comment {
      margin-bottom: 20px;

      .all-short-comment {
        margin: 10px 0 10px 0;
        font-size: 15px;
        font-weight: 500;
        height: 20px;
        line-height: 20px;
        color: #191919;
      }
    }

    .long-comment {
      .all-long-comment {
        margin: 10px 0 10px 0;
        font-size: 15px;
        font-weight: 500;
        height: 20px;
        line-height: 20px;
        color: #191919;
      }
    }
  }

  .mask {
    position: fixed;
    transform: translateZ(0);
    top: 0;
    left: 0;
    width: 375px;
    height: 667px;
    background: rgba(0, 0, 0, 0.7);
    z-index: 5;
    .reply-box {
      width: 320px;
      border-radius: 3px;
      padding: 5px 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #f2f2f2;
      > p {
        height: 40px;
        line-height: 40px;
        // border-bottom: 2px solid rgb(163, 161, 161);
        padding: 5px 0;
        font-size: 15px;
      }
    }
  }
  .login-tips {
    margin: 60px auto 20px !important;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }

  .login-btn {
    display: block;
    margin: 0 auto;
  }
}
</style>