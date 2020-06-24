<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name" />
    </div>

    <!-- 宫格 -->
    <div class="grid">
      <div class="box" v-for="(item, index) in grid" :key="index">
        <img v-lazy="item.imgUrl" alt />
        <p>{{item.title}}</p>
      </div>
    </div>

    <!-- 内容 -->
    <div class="goods">
      <h4>口碑好货</h4>
      <div class="goodContent" v-for="(item, index) in goods" :key="index">
        <img v-lazy="item.imgUrl" alt style="pointer-events: none;"/>
        <p class="name">{{item.name}}</p>
        <p class="promotion">{{item.promotion}}</p>
        <div class="board"></div>
      </div>
    </div>

    <div class="loading" v-show="loadingFlag"></div>

    <div class="over" v-show="overFlag">人家也是有底线的</div>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/public/tabbar.vue";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      grid: [
        {
          imgUrl:
            "https://res.vmallres.com/nwap/20190115/staticm/img/find/icon_headline.png",
          title: "商城公告"
        },
        {
          imgUrl:
            "https://res.vmallres.com/pimages//cop/image/2019/tiHS593NPXbqgwfT47xk.png",
          title: "企业购"
        },
        {
          imgUrl:
            "https://res.vmallres.com/nwap/20190115/staticm/img/find/icon_fans.png",
          title: "粉丝互动"
        },
        {
          imgUrl:
            "https://res.vmallres.com/pimages///cop/image/2019/nwylDYIPCm4pn2hNwA46.png",
          title: "视频专区"
        },
        {
          imgUrl:
            "https://res.vmallres.com/nwap/20190115/staticm/img/find/icon_public_surver.png",
          title: "华为众测"
        }
      ],
      goods: [],
      num: 0,
      bool: true,
      overFlag:false,
      loadingFlag:false
    };
  },
  async created() {
    let _this = this;
    await this.$axios
      .get("/getFoundList", {
        params: {
          page: 0,
          pageSize: 5
        }
      })
      .then(obj => {
        if (obj.data.err_code == 0) {
          _this.goods = obj.data.result;
          _this.num = obj.data.num;
        }
      });
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
  },
  methods: {
    // 获取滚动条当前的位置
    getScrollTop() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    // 获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }
      return clientHeight;
    },
    // 获取文档完整的高度
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    },
    // 滚动事件触发下拉加载
    async onScroll() {
      if (
        this.getScrollHeight() - this.getClientHeight() - this.getScrollTop() <
          100 &&
        this.bool
      ) {
        this.getData(this.num, 5);
      }
    },
    async getData(a, b) {
      let _this = this;
      let page = a || 0;
      let pageSize = b || 0;
      if (!this.bool) {
        return;
      }
      await this.$axios.interceptors.request.use((config)=>{
        _this.bool=false
        _this.loadingFlag=true
        return config
      },(err)=>{
        return Promise.reject(err)
      })
      await this.$axios
        .get("/getFoundList", {
          params: {
            page,
            pageSize
          }
        })
        .then(obj => {
          if (obj.data.err_code == 0) {
            obj.data.result.forEach(item => {
              _this.goods.push(item);
            });
            _this.num = obj.data.num;
            if(obj.data.result.length==0){
              _this.overFlag=true
              _this.loadingFlag=false
              return
            }
            _this.bool = true;
            _this.loadingFlag=false
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  background-color: #fff;
  padding: 0 16px;
  margin-bottom: 10px;
  display: flex;
  .box {
    width: 25%;
    padding: 21px 0;
    img {
      width: 50%;
      display: block;
      margin: 0 auto;
    }
    p {
      margin: 0;
      padding-top: 4px;
      color: #9b9b9b;
      font-size: 12px;
      text-align: center;
    }
  }
}
.goods {
  margin-bottom: 10px;
  background-color: #fff;
  h4 {
    margin: 0;
    padding: 20px 0 10px 0;
    text-align: center;
  }
  .goodContent {
    padding: 0 10px;
    img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 12px;
    }
    p.name {
      margin: 0 10px 6px 10px;
      font-size: 16px;
      color: #333;
    }
    p.promotion {
      overflow: hidden;
      font-size: 12px;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding: 0 10px;
      margin: 0;
    }
    .board {
      height: 20px;
      background-color: #fff;
    }
  }
}
.over {
  margin-bottom: 60px;
  text-align: center;
  color: #999;
}
.loading{
  width: 100%;
  height: 100px;
  background: url("../assets/img/found/loading.gif") center -55px no-repeat;
  background-color: #171B1F;
  background-size: auto 200px;
  margin-bottom: 80px;
}
</style>