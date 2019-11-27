<template>
  <div>
    <div class="page-name">
      <div>{{pageTitle}}</div>
      <Button type="primary" @click="changeRouter('/blog/new')" v-if="isMyBlogs">新增博客</Button>
    </div>
    <Card>
      <List v-show="tableData.length>0">
        <ListItem v-for="(blog,index) of tableData" :key="blog.id">
          <ListItemMeta :title="blog.title">
            <template slot="avatar">
              <div>123</div>
            </template>
            <template slot="description">
              <div class="description">
                <div class="author">
                  作者：
                  <span v-if="pageType!==pageTypeEnum.all">{{blog.author}}</span>
                  <span v-else class="text-btn" @click="toAuthorPage(blog.author)">{{blog.author}}</span>
                </div>
                <div class="time">创建时间：{{blog.createtime}}</div>
              </div>
            </template>
          </ListItemMeta>
          <template slot="action">
            <li v-if="blog.author===userName">
              <span class="text-btn" @click="changeRouter(`/blog/update/${blog.id}`)">编辑</span>
            </li>
            <li v-if="blog.author===userName">
              <span class="text-btn" @click="deleteBolg(blog.id,index)">删除</span>
            </li>
            <li>
              <span class="text-btn" @click="changeRouter(`/blog/detail/${blog.id}`)">详情</span>
            </li>
          </template>
        </ListItem>
      </List>
      <div v-show="tableData.length===0">{{noDataText}}</div>
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
    },
    noDataText() {
      return this.pageType === this.pageTypeEnum.my
        ? "你还没有博客，快去创建一篇吧=͟͟͞͞➳❥"
        : this.pageType === this.pageTypeEnum.other
        ? `这个人懒得很，什么都木有留下~_~···\n去别人家看看吧`
        : "哇哦，竟然是空的，你来当博客第一人，去创建一篇吧！";
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
    changeRouter(path) {
      this.$router.push(path);
    },
    toAuthorPage(author) {
      if (author === this.userName) {
        this.$router.push("/blog/myBlogs");
      } else {
        this.$router.push({ path: "/blog/otherBlogs", query: { author } });
      }
    },
    async deleteBolg(id, index) {
      const res = await this.$service.deleteBolg(id);
      if (res.errno === -1) return;
      this.tableData.splice(index, 1);
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
      this.getTableData();
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
