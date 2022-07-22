import { ref } from "vue";

export interface ICourseCard {
  name: string | null;
  time?: number | null;
  audioUrl?: string;
  videoUrl?: string;
  type?: string;
  children?: ICourseCard[];
}

const useCourseChapter = () => {
  const chapterDialogVisible = ref(false);
  const cardDialogVisible = ref(false);
  const chapterName = ref("");
  const initCard = {
    name: "",
    time: null,
    audioUrl: "",
    videoUrl: "",
  };
  const card = ref<ICourseCard>(initCard);
  const defaultProps = {
    children: "children",
    label: "name",
  };
  const treeData: ICourseCard[] = [
    {
      name: "民俗推背可",
      type: "1",
      children: [
        {
          type: "2",
          time: 10,
          name: "总论+主管",
        },
      ],
    },
    {
      name: "Level one 2",
      type: "1",
      children: [
        {
          type: "2",
          time: 10,
          name: "Level two 2-1",
        },
        {
          type: "2",
          time: 10,
          name: "Level two 2-2",
        },
      ],
    },
  ];

  const addChapter = () => {
    chapterDialogVisible.value = true;
    chapterName.value = "";
  };
  const addCourseCard = (e: Event) => {
    e.stopPropagation();
    card.value = initCard;
    cardDialogVisible.value = true;
  };
  const updateCourseCard = (e: Event, chapter: ICourseCard) => {
    e.stopPropagation();
    if (chapter.type === "1") {
      updateCourse(chapter);
    } else {
      updateCard(chapter as ICourseCard);
    }
  };
  const deleteCourseCard = (e: Event) => {
    e.stopPropagation();
    cardDialogVisible.value = true;
  };
  // 公用的按钮，重新区分
  const updateCourse = (curChapter: ICourseCard) => {
    chapterDialogVisible.value = true;
    chapterName.value = curChapter.name as string;
  };
  const updateCard = (curCard: ICourseCard) => {
    cardDialogVisible.value = true;
    card.value = curCard;
  };

  return {
    chapterName,
    chapterDialogVisible,
    cardDialogVisible,
    treeData,
    card,
    addChapter,
    addCourseCard,
    updateCourseCard,
    deleteCourseCard,
    defaultProps,
  };
};

export default useCourseChapter;
