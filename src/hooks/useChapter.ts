import {
  IChapterData,
  createChapter,
  updateChapterApi,
  deleteChapterApi,
} from "@/api";
import { ref } from "vue";
import { getAllChapter } from "@/api";
import { ElMessage } from "element-plus";

const useChapter = () => {
  const isLoading = ref(true);
  const chapterDialogVisible = ref(false); // 控制添加、修改的 dialog
  const deleteDialogVisible = ref(false); // 控制删除的dialog
  // 初始的操作 chapter 的数据
  const initChapter: IChapterData = {
    parentId: 0,
    content: "",
    isFrontendShow: 1,
    type: 1,
    id: undefined,
  };
  const show = ref<1 | 2>(1); // 与 dialog 中的下拉框对应
  const chapters = ref<IChapterData[]>(); // 所有的数据
  const chapter = ref<IChapterData>(); // 当前操作的 chapter
  const parentChapterId = ref<number>();
  const defaultProps = {
    children: "children",
    label: "content",
  };
  let isUpdate = true;

  // 判断父级是否打开
  const judgeParentOpen = (id: number, type: number) => {
    let ans = false;
    chapters.value!.map((cOne) => {
      if (type === 2) {
        const item = cOne.children!.find((cTwo) => cTwo.id === id);
        if (item) {
          ans = cOne.isFrontendShow === 1;
        }
      } else {
        cOne.children?.map((cTwo) => {
          const item = cTwo.children?.find((cThree) => cThree.id === id);
          if (item) {
            ans = cOne.isFrontendShow === 1 && cTwo.isFrontendShow === 1;
          }
        });
      }
    });
    return ans;
  };

  const getAllChapterData = () => {
    isLoading.value = true;
    getAllChapter().then((res) => {
      chapters.value = res.data.data;
      isLoading.value = false;
    });
  };
  // 添加章节
  // 注意：添加子级的时候，子级是否展示由父级决定！
  const addChapter = (curChapter: IChapterData, e?: Event) => {
    console.log(curChapter);
    e && e.stopPropagation();
    isUpdate = false;
    const { id, type, isFrontendShow } = curChapter;
    chapterDialogVisible.value = true;
    chapter.value = { ...initChapter };
    chapter.value!.parentId = id;
    chapter.value!.type = type! + 1;
    chapter.value!.isFrontendShow = isFrontendShow;
  };
  // 更新章节内容 或者 是否显示
  const updateFn = (curChapter: IChapterData, e?: Event) => {
    isUpdate = true;
    e && e.stopPropagation();
    chapterDialogVisible.value = true;
    const { isFrontendShow, id, content } = curChapter;
    chapter.value = { isFrontendShow, id, content };
    show.value = curChapter.isFrontendShow!;
  };
  // 删除章节
  const deleteChapter = (id: number, e?: Event) => {
    e && e.stopPropagation();
    deleteDialogVisible.value = true;
    chapter.value = { ...initChapter };
    chapter.value.id = id;
  };
  // 更改展示
  const changeShow = (curChapter: IChapterData, isFrontendShow: 1 | 2) => {
    if (
      judgeParentOpen(curChapter.id!, curChapter.type!) ||
      curChapter.type === 1
    ) {
      updateChapterApi({
        isFrontendShow,
        id: curChapter.id,
      }).then((res) => {
        reqCb(res.data.code, "修改成功！", "修改失败！");
      });
    } else ElMessage.warning("请先开启父级展示！");
  };

  // dialog 确认后的回调
  const confirm = () => {
    chapterDialogVisible.value = false;
    if (isUpdate) confirmUpdate();
    else confirmAdd();
  };
  const confirmAdd = () => {
    createChapter(chapter.value as IChapterData).then((res) => {
      reqCb(res.data.code, "创建章节成功！", "创建章节失败！");
    });
    chapter.value = { ...initChapter };
  };
  const confirmUpdate = () => {
    if (
      judgeParentOpen(chapter.value!.id!, chapter.value!.type!) ||
      chapter.value!.type === 1
    ) {
      chapter.value!.isFrontendShow = show.value;
      updateChapterApi(chapter.value as IChapterData).then((res) => {
        reqCb(res.data.code, "修改成功！", "修改失败！");
      });
    } else ElMessage.warning("请先开启父级展示！");
  };
  const confirmDelete = () => {
    deleteDialogVisible.value = false;
    deleteChapterApi(chapter.value!.id!).then((res) => {
      reqCb(res.data.code, "删除成功！", "删除失败！");
    });
  };
  // 统一处理操作后的回调
  const reqCb = (code: number, sucMsg: string, errMsg: string) => {
    if (code >= 2000 && code < 3000) {
      ElMessage.success(sucMsg);
      getAllChapterData();
    } else ElMessage.error(errMsg);
  };

  return {
    isLoading,
    show,
    chapterDialogVisible,
    deleteDialogVisible,
    chapters,
    chapter,
    addChapter,
    updateFn,
    deleteChapter,
    defaultProps,
    parentChapterId,
    confirm,
    getAllChapterData,
    confirmDelete,
    changeShow,
  };
};

export default useChapter;
