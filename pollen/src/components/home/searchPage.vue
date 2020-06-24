<template>
  <div>
    <!-- 导航栏 -->
    <div class="nav">
      <router-link to class="back">
        <span @click="$router.go(-1)"></span>
      </router-link>
      <input type="text" placeholder="Mate 30" v-model="keyboard" />
      <span class="searchBtn" @click="onSearch">搜索</span>
    </div>

    <!-- 热门推荐 -->
    <div class="searchHot">
      <div class="title">热门搜索</div>
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in searchArr(keyboard)"
            :key="index"
            @click="addHistory(item)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="history" v-show="history.length!=0">
      <div class="title">
        搜索历史
        <span @click="clearHistory">清空</span>
      </div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in history" :key="index">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      keyboard: "",
      tags: [
        { name: "Mate Xs" },
        { name: "荣耀V30" },
        { name: "Mate 30" },
        { name: "荣耀20 Pro" },
        { name: "MateBook 14" },
        { name: "荣耀9X" },
        { name: "MatePad" },
        { name: "荣耀30S" },
        { name: "Play3" },
        { name: "荣耀9X" },
        { name: "nova 6" },
        { name: "荣耀20青春版" }
      ],
      history: []
    };
  },
  beforeMount() {
    if (!localStorage.searchHistoryList) {
      localStorage.searchHistoryList = [];
    }else{
      this.history = JSON.parse(localStorage.searchHistoryList)
    }
  },
  methods: {
    addHistory(item) {
      let _this = this
      this.history.push(item);
      this.$axios.get("/search",{params:{name:item.name}}).then(res=>{
        if (res.data.dataObj.err_code == 1) {
            Toast("未能找到，请输入有效物品");
            for (let i = 0; i < _this.history.length; i++) {
              if (_this.keyboard == _this.history[i].name) {
                return;
              }
            }
            localStorage.searchHistoryList = JSON.stringify(_this.history);
          }
          if (res.data.dataObj.err_code == 0) {
            _this.$router.push("/detail?id=" + res.data.data[0].id);
            for (let i = 0; i < _this.history.length; i++) {
              if (_this.keyboard == _this.history[i].name) {
                return;
              }
            }
            localStorage.searchHistoryList = JSON.stringify(_this.history);
          }
      })
    },
    clearHistory() {
      this.history = [];
    },
    searchArr(keyboard) {
      return this.tags.filter(item => {
        if (item.name.indexOf(keyboard) != -1) {
          return item;
        }
      });
    },
    onSearch() {
      let _this = this;
      this.$axios
        .get("/search", { params: { name: this.keyboard } })
        .then(res => {
          if (res.data.dataObj.err_code == 1) {
            Toast("未能找到，请输入有效物品");
            for (let i = 0; i < _this.history.length; i++) {
              if (_this.keyboard == _this.history[i].name) {
                return;
              }
            }
            _this.history.push({ name: _this.keyboard });
            localStorage.searchHistoryList = JSON.stringify(_this.history);
          }
          if (res.data.dataObj.err_code == 0) {
            _this.$router.push("/detail?id=" + res.data.data[0].id);
            for (let i = 0; i < _this.history.length; i++) {
              if (_this.keyboard == _this.history[i].name) {
                return;
              }
            }
            _this.history.push({ name: _this.keyboard });
            localStorage.searchHistoryList = JSON.stringify(_this.history);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin title() {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}
.nav {
  height: 42px;
  display: flex;
  background-color: #fff;
  a.back {
    display: block;
    width: 25px;
    height: 25px;
    background: url(../../assets/img/home/searchPage/arrow_left.png) 0 0
      no-repeat;
    background-size: 25px 25px;
    margin: auto 0 auto 16px;
    span {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  input {
    font-size: 14px;
    color: #333;
    height: 33px;
    line-height: 33px;
    margin: auto 0 auto 8px;
    padding: 0 8px 0 35px;
    border: 0;
    background: url(../../assets/img/home/icon_search.png) 12px 9px no-repeat;
    background-size: 15px 15px;
    background-color: #f9f9f9;
    width: 58%;
    border-radius: 33px;
  }
  .searchBtn {
    margin: auto 0;
    flex: 1;
    color: #4c4c4c;
    font-size: 14px;
    text-align: center;
  }
}
.searchHot {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 8px;
  .title {
    @include title();
  }
  .content {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 7px 0;
        font-size: 12px;
        background-color: #f9f9f9;
        height: 25px;
        line-height: 25px;
        padding: 0 11px;
        margin-right: 8px;
      }
    }
  }
}
.history {
  background-color: #fff;
  padding: 16px;
  .title {
    display: flex;
    justify-content: space-between;
    height: 25px;
    line-height: 10px;
    @include title();
    span {
      color: #888;
      font-weight: normal;
    }
  }
  .content {
    ul {
      li {
        border-top: 1px solid #eaeaea;
        height: 41px;
        line-height: 41px;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>