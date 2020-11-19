<template>
  <div class="collect-wrapper">
    <p class="back-title">
      <i class="icon-arrow_lift back-icon" @click="Back"></i>
      <span class="text">收藏</span>
    </p>
    <div class="collect-content">
      <ul class="ul" v-if="idInfo">
        <li
          class="article-list"
          @touchstart="start"
          @touchmove="move"
          @touchend="end"
          v-for="item in dataArr"
          :key="item.id"
          
        >
          <div class="article-list-text" ref="myItem">
            <p class="article-title">{{ item.title }}</p>
          </div>
          <div class="article-list-img">
            <img :src="item.images" alt />
          </div>
        </li>
      </ul>
      <!-- 没有收藏文章的提示 -->
      <van-empty description="暂无收藏" v-if="!id" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idInfo: [],
      id: "", // 获取id
      data: "",
      dataArr: [],
      longClick: 0,
      timeOutEvent: 0,
    };
  },
  mounted() {
    this.getId();
  },
  methods: {
    Back() {
      this.$router.back();
    },
    // 获取已收藏文章的id
    getId() {
      if (localStorage.getItem("collectId")) {
        this.idInfo = JSON.parse(localStorage.getItem("collectId"));
        
        this.idInfo.forEach((element) => {
          this.id = Number(element.id);

          this.axios(`/news?token=XuFmemPOGDu9OuaV7wUM&id=${this.id}`).then(
            (res) => {
              this.data = res.data.data;
              this.dataArr = [...this.dataArr, this.data];
            }
          )
        })
      }
    },
    //1）调用js的touch的API接口分别监听touchstart,touchmove,touchend事件

    // 2）使用计时器可以设定时间用于区分长按和点击
    start() {
      this.longClick = 0;
      this.timeOutEvent = setTimeout(() => {
        this.longClick = 1;
        // 询问是否要删除
        this.$dialog
          .confirm({
            message: "是否要取消收藏?",
            theme: "round-button",
          })
          .then(() => {
            // on confirm
            
            
          })
          .catch(() => {
            // on cancel
            
          })
        
      }, 500)
    },
    move(e) {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
      e.preventDefault();
      
    },
    end() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0 && this.longClick == 0) {
        // 点击
        // 此处为点击事件----在此处添加跳转详情页
        this.$router.push({
          name: "Detail",
          params: { isCollect: 1, id: this.id },
        });
        
        
      }
      return false;
    }
  }
}
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