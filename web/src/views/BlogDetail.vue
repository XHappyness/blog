<template>
  <div>
    <div class="page-name">{{blog.title}}</div>
    <Card>
      <p>{{blog.content}}</p>
      <p style="margin-top: 12px;color:#999">
        <span style="margin-right: 10px;">作者：{{blog.author}}</span>
        <span>创建时间：{{blog.createtime}}</span>
      </p>
    </Card>
  </div>
</template>

<script>
export default {
  name: "detail",
  computed: {
    blogId() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      blog: {}
    };
  },
  methods: {
    async getBlogDetail() {
      const res = await this.$service.getBlogDetail(this.blogId);
      if (res.errno === -1) return;
      this.blog = res.data;
    }
  },
  mounted() {
    this.getBlogDetail();
  }
};
</script>