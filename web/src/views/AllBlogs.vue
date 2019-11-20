<template>
  <div>
    <div class="page-name">
      <div>{{$route.meta.pageName}}</div>
      <Button type="primary" @click="toConfig">新增博客</Button>
    </div>
    <Card>
      <List>
        <ListItem v-for="blog of tableData" :key="blog.id">
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            :title="blog.title"
          >
            <template slot="description">
              <div class="description">
                <div class="author">作者：{{blog.author}}</div>
                <div class="time">创建时间：{{blog.createtime}}</div>
              </div>
            </template>
          </ListItemMeta>
          <template slot="action">
            <li>
              <a href>详情</a>
            </li>
            <li>
              <a href>编辑</a>
            </li>
            <li>
              <a href>删除</a>
            </li>
          </template>
        </ListItem>
      </List>
    </Card>
  </div>
</template>

<script>
export default {
  name: "AllBlogs",
  data() {
    return {
      tableData: []
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
.description {
  display: flex;
  .author {
    width: 150px;
  }
}
</style>
