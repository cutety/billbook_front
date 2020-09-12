<template>
  <div>
    <el-dialog title="编辑支出" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="支出标题" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出额度" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" v-model="form.consumptionAmount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="updateNote">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BillEditForm",
  data() {
    return {
      isCreate: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: "",
        abs: ""
      },
      cid: '',
    }
  },
  methods: {
    handleClose(done) {
      var _this = this
      this.$confirm('保存修改并关闭？')
        .then(_ => {
          _this.updateNote()
          done();
        })
        .catch(_ => {
        });
    },
    updateNote() {
      const _this = this;
      this.axios.post('/bill/updateBill',this.form)
        .then(function (response) {
          if(response.data.status === 200){
            _this.dialogFormVisible = false
            _this.$message({
              message: '更新成功',
              type: 'success'
            });
            _this.$emit('updateInfo')
          }
          else {
            this.$message.error('更新失败');
          }
        })
        .catch(function (error) {
          this.$message.error(error);
        })
    },
  }
}
</script>

<style scoped>

</style>
