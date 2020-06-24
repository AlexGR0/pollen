<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name">
        <template #left>
          <van-icon name="arrow-left" size="25" color="#555" @click="$router.go(-1)" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 地址编辑栏 -->
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from "../../assets/js/area";
import { Toast } from "vant";
export default {
  data() {
    return {
      areaList,
      addressInfo: {}
    };
  },
  methods: {
    async onEdit(content) {
      let newAddressInfo = {
        userTel: sessionStorage.getItem("user"),
        addressId: this.$route.query.id,
        name: content.name,
        tel: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        area_code: content.areaCode,
        isDefault: content.isDefault
      };
      let _this = this;
      await this.$axios.post("/addressEdit", newAddressInfo).then(obj => {
        if (obj.data.err_code == 1) {
          Toast("用户不存在");
        } else if (obj.data.err_code == 0) {
          Toast("修改成功");
          _this.$router.go(-1);
        }
      });
    },
    async onDelete() {
      let _this = this;
      this.$axios
        .get("/addressDel", {
          params: {
            addressId: _this.$route.query.id,
            userTel: sessionStorage.getItem("user")
          }
        })
        .then(obj => {
          if (obj.data.dataObj.err_code == 1) {
            Toast("用户不存在");
            _this.$router.push("/login");
          }else if(obj.data.dataObj.err_code==2){
            Toast("地址不存在")
            _this.$router.push("/address");
          }else if (obj.data.dataObj.err_code == 0) {
            Toast("删除成功");
            _this.$router.go(-1);
          }
        });
    }
  },
  async created() {
    let _this = this;
    await this.$axios
      .get("/addressEdit", {
        params: {
          addressId: _this.$route.query.id,
          userTel: sessionStorage.getItem("user")
        }
      })
      .then(obj => {
        if (obj.data.dataObj.err_code == 1) {
          Toast("用户不存在");
          _this.$router.push("/login");
        } else if (obj.data.dataObj.err_code == 2) {
          Toast("地址不存在");
          _this.$router.push("/address");
        } else if (obj.data.dataObj.err_code == 0) {
          _this.addressInfo = {
            id: obj.data.data.id,
            name: obj.data.data.name,
            tel: obj.data.data.tel,
            province: obj.data.data.province,
            city: obj.data.data.city,
            county: obj.data.data.county,
            areaCode: obj.data.data.area_code,
            addressDetail: obj.data.data.address,
            isDefault: eval(obj.data.data.isDefault.toLowerCase())
          };
        }
      });
  }
};
</script>

<style lang="scss" scoped>
</style>