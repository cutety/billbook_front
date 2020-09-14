<template>
  <div>
    <category-bar @categorySelect="getCharges" ref="categoryBar"></category-bar>
    <charge-up ref="charges" @editBill="handleEditBill" @chargeUp="handleChargeUp"></charge-up>
    <bill-edit-form ref="billEditForm" @updateInfo="getCharges"></bill-edit-form>
  </div>
</template>

<script>
import ChargeUp from "./ChargeUp";
import CategoryBar from "./CategoryBar";
import BillEditForm from "./BillEditForm";
export default {
  name:'KeepAccounts',
  components:{ChargeUp,CategoryBar,BillEditForm},
  data() {
    return {

    };
  },
  methods: {
    getCharges() {
      const currentCid = this.$refs.categoryBar.currentCid
      const userId = JSON.parse(window.localStorage.getItem("userInfo")).userId
      const params = new URLSearchParams();
      const _this = this;
      params.append('categoryId',currentCid)
      params.append('userId',userId)
      this.axios.post('/bill/charges',params).then((response) => {
        _this.$refs.charges.bills=response.data
      })
    },
    handleEditBill(bill) {
      const _this = this;
      this.axios.get("/bill/billType").then((response) => {
        console.log(response.data);
        this.$refs.billEditForm.typeOptions = response.data
      })
      this.$refs.billEditForm.dialogFormVisible=true;
      this.$refs.billEditForm.isCreate = false
      this.$refs.billEditForm.form = bill
    },
    handleChargeUp() {
      const _this = this;
      this.axios.get("/bill/billType").then((response) => {
        console.log(response.data);
        this.$refs.billEditForm.typeOptions = response.data
      })
      this.$refs.billEditForm.dialogFormVisible=true;
      this.$refs.billEditForm.isCreate = true
      this.$refs.billEditForm.form = {categoryId:1}
    }
  },
  mounted() {

  }
}
</script>

<style>
.el-tabs__item {
  height: 20px!important;
  line-height: 20px!important;
  font-size: 12px;
}
.el-tabs__item.is-active {
  font-weight: bolder!important;
}
</style>
