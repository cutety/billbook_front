<template>
  <div>
    <el-dialog title="编辑支出" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="类别" :model="form.categoryId" v-show="false">
          <el-input v-model="form.categoryId"></el-input>
        </el-form-item>
        <el-form-item label="支出标题" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择类别" :label-width="formLabelWidth">
          <el-select v-model="form.typeId" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
      typeOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      isCreate: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        id: "",
        consumptionAmount: "",
        remark: "",
        typeId: "",
        categoryId: ""
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
      let url = ''
      if (!this.isCreate) {
        url = '/bill/updateBill'
      } else {
        //添加新的
        url = '/bill/add'
      }
      console.log(url)
      console.log(this.form)
      let _this = this
      this.axios.post(url, this.form)
        .then(function (response) {
          console.log(response.data.status)
          if (response.data.status === "200") {
            _this.dialogFormVisible = false
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            _this.$emit('updateInfo')
          } else {
            this.$message.error('操作失败');
          }
        })
    },
  }
}
</script>

<style scoped>

</style>
