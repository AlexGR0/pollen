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

    <!-- 增加地址栏 -->
    <van-address-edit
      :area-list="areaList"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      save-button-text="保存添加"
      @save="add"
    />
  </div>
</template>

<script>
import areaList from "../../assets/js/area";
import { Toast } from 'vant';
export default {
  data() {
    return {
      areaList,
      listObj:{}
    };
  },
  methods: {
    async add(content) {
        let _this=this
      this.listObj={
          userTel:sessionStorage.getItem("user"),
          name:content.name,
          tel:content.tel,
          province:content.province,
          city:content.city,
          county:content.county,
          address:content.addressDetail,
          area_code:content.areaCode,
          isDefault:content.isDefault
      }
      await this.$axios.post("/addressAdd",this.listObj).then(obj=>{
          if(obj.data.err_code==0){
              Toast("添加地址成功")
              _this.$router.go(-1)
          }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>