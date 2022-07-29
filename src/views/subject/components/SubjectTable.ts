export default <ITableConfig[]>[
  {
    prop: "topicNumber",
    label: "题号",
    minWidth: 120,
  },
  {
    prop: "title",
    label: "题干",
    tooltip: true,
    minWidth: 250,
  },
  {
    prop: "options",
    label: "选项",
    tooltip: true,
    minWidth: 220,
  },
  {
    prop: "content",
    label: "章节",
    minWidth: 220,
    tooltip: true,
  },
  {
    prop: "type",
    label: "题型",
    minWidth: 100,
    slotName: "type",
  },
  {
    prop: "updateTime",
    label: "更新时间",
    minWidth: 220,
    slotName: "updateTime",
  },
  {
    prop: "isDelete",
    label: "状态",
    minWidth: 140,
    slotName: "isDelete",
  },
];
