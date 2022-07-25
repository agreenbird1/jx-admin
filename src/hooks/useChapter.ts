import { ref } from "vue";

export interface IChapter {
  name: string | null;
  show: boolean;
  type?: string;
  children?: IChapter[];
}

const useChapter = () => {
  const chapterDialogVisible = ref(false);
  const deleteDialogVisible = ref(false);
  const show = ref("");
  const initChapter = {
    name: "",
    show: true,
  };
  const chapter = ref<IChapter>(initChapter);
  const defaultProps = {
    children: "children",
    label: "name",
  };
  const treeData: IChapter[] = [
    {
      name: "客观题",
      type: "0",
      show: true,
      children: [
        {
          name: "民俗推背可",
          type: "1",
          show: true,
          children: [
            {
              type: "2",
              name: "总论+主管",
              show: false,
            },
          ],
        },
        {
          name: "Level one 2",
          type: "1",
          show: false,
          children: [
            {
              type: "2",
              name: "Level two 2-1",
              show: true,
            },
            {
              type: "2",
              name: "Level two 2-2",
              show: true,
            },
          ],
        },
      ],
    },
  ];

  const addChapter = (e: Event) => {
    e.stopPropagation();
    chapterDialogVisible.value = true;
    chapter.value = initChapter;
  };
  const updateFn = (e: Event, chapter: IChapter) => {
    console.log(chapter);
    e.stopPropagation();
    if (chapter.type === "1") {
      update(chapter);
    } else {
      updateChapter(chapter as IChapter);
    }
  };
  const deleteChapter = (e: Event) => {
    e.stopPropagation();
    deleteDialogVisible.value = true;
  };
  // 公用的按钮，重新区分
  const update = (curChapter: IChapter) => {
    chapterDialogVisible.value = true;
    chapter.value = curChapter;
    show.value = curChapter.show ? "yes" : "no";
  };
  const updateChapter = (curChapter: IChapter) => {
    chapterDialogVisible.value = true;
    chapter.value = curChapter;
    show.value = curChapter.show ? "yes" : "no";
  };

  return {
    show,
    chapterDialogVisible,
    deleteDialogVisible,
    treeData,
    chapter,
    addChapter,
    updateFn,
    deleteChapter,
    defaultProps,
  };
};

export default useChapter;
