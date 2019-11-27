<template>
  <div>
    <div class="page-name">{{operateTypeName}}</div>
    <Card>
      <Form ref="formValidate" :model="blogForm" :rules="blogFormRule" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input v-model="blogForm.title" placeholder="请输入文章标题" />
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input
            v-model="blogForm.content"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 10}"
            placeholder="请输入文章内容"
          />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit">{{operateTypeName}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: "blogEdit",
  computed: {
    blogId() {
      return this.$route.params.id;
    },
    operateTypeName() {
      return this.$route.path === "/blog/new" ? "创建博客" : "更新博客";
    }
  },
  data() {
    return {
      blogForm: {
        title: "",
        content: ""
      },
      blogFormRule: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async getBlogDetail() {
      const res = await this.$service.getBlogDetail(this.blogId);
      if (res.errno === -1) return;
      this.blogForm = res.data;
    },
    submit() {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          if (this.$route.path === "/blog/new") {
            const res = await this.$service.addBLog(this.blogForm);
            if (res.errno === -1) return;
            this.goBack();
          } else {
            const res = await this.$service.upBlog({
              ...this.blogForm
            });
            if (res.errno === -1) return;
            this.goBack();
          }
        }
      });
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  created() {
    if (this.$route.path !== "/blog/new" && this.blogId) {
      this.getBlogDetail();
    }
  }
};
</script>
