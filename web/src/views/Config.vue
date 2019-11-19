<template>
  <div class="config">
    <Form :model="config" :label-width="80">
      <FormItem label="任务名称">
        <Input style="width: 250px;" placeholder="请输入任务名称" v-model.trim="config.taskName" />
      </FormItem>
      <FormItem label="公司列表">
        <div class="company-config">
          <Input
            style="width: 250px;"
            placeholder="请输入公司名，回车添加"
            v-model.trim="companyName"
            @on-enter="addCompanys"
          />
          <!-- 下面这个input是为了解决上面input的@on-enter事件刷新页面的情况 -->
          <span style="margin-left: 24px;">or</span>
          <Upload
            action="/import/excel"
            :show-upload-list="false"
            accept=".xlsx"
            :format="['xlsx']"
            :on-format-error="handleFormatError"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <Button type="text" class="text-btn" :loading="uploading">导入Excel</Button>
          </Upload>
          <span>
            (
            <Button
              type="text"
              class="text-btn"
              @click="downExcel"
              style="padding:0;margin:0;"
            >下载Excel模板</Button>)
          </span>
        </div>

        <div style="width: 45%;">
          <Table
            border
            max-height="240"
            v-show="config.companyNames.length>0"
            :columns="companyNamesColumns"
            :data="config.companyNames"
          >
            <template slot-scope="{ row, index } " slot="operation">
              <Icon type="ios-trash-outline" class="text-btn" @click="deleteCompany(index)" />
            </template>
          </Table>
        </div>
      </FormItem>
      <FormItem label="接口列表">
        <div style="margin-bottom: 20px;">
          <span class="text-btn" @click="showModal=true">添加接口</span>
        </div>
        <div style="width: 90%;">
          <Table
            border
            max-height="240"
            v-show="config.interfaces.length>0"
            :columns="configInterfacesColumns"
            :data="config.interfaces"
          >
            <template slot-scope="{ row,index } " slot="limit">
              <InputNumber
                :max="100000"
                :min="0"
                v-model="row.numLimit"
                @on-change="changeItemLimit(index,$event)"
              ></InputNumber>
            </template>
            <template slot-scope="{ row, index } " slot="operation">
              <Icon type="ios-trash-outline" class="text-btn" @click="deleteInterface(row,index)" />
            </template>
          </Table>
        </div>
      </FormItem>
      <FormItem>
        <Button type="primary" style="margin-right: 8px;" @click="configOk">执行导出</Button>
        <Button @click="reset">重置</Button>
      </FormItem>
    </Form>
    <Modal v-model="showModal" title="全部接口列表" :width="50">
      <Input
        suffix="ios-search"
        placeholder="请输入数据维度或者策略"
        class="modal-search"
        v-model="searchKey"
        @on-change="searchInterfaces"
      />
      <Table border max-height="300" :columns="modalInterfacesColumns" :data="searchedInterfaces">
        <template slot-scope="{ row } " slot="select">
          <Checkbox :value="row.checked" @on-change="setRowCheck(row,$event)"></Checkbox>
        </template>
      </Table>
      <div slot="footer">
        <Button @click="showModal=false">取消</Button>
        <Button type="primary" @click="addInterfaces">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { downloadFile } from "@/common/util";
