<template>
  <div>
    <div class="page-name">
      <div>{{isMyBlogs?"我的博客":"博客首页"}}</div>
      <Button type="primary" @click="toConfig" v-if="isMyBlogs">新增博客</Button>
    </div>
    <Card>
      <List v-show="tableData.length>0">
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
            <li v-if="blog.author===isMyBlogs">
              <a href>编辑</a>
            </li>
            <li v-if="blog.author===isMyBlogs">
              <a href>删除</a>
            </li>
            <li>
              <a href>详情</a>
            </li>
          </template>
        </ListItem>
      </List>
      <div v-show="tableData.length===0">这个人懒得很，什么都木有留下~_~···</div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "BlogList",
  computed: {
    userName() {
      return this.$store.state.userName || localStorage.getItem("userName");
    },
    isMyBlogs() {
      return this.userName && this.$route.path === "/blog/myBlogs";
    }
  },
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
      const username = this.isMyBlogs ? this.userName : this.$route.query.author;
      const res = await this.$service.getBlogs(username);
      if (res.errno === -1) return;
      this.tableData = res.data;
    }
  },
  created() {
    this.getTableData();
  },
  watch: {
    $router(to, from) {
      console.log(to);
    }
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
