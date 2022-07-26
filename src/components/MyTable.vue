<template>
  <div class="my-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      @select-all="selectionChange"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="isSelectColumn"
        align="center"
        type="selection"
        width="45"
      />
      <el-table-column
        v-if="isIndexColumn"
        label="序号"
        align="center"
        type="index"
        width="60"
      />
      <el-table-column
        v-for="(col, idx) in tableConfig"
        :key="idx"
        align="center"
        :prop="col.prop"
        :label="col.label"
        :min-width="col.minWidth"
      >
        <!-- 每一列都可以插入对应的插槽，进行自定义 -->
        <template #default="scope">
          <slot :name="col.slotName" :row="scope.row">
            <!-- 直接使用 el-tooltip，解决多行显示省略号时候 el-table 的 tooltip 不显示的问题 -->
            <el-tooltip
              v-if="col.tooltip"
              effect="dark"
              class="tp"
              :content="scope.row[col.prop]"
              placement="top"
              popper-class="table-popper"
            >
              <div class="tooltip-content">
                {{ scope.row[col.prop] }}
              </div>
            </el-tooltip>
            <template v-else>
              {{ scope.row[col.prop] }}
            </template>
          </slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isOptions"
        fixed="right"
        label="操作"
        min-width="150"
        align="center"
      >
        <template #default="scope">
          <slot name="operation" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <footer class="mt-10">
      <span>共 {{ 1000 }} 条</span>
      <el-pagination
        v-model:currentPage="currentPage"
        :page-size="100"
        background
        layout="prev, pager, next"
        :total="1000"
        small
        @current-change="handleCurrentChange"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

interface ITableConfig {
  prop: string;
  label: string;
  minWidth?: number;
  tooltip?: boolean;
  slotName?: string;
}

defineProps({
  tableData: {
    type: Array,
    required: false,
    default: () => [],
  },
  // 是否需要 index 列
  isIndexColumn: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 是否需要 多选 列
  isSelectColumn: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 是否需要默认的 操作 列
  isOptions: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 配置列内容
  tableConfig: {
    type: Array as PropType<ITableConfig[]>,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
  },
});
// 列表选中、分页
const emit = defineEmits(["selectionChange", "handleCurrentChange"]);
const selectionChange = (...args: any[]) => emit("selectionChange", args);
const handleCurrentChange = (currentPage: number) =>
  emit("handleCurrentChange", currentPage);
</script>

<style scoped lang="less">
.my-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-table {
    :deep(th.el-table__cell) {
      background-color: @bgColor;
      & > .cell {
        font-size: 12px;
        font-weight: normal;
        color: @textColor;
      }
    }
    .tooltip-content {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
  }
  footer {
    display: flex;
    align-items: center;
  }
}
</style>
