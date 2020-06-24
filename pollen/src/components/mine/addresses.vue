<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name">
        <template #left>
          <van-icon name="arrow-left" size="25" color="#555" @click="$router.push('/mine')" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 地址展示 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      add-button-text="+ 新增收货地址"
      @add="onAdd"
      @edit="onEdit"
    >
      <div class="empty" v-show="$store.state.address.addressList.length==0">
        <img src="../../assets/img/mine/new-address-empty.png" alt />
        <p>您没有收货地址</p>
      </div>
    </van-address-list>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      chosenAddressId: 0,
      addressList: []
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/addressAdd");
    },
    onEdit(item) {
      this.$router.push("/addressEdit?id=" + item.id);
    }
  },
  async created() {
    let _this = this;
    await this.$axios
      .get("/address?user=" + sessionStorage.getItem("user"))
      .then(obj => {
        if (obj.data.dataObj.err_code == 1) {
          Toast("用户不存在");
          setTimeout(() => {
            _this.$router.push("/login");
          }, 1000);
        } else if (obj.data.dataObj.err_code == 2) {
          Toast("暂无地址");
          _this.$store.state.address.addressList=[]
          _this.$store.state.address.chosenAddressId=0
        } else if (obj.data.dataObj.err_code == 0) {
          _this.$store.state.address.addressList = obj.data.data;
          _this.$store.state.address.addressList.forEach(item => {
            _this.addressList.push({
              id: item.addressId,
              name: item.name,
              tel: item.tel,
              address: item.address,
              isDefault: eval(item.isDefault.toLowerCase())
            });
          });
          _this.chosenAddressId = _this.$store.state.address.chosenAddressId;
        }
      });
  },
  watch: {
    chosenAddressId() {
      this.$store.state.address.chosenAddressId = this.chosenAddressId;
    }
  }
};
</script>

<style lang="scss" scoped>
.empty {
  img {
    display: block;
    width: 30%;
    margin: 20rem auto 0 auto;
  }
  p {
    margin: 0;
    text-align: center;
    font-size: 14px;
    padding-top: 10px;
    color: #999;
  }
}
</style>