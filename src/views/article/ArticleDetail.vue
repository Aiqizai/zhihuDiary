<template>
  <div class="article-detail-wrapper" ref="addImage">
    <div v-html="body" ref="capture"></div>
    <RenderCss :href="css" />
    <div class="footer" ref="getContainer">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
      <span class="line"></span>
      <span class="icon-wrapper">
        <!-- <i class="icon-message comment-icon" @click="GotoCommentView"></i> -->
        <van-icon
          name="comment-o comment-icon"
          @click="GotoCommentView"
          :badge="commentLenght"
          color="#1a1a1a"
        />
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
import html2canvas from "html2canvas";

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
          { name: "生成海报长图", icon: "link" },
        ],
      ],
      isActive: false, // 收藏高亮
      idArr: [], // 存储当前文章的id
      sum: "",
      iscollect: false,
      bool: true,
      shortComment: [],
      longComment: [],
      commentLenght: "",
      nowArr: [], // 判断是否已收藏
      cancleArr: [] // 取消收藏
    };
  },
  computed: {
    getCurrentArticleId() {
      // 记录当前文章的id
      return this.idArr.concat(this.id);
    },
  },
  created() {

    this.id = this.$route.params.id;

    this.getDateFromServer();
    this.getCommentLengthFromServer();

    this.isCollect();
  },
  methods: {
    isCollect() {
      if (localStorage.getItem("collectId")) {
        // 判断是否已收藏，已收藏高亮
        this.nowArr = JSON.parse(localStorage.getItem("collectId"));
        this.nowArr.map((element) => {
          if (Number(element.id) === this.id) {

            this.isActive = true;
          } else {
            this.$toast('未收藏！')
          }
        })
      }
    },
    getDateFromServer() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      this.axios(`/news?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`)
        .then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();

          // 
          if (res.status === 200) {
            this.body = res.data.data.body;
            this.css = res.data.data.css[0];
            let str1 = this.body.substring(0, 36);
            let str3 = this.body.substring(108);
            this.body = str1 + str3;
            // 
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
            `/short_comments?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`
          ),
          this.axios.get(
            `/long_comments?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`
          ),
        ])
        .then(
          this.axios.spread((shortComment, longComment) => {
            // 上面两个请求都完成后，才执行这个回调方法
            this.shortComment = shortComment.data.data.comments;
            this.longComment = longComment.data.data.comments;
            this.commentLenght =
              this.shortComment.length + this.longComment.length;
          })
        )
        .catch((error) => {
            this.$toast(error);
        })
    },
    Back() {
      // 如果是从收藏页过来的就回到收藏页
      if (this.$route.params.isCollect) {
        this.$router.push("/collect");
      } else {
        // 否则回到首页
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
      })
    },
    showPopup() {
      // 判断是否已经登录,没有登录就弹出提示框
      if (!localStorage.getItem("info")) {
        // 显示登录提示框
        this.show = true;
      }
      if (this.bool) {
        if (localStorage.getItem("info")) {
          // 存好当前文章的id到本地存储,在收藏页面获取Id进行相应的渲染
          this.$toast({
            message: "收藏成功！",
            icon: "like-o",
          })
          // 存储id
          // 判断是否一存在storage字段
          let storage = window.localStorage.getItem("collectId");
          storage = storage ? JSON.parse(storage) : [];
          storage.push({ id: this.id });
          window.localStorage.setItem("collectId", JSON.stringify(storage));

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
        // this.cancleArr = JSON.parse(localStorage.getItem("collectId"));
        // this.cancleArr.filter((element) => {
        //   if (Number(element.id) === this.id) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // })
        // 
        // 是否收藏
        this.iscollect = false;
        // 切换收藏状态
        this.isActive = false;
        // 切换收藏和取消收藏状态
        this.bool = true;
        // }
      }
    },
    // toast弹窗的回调事件
    onSelect(option) {
      this.$toast(option.name);

      // 通过canvas生成图片
      html2canvas(this.$refs.capture, {
        // 防止图片素材出现跨域,会产生图片不显示问题
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        // this.$refs.addImage.append(canvas);//在下面添加canvas节点
        let link = document.createElement("a");
        // 设置属性
        link.href = canvas.toDataURL(); //下载链接
        link.setAttribute("download", "海报.png");
        link.style.display = "none"; //a标签隐藏
        document.body.appendChild(link);
        link.click();
      });
      // 关闭面板
      this.showShare = false;
    },
    getContainer() {
      // 返回一个特定的 DOM 节点，作为挂载的父节点
      return this.$refs.getContainer;
    },
  },
  components: {
    RenderCss,
  }
}
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