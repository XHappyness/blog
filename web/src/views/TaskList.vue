<template>
  <div>
    <div class="add">
      <Button type="primary" @click="toConfig">新增任务</Button>
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
          title: "任务名称",
          key: "taskName"
        },
        {
          title: "任务状态",
          key: "status"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
        },
        {
          title: "执行人",
          key: "operator"
        }
      ]
    };
  },
  methods: {
    toConfig() {
      this.$router.push("/config");
    },
    async getTableData() {
      const res = await this.$service.getExportTasks();
      if (res.responseCode !== "00") return;
      this.tableData = res.content;
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
