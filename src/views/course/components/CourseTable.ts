export default <ITableConfig[]>[
  {
    prop: "id",
    label: "ID",
    minWidth: 100,
  },
  {
    prop: "name",
    label: "课程名称",
    tooltip: true,
    minWidth: 250,
  },
  {
    prop: "cardNumber",
    label: "卡片数",
    minWidth: 120,
  },
  {
    prop: "updateTime",
    label: "更新时间",
    minWidth: 250,
    slotName: "updateTime",
  },
];

export const courseInfoTableConfig = [
  {
    prop: "name",
    label: "资料名称",
    minWidth: 200,
  },
  {
    prop: "coursePdfUrl",
    label: "资料PDF链接",
    minWidth: 400,
  },
];
