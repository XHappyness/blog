<template>
  <Layout class="home">
    <Header>
      <div class="ice-logo" @click="toIndex"></div>
    </Header>
    <Content :style="{padding: '0 20px'}">
      <div class="page-name">{{pageName}}</div>
      <Card>
        <router-view />
      </Card>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "home",
  computed: {
    pageName() {
      if (this.$route.path.indexOf("/taskList") !== -1) {
        return "博客列表";
      } else {
        return "博客编辑";
      }
    }
  },
  methods: {
    toIndex() {
      if (this.$route.path.indexOf("/taskList") === -1) this.$router.push("/");
    }
  }
};
</script>

<style lang="less">
.home {
  .ice-logo {
    cursor: pointer;
    background: url("~@/assets/ice-logo.png") no-repeat;
    width: 215px;
    height: 43px;
    background-size: contain; //可等比例缩小
  }
  .page-name {
    height: 50px;
    line-height: 50px;
  }
  .ivu-layout-header {
    background-color: #103d9a;
    color: #fff;
    display: flex;
    align-items: center;
  }
  .ivu-layout-content {
    min-height: calc(100vh - 64px);
    padding: 0 50px !important;
  }
  .ivu-card-body {
    height: calc(100vh - 64px - 90px);
    overflow: auto;
  }
}
</style>
