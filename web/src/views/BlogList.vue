<template>
  <div>
    <div class="page-name">
      <div>{{pageTitle}}</div>
      <Button type="primary" @click="toNewBlog" v-if="isMyBlogs">新增博客</Button>
    </div>
    <Card>
      <List v-show="tableData.length>0">
        <ListItem v-for="blog of tableData" :key="blog.id">
          <ListItemMeta :title="blog.title">
            <template slot="avatar">
              <div>123</div>
            </template>
            <template slot="description">
              <div class="description">
                <div class="author">
                  作者：
                  <span class="text-btn" @click="toAuthorPage(blog.author)">{{blog.author}}</span>
                </div>
                <div class="time">创建时间：{{blog.createtime}}</div>
              </div>
            </template>
          </ListItemMeta>
          <template slot="action">
            <li v-if="blog.author===userName">
              <a href>编辑</a>
            </li>
            <li v-if="blog.author===userName">
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
      return this.$store.getters.userName;
    },
    pageType() {
      return this.$route.path === "/blog/myBlogs"
        ? this.pageTypeEnum.my
        : this.$route.path === "/blog/otherBlogs"
        ? this.pageTypeEnum.other
        : this.pageTypeEnum.all;
    },
    isMyBlogs() {
      return this.userName && this.pageType === this.pageTypeEnum.my;
    },
    pageTitle() {
      return this.pageType === this.pageTypeEnum.my
        ? "我的博客"
        : this.pageType === this.pageTypeEnum.other
        ? `${this.$route.query.author || "-"}的博客`
        : "博客首页";
    }
  },
  data() {
    return {
      pageTypeEnum: Object.freeze({
        all: 0,
        other: 1,
        my: 2
      }),
      tableData: []
    };
  },
  methods: {
    toNewBlog() {
      this.$router.push("/config");
    },
    toAuthorPage(author) {
      if (author === this.userName) {
        this.$router.push("/blog/myBlogs");
      } else {
        this.$router.push({ path: "/blog/otherBlogs", query: { author } });
      }
    },
    async getTableData() {
      const username = this.isMyBlogs
        ? this.userName
        : this.$route.query.author;
      const res = await this.$service.getBlogs(username);
      if (res.errno === -1) return;
      this.tableData = res.data;
    }
  },
  created() {
    this.getTableData();
  },
  watch: {
    "$route.path"(to, from) {
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
