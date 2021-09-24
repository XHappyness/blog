<template>
  <Layout class="home">
    <Header>
      <div class="logo" @click="toIndex">博客系统</div>
      <div class="user">
        <Dropdown v-if="userName" @on-click="dropdownClick">
          <span class="text-btn">{{userName}}</span>
          <DropdownMenu slot="list">
            <DropdownItem :name="dropDownEnum.myblog">我的博客</DropdownItem>
            <DropdownItem :name="dropDownEnum.logout" divided>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div v-else>
          <span class="text-btn" @click="openModal(0)">登录</span>
          <span class="text-btn" style="margin-left:8px;" @click="openModal(1)">注册</span>
        </div>
      </div>
    </Header>
    <Content :style="{padding: '0 20px'}">
      <router-view />
    </Content>
    <Modal
      v-model="showModal"
      :title="loginType===0?'登录':'注册'"
      :width="50"
      @on-visible-change="resetForm"
    >
      <Form :model="userInfor" :rules="userInforRules" ref="userInforRules" :label-width="60">
        <FormItem label="用户名" prop="name">
          <Input placeholder="请输用户名" v-model.trim="userInfor.name" :maxlength="10" />
        </FormItem>
        <FormItem label="密码" prop="psd">
          <Input
            placeholder="请输入密码"
            type="password"
            password
            v-model.trim="userInfor.psd"
            :maxlength="20"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          style="width:100%;"
          @click="loginOrRegister()"
        >{{loginType===0?'登录':'注册'}}</Button>
      </div>
    </Modal>
  </Layout>
</template>

<script>
export default {
  name: "home",
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    showModal: {
      get() {
        return this.$store.state.showLogin;
      },
      set(val) {
        this.$store.commit("upShowLogin", val);
      }
    }
  },
  data() {
    return {
      dropDownEnum: Object.freeze({
        myblog: 0,
        logout: 1
      }),
      // 0登录 1注册
      loginType: 0,
      userInfor: {
        name: "",
        psd: ""
      },
      userInforRules: {
        name: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value === "" || value === undefined) {
                return callback(new Error(`用户名不能为空`));
              }
              callback();
            }
          }
        ],
        psd: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value === "" || value === undefined) {
                return callback(new Error(`密码不能为空`));
              }
              callback();
            }
          }
        ]
      }
    };
  },
  methods: {
    toIndex() {
      if (this.$route.path.indexOf("/allBlogs") === -1) this.$router.push("/");
    },
    openModal(loginType) {
      this.showModal = true;
      this.loginType = loginType;
    },
    resetForm(value) {
      if (!value)
        // 关闭时
        this.$refs["userInforRules"].resetFields();
    },
    async loginOrRegister() {
      this.$refs["userInforRules"].validate(async valid => {
        if (valid) {
          let res;
          if (this.loginType === 0) {
            // 登录
            res = await this.$service.login(this.userInfor);
          } else {
            // 注册
            res = await this.$service.register(this.userInfor);
          }
          if (res.errno === -1) return;
          this.showModal = false;
          this.$store.commit("upUserName", this.userInfor.name);
        }
      });
    },
    dropdownClick(name) {
      if (name === this.dropDownEnum.myblog) {
        this.$router.push("/blog/myBlogs");
      } else {
        const res = this.$service.logout(this.userName);
        if (res.errno === -1) return;
        this.$store.commit("upUserName", "");
        this.$router.push("/blog/allblogs");
      }
    }
  }
};
</script>

<style lang="less">
.home {
  &.ivu-layout {
    background: rgba(255, 255, 255, 0);
  }
  .logo {
    cursor: pointer;
    background: url("~@/assets/siyecao.jpg") no-repeat;
    width: 150px;
    height: 45px;
    line-height: 45px;
    background-size: contain; //可等比例缩小
    padding-left: 60px;
    font-size: 18px;
    font-weight: bold;
  }
  .ivu-layout-header {
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0px 2;
    height: 45px;
    line-height: 45px;
  }
  .ivu-layout-content {
    min-height: calc(100vh - 64px);
    padding: 0 50px !important;
  }
  .ivu-card {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .ivu-card-bordered {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .ivu-card-body {
    height: calc(100vh - 64px - 90px);
    overflow: auto;
  }
}
</style>
