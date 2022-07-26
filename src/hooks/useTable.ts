import { ref } from "vue";

const useTable = <T, P>(getTableList: () => Promise<T[]>, params: P) => {
  const currentPage = ref(1);
  const tableData = ref<T[]>();
  const isIndexColumn = ref(false);
  const isSelectColumn = ref(false);
  const isOptions = ref(true);
  const pageSize = ref(10);
  const total = ref(0);
  const curParams = ref(params);

  const selectionChange = (data: T[]) => {
    // 以 Promise 的形式返回，以便后续处理
    return new Promise((res) => {
      res(data);
    });
  };
  const handleCurrentChange = async (changePage: number) => {
    tableData.value = await getTableList();
    currentPage.value = 1;
  };

  return {
    currentPage,
    pageSize,
    total,
    selectionChange,
    handleCurrentChange,
    curParams,
    isOptions,
    isSelectColumn,
    isIndexColumn,
    tableData,
  };
};

export default useTable;
