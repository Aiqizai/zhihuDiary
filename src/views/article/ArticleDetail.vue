<template>
  <div class="article-detail-wrapper">
    <div v-html="body"></div>
    <RenderCss :href="css" />
    <div class="footer" ref="getContainer">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
      <span class="line"></span>
      <span class="icon-wrapper">
        <!-- <i class="icon-message comment-icon" @click="GotoCommentView"></i> -->
        <van-icon name="comment-o comment-icon" @click="GotoCommentView" :badge="commentLenght" color="#1a1a1a"/>
        <i
          class="icon-star star-icon"
          :class="{ active: isActive === true }"
          @click="showPopup"
        ></i>
        <i class="icon-share share-icon" @click="showShare = true">
          <van-share-sheet
            v-model="showShare"
            :options="options"
            @select="onSelect"
            :get-container="getContainer"
          />
        </i>
        <!-- <span>{{getCurrentArticleId}}</span> -->
      </span>
    </div>
    <!-- 登录提示 -->
    <van-popup
      v-model="show"
      position="bottom"
      round
      :style="{ height: '30%' }"
    >
      <p class="login-tips">亲,你还没有登录哟~</p>
      <van-button plain type="primary" class="login-btn" @click="GotoLogin"
        >去登录</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import RenderCss from "../../components/RenderCss";

export default {
  data() {
    return {
      id: "",
      body: "",
      css: "",
      commentCount: "",
      show: false,
      showShare: false, // 展示分享面板
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
        ],
      ],
      isActive: false, // 收藏高亮
      idArr: [], // 存储当前文章的id
      sum: "",
      iscollect: false,
      bool: true,
      shortComment: [],
      longComment: [],
      commentLenght: ''
    };
  },
  // mounted() {
  //   let imgWrapper = document.getElementsByClassName("img-place-holder")[0];
  //   console.log(imgWrapper)

  //   imgWrapper.setAttribute("backgroundImage","url('https://pic2.zhimg.com/v2-0ca033f4b6794fa0aac18701b1a54afb.jpg?source=8673f162')")
  //   imgWrapper.setAttribute("backgroundRepeat","no-repeat")
  //   imgWrapper.setAttribute("backgroundSize","cover")
  // },
  computed: {
    getCurrentArticleId() {
      // 记录当前文章的id
      return this.idArr.concat(this.id);
    }
  },
  created() {
    this.id = this.$route.params.id;

    this.getDateFromServer();
    this.getCommentLengthFromServer();

    // 判断是否已收藏，已收藏高亮
    if (this.id === JSON.parse(localStorage.getItem("collectId"))) {
      this.isActive = true;
    }
  },
  methods: {
    getDateFromServer() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      this.axios(`/api/news?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`)
        .then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();

          console.log(res);
          if (res.status === 200) {
            this.body = res.data.data.body;
            this.css = res.data.data.css[0];
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
    },
    getCommentLengthFromServer() {
      this.axios
        .all([
          this.axios.get(
            `/api/short_comments?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`
          ),
          this.axios.get(
            `/api/long_comments?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`
          ),
        ])
        .then(
          this.axios.spread((shortComment, longComment) => {
            // 上面两个请求都完成后，才执行这个回调方法
            this.shortComment = shortComment.data.data.comments;
            this.longComment = longComment.data.data.comments;
            this.commentLenght = this.shortComment.length + this.longComment.length;
          })
        )
        .catch((error) => {console.log(error)});
    },
    Back() {
      // 如果是在文章详情页就返回首页
      if (this.$route.name === "Detail") {
        this.$router.push("/");
      }
    },
    GotoCommentView() {
      this.$router.push({ name: "Comment", params: this.id });
    },
    GotoLogin() {
      this.$router.push({
        name: "Login",
        params: { isBackDetail: 1, id: this.id },
      });
    },
    // GetSum() {
    //   // // 产生0-1的随机数
    //   this.sum =  Math.floor(Math.random() * 1000 + 1);
    //   return this.sum
    // 	// for(var i=1;i<=100;i++){ // i的作用域：for循环内部
    // 	// 	this.sum += i;
    //   // }
    // },
    showPopup() {
      // 判断是否已经登录,没有登录就弹出提示框
      if (!localStorage.getItem("info")) {
        // 显示登录提示框
        this.show = true;
      }
      if (this.bool) {
        if (localStorage.getItem("info")) {
          // 显示收藏成功 => 在我的页面中收藏显示改文章
          // 存好当前文章的id到本地存储,在收藏页面获取Id进行相应的渲染
          this.$toast({
            message: "收藏成功！",
            icon: "like-o",
          });
          // 存好id
          // this.idArr.push(this.id);
          // console.log(this.idArr);
          localStorage.setItem("collectId", JSON.stringify(this.id));
          this.iscollect = true;
          this.isActive = true;
          this.bool = false;
        }
      } else {
        //  取消收藏
        // if (this.iscollect === true && localStorage.getItem("collectId")) {
        this.$toast({
          message: "取消收藏！",
          icon: "like-o",
        });
        localStorage.removeItem("collectId");
        // 是否收藏
        this.iscollect = false;
        // 切换收藏状态
        this.isActive = false;
        // 切换收藏和取消收藏状态
        this.bool = true;
        // }
      }
    },
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    getContainer() {
      // 返回一个特定的 DOM 节点，作为挂载的父节点
      return this.$refs.getContainer;
    },
  },
  // 路由守卫解决用户强制访问当前页面,当前页面只能通过路由点击跳转访问
  // beforeRouteEnter(to, from, next) {
  //   // console.log(to, 123);
  //   if (to.params.id) {
  //     next();
  //   } else {
  //     next("/");
  //     // console.log("返回主页");
  //   }
  // },
  components: {
    RenderCss,
  },
};
</script>

<style lang="scss" scoped>
.article-detail-wrapper {
  min-height: 620px;
  overflow: auto;
  margin-bottom: 40px;

  .footer {
    position: fixed;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: #fff;

    .line {
      position: absolute;
      top: 22%;
      left: 18%;
      width: 2px;
      height: 23px;
      line-height: 23px;
      background-color: #d3d3d3;
    }

    .back-icon {
      position: absolute;
      top: 50%;
      left: 8%;

      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      transform: translateY(-50%);
    }

    .icon-wrapper {
      .comment-icon,
      .star-icon,
      .share-icon {
        position: absolute;
        top: 50%;
        font-size: 18px;
        font-weight: 700;
        color: #1a1a1a;
        transform: translateY(-50%);
      }

      .comment-icon {
        left: 33%;
        top: 55%;
      }

      .star-icon {
        left: 60%;

        &.isActive {
          color: #e4393c;
        }
      }

      .share-icon {
        left: 90%;
      }

      .comment-count {
        position: absolute;
      }
    }
  }

  .login-tips {
    // position: fixed;
    // top: 0;
    // right: 0;
    // left: 0;
    // z-index: 20;
    // padding: 64px 36px;
    // min-height: 100vh;
    // color: #fff;
    // background-color: rgba(7, 17, 27, 0.8);
    margin: 60px auto 20px !important;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }

  .login-btn {
    display: block;
    margin: 0 auto;
  }

  .active {
    color: red !important;
  }
}
</style>