export default {
  name: "Config",
  data() {
    return {
      config: {
        taskName: "",
        companyNames: [],
        interfaces: []
      },
      companyName: "",
      uploading: false,
      companyNamesColumns: [
        {
          title: "序号",
          width: 64,
          render: (h, params) => {
            return h("span", params.index + 1);
          }
        },
        {
          title: "企业名称",
          key: "companyName"
        },
        {
          title: "操作",
          width: 70,
          slot: "operation"
        }
      ],
      defaultNumLimit: 50,
      configInterfacesColumns: [
        {
          title: "序号",
          width: 64,
          render: (h, params) => {
            return h("span", params.index + 1);
          }
        },
        {
          title: "数据维度",
          key: "dimension"
        },
        {
          title: "策略",
          key: "strategy"
        },
        {
          title: "描述",
          key: "describe"
        },
        {
          title: "条数限制",
          slot: "limit"
        },
        {
          title: "操作",
          width: 70,
          slot: "operation"
        }
      ],
      // modal
      showModal: false,
      searchKey: "",
      searchedInterfaces: [],
      allInterfaces: [],
      modalInterfacesColumns: [
        {
          title: "选择",
          width: 70,
          slot: "select"
        },
        {
          title: "数据维度",
          key: "dimension"
        },
        {
          title: "策略",
          key: "strategy"
        },
        {
          title: "描述",
          key: "describe"
        }
      ]
    };
  },
  methods: {
    addCompanys() {
      if (!this.companyName) return;
      if (
        this.config.companyNames
          .map(item => item.companyName)
          .includes(this.companyName)
      ) {
        this.$Message.error("该公司名称已经存在");
        return;
      }
      this.config.companyNames.push({ companyName: this.companyName });
      this.companyName = "";
    },
    deleteCompany(index) {
      this.config.companyNames.splice(index, 1);
    },
    /* ---- 上传相关 ---- */
    /* 图片上传相关 */
    handleFormatError(file) {
      this.$Message.error(`只支持 Excel 表格`);
    },
    handleProgress(file) {
      this.uploading = true;
    },
    // 上传成功
    handleSuccess(res, file) {
      this.uploading = false;
      if (res.responseCode !== "00") {
        this.$Notice.error({
          title: "错误",
          desc: "表格上传失败，请重新尝试"
        });
        return;
      }
      // 把结果添加到列表中(重复的不添加)
      for (let i = 0; i < res.content.length; i++) {
        let name = res.content[i];
        if (!this.config.companyNames.find(item => item.companyName === name)) {
          this.config.companyNames.push({ companyName: name });
        }
      }
    },
    // 上传失败
    handleError(event, file) {
      this.uploading = false;
      this.$Notice.error({
        title: "错误",
        desc: "表格上传失败，请重新尝试"
      });
    },
    async downExcel() {
      /* const res = await this.$service.downExcel();
      downloadFile(res, `公司列表模板`); */
      var mywin = window.open("", "_self"); //注意一定要在请求前操作此步
      mywin.location.href = "/import/example";
    },
    /* ---- 接口列表 ---- */
    hasSelected(interfaceItem) {
      return this.config.interfaces.find(
        item =>
          item.dimension === interfaceItem.dimension &&
          item.strategy === interfaceItem.strategy
      );
    },
    getInterfaceLimit(interfaceItem) {
      for (let i = 0; i < this.config.interfaces.length; i++) {
        let item = this.config.interfaces[i];
        if (
          item.dimension === interfaceItem.dimension &&
          item.strategy === interfaceItem.strategy
        ) {
          return item.numLimit;
        }
      }
    },
    addInterfaces() {
      // 查看是否有重复的数据维度
      const selectArr = this.allInterfaces
        .filter(item => item.checked)
        .map(item => {
          item.numLimit = this.hasSelected(item)
            ? this.getInterfaceLimit(item)
            : this.defaultNumLimit;
          return item;
        });
      const dimensions = selectArr.map(item => item.dimension);
      if ([...new Set(dimensions)].length < dimensions.length) {
        this.$Message.error("不能选择重复的数据维度");
        return;
      }
      // 之前选中的保留numLimit
      this.config.interfaces = selectArr;
      this.showModal = false;
    },
    changeItemLimit(index, value) {
      this.config.interfaces[index].numLimit = value;
    },
    deleteInterface(row, index) {
      this.config.interfaces.splice(index, 1);
      // 删除的项将其置为未选中
      this.setRowCheck(row, false);
    },
    searchInterfaces() {
      if (!this.searchKey) {
        this.searchedInterfaces = this.allInterfaces;
      } else {
        this.searchedInterfaces = this.allInterfaces.filter(
          item =>
            item.dimension
              .toLowerCase()
              .includes(this.searchKey.toLowerCase()) ||
            item.strategy.toLowerCase().includes(this.searchKey.toLowerCase())
        );
      }
    },
    async getAllInterfaces() {
      // 接口获取数据
      let res = await this.$service.getAllInterfaces();
      if (res.responseCode !== "00") return;
      // 转换成前端数据
      this.allInterfaces = res.content.map(item => {
        return {
          dimension: item.domain,
          strategy: item.strategy,
          describe: item.description,
          checked: false
        };
      });
      this.searchedInterfaces = this.allInterfaces;
    },
    setRowCheck(row, value) {
      this.allInterfaces.forEach(item => {
        if (
          item.dimension === row.dimension &&
          item.strategy === row.strategy
        ) {
          item.checked = value;
        }
      });
    },
    async configOk() {
      // 验证数据
      if (this.config.taskName === "") {
        this.$Message.error("请输入任务名称");
        return;
      }
      if (this.config.companyNames.length === 0) {
        this.$Message.error("请至少添加一条公司");
        return;
      }
      if (this.config.interfaces.length === 0) {
        this.$Message.error("请至少添加一条接口");
        return;
      }
      // 接口提交
      const config = {
        batchNo: this.config.taskName,
        companyNames: this.config.companyNames.map(item => item.companyName),
        queryOptions: this.config.interfaces.map(item => ({
          domain: item.dimension,
          source: item.strategy,
          limit: item.numLimit
        }))
      };
      let res = await this.$service.postConfig(config);
      if (res.responseCode !== "00") return;
      this.$router.push("/");
    },
    reset() {
      this.config.companyNames = [];
      this.config.interfaces = [];
      this.allInterfaces.forEach(item => {
        item.checked = false;
      });
    }
  },
  created() {
    this.getAllInterfaces();
  }
};
</script>

<style lang="less" scoped>
.config {
  .text-btn {
    margin-left: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #2d8cf0;
    &:hover {
      color: #5cadff;
    }
    &.ivu-icon {
      font-size: 18px;
    }
  }
  .company-config {
    margin-bottom: 20px;
    display: flex;
  }
  .ivu-btn-text:focus {
    box-shadow: none;
  }
}
.modal-search {
  width: 210px;
  margin-bottom: 10px;
}
</style>