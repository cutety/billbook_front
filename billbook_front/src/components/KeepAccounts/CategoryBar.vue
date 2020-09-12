<template>
  <div>
    <el-tabs v-model="currentCid" @tab-click="handleClick">
      <el-tab-pane v-for="(item,i) in categories" :label="item.name" :k="i" :name="item.id.toString()"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ChargeUp from "./ChargeUp";

export default {
  name: "CategoryBar",
  data() {
    return {
      currentCid: '1',
      categories: [],
    };
  },
  methods: {
    handleClick() {
      console.log(this.currentCid);
      this.$emit('categorySelect')
    }
  },
  mounted() {
    const _this = this;
    this.axios.get("/bill/categories").then((response) => {
      console.log(response.data)
      _this.categories = response.data
    })
  }
}
</script>

<style scoped>

</style>
