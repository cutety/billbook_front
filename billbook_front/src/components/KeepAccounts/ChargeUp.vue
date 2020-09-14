<template>
  <div>
    <h1>在这里记录你的支出吧</h1>
    <el-row :gutter="10">
      <el-col :xl="6" :lg="6" :sm="24" v-for="(item,i) in bills" :key="i">
        <el-card shadow="hover"  class="box-card" >
          <div slot="header" class="clearfix">
            <span class="note-title">{{item.remark}}</span>
            <el-tooltip transition="0s"  class="item" effect="dark" content="修改标题" placement="top-start">
              <el-button class="note-operation" type="text" @click="editTitle(item.id)" ><i class="el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip transition="0s"  class="item" effect="dark" content="编辑" placement="top-start">
              <el-button class="note-operation" type="text" @click="editBill(item)" ><i class="el-icon-edit-outline"></i></el-button>
            </el-tooltip>
            <el-tooltip transition="0s"  class="item" effect="dark" content="删除" placement="top-start">
              <el-button class="note-operation" type="text" @click="deleteBill(item.id)" ><i class="el-icon-delete"></i></el-button>
            </el-tooltip>
          </div>
          <div class="text item note-abs">
            <el-tag color="MediumSpringGreen">{{item.consumptionAmount}} 元</el-tag>
            <br>
            <el-tag color="LightPink">{{item.billType.name}}</el-tag>
            <br>
            <el-tag color="SkyBlue">{{item.billDate | dateformat('MM-DD HH:mm:ss')}}</el-tag>
          </div>
        </el-card>
        <el-row style="position: fixed;bottom: 70px;right: 10px">
          <el-button type="primary" circle @click="chargeUp">
            <i class="el-icon-circle-plus-outline"></i>
          </el-button>
        </el-row>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: "ChargeUp",
  data() {
    return {
      billType: [],
      bills:[]
    }
  },
  mounted() {
    // const _this = this;
    // this.axios.get("/bill/billType").then((response) => {
    //   console.log(response.data)
    //   _this.billType = response.data
    // })
  },
  methods:{
    editTitle(id) {

    },
    editBill(bill) {
      this.$emit("editBill",bill);
    },
    deleteBill(id) {

    },
    chargeUp(){
      this.$emit("chargeUp");
    }
  }
}
</script>

<style scoped>
.el-tag {
  width: 75%;
}

.box-card{
  display: inline-block;
  width: 95%;
  margin-left: 5px;
  margin-right: 5px;
}
.note-title{
  font-weight: bolder;
}
.note-abs{
  font-size: 12px;
  height: 100px;
  cursor: pointer;
}
.note-operation{
  float: right;
  padding: 3px 0;
  margin-right: 2px;
  margin-left: 2px!important;
}
.el-card__header {
  padding: 9px 20px!important;
  height: 40px!important;
}
.page{
  text-align: center;
  position:fixed;
  margin:auto;
  left:0;
  right:0;
  bottom:0;
  width:200px;
  height:50px;
}

</style>
