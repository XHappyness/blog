<template>
  <div>
    <div class="add">
      <Button type="primary" @click="toConfig">新增博客</Button>
    </div>
    <Table :columns="tableColumns" :data="tableData" border></Table>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          title: "序号",
          width: 64,
          render: (h, params) => {
            return h("span", params.index + 1);
          }
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "创建时间",
          key: "createtime"
        },
        {
          title: "作者",
          key: "author"
        }
      ]
    };
  },
  methods: {
    toConfig() {
      this.$router.push("/config");
    },
    async getTableData() {
      const res = await this.$service.getBlogs();
      if (res.errno === -1) return;
      this.tableData = res.data;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>


<style lang="less" scoped>
.add {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
</style>
