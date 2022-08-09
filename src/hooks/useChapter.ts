import { ref } from "vue";
import { ElMessage } from "element-plus";
import {
  getAllChapter,
  updateChapterApi,
  createChapter,
  deleteChapterApi,
} from "@/api/chapter";
import type { IChapterData } from "@/api/chapter/types";

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
  // 放入 initial 数据，则不需要使用 !
  const chapters = ref<IChapterData[]>([]); // 所有的数据
  const chapter = ref<IChapterData>({}); // 当前操作的 chapter
  const parentChapterId = ref<number>();
  const expandKeys = ref<number[]>([]); // 展开的节点
  const nodeExpand = (a: any) => {
    expandKeys.value.push(a.id);
  };
  const nodeCollapse = (a: IChapterData) => {
    expandKeys.value.splice(expandKeys.value.indexOf(a.id!), 1);
  };
  const defaultProps = {
    children: "children",
    label: "content",
  };
  const isUpdate = ref(true);
  // 判断父级是否打开
  /**
   * 子节点判断父节点是否打开
   * @param id - 父级的id
   * @param type - 自身的type
   * @returns boolean 是否全部打开
   */
  const judgeParentOpen = (id: number, type: number) => {
    let ans = true;
    if (type === 1) return true;
    if (type === 2) {
      const c = chapters.value.find((c) => c.id === id);
      return c?.isFrontendShow === 1;
    } else {
      chapters.value.forEach((firNode) => {
        const c = firNode.children?.find((c) => c.id === id);
        if (c) {
          // 在这里直接返回的话，是返回在了当前的回调里，没有向外！
          ans = c.isFrontendShow === 1;
        }
      });
    }
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
    e && e.stopPropagation();
    isUpdate.value = false;
    const { id, type } = curChapter;
    chapterDialogVisible.value = true;
    chapter.value = { ...initChapter };
    chapter.value.parentId = id;
    chapter.value.type = type! + 1;
  };
  // 更新章节内容 或者 是否显示
  const updateFn = (curChapter: IChapterData, e?: Event) => {
    isUpdate.value = true;
    e && e.stopPropagation();
    chapterDialogVisible.value = true;
    const { isFrontendShow, id, content, type, parentId } = curChapter;
    chapter.value = { isFrontendShow, id, content, type, parentId };
  };
  // 删除章节
  const deleteChapter = (curChapter: IChapterData, e?: Event) => {
    e && e.stopPropagation();
    deleteDialogVisible.value = true;
    chapter.value = { ...curChapter };
  };
  // 更改展示
  const changeShow = (curChapter: IChapterData, isFrontendShow: 1 | 2) => {
    if (judgeParentOpen(curChapter.parentId!, curChapter.type!)) {
      isLoading.value = true;
      updateChapterApi({
        isFrontendShow,
        id: curChapter.id,
      }).then((res) => {
        isLoading.value = false;
        reqCb(res.data.code, "修改成功！", "修改失败！");
      });
    } else ElMessage.warning("请先开启父级展示！");
  };

  // dialog 确认后的回调
  const confirm = () => {
    chapterDialogVisible.value = false;
    if (isUpdate.value) confirmUpdate();
    else confirmAdd();
  };
  const confirmAdd = () => {
    // 父级未打开时候添加子类，如果子类设置为显示则将其关闭
    if (chapter.value.isFrontendShow === 1) {
      chapter.value.isFrontendShow = judgeParentOpen(
        chapter.value.parentId!,
        chapter.value.type!
      )
        ? 1
        : 2;
    }
    createChapter(chapter.value as IChapterData).then((res) => {
      reqCb(res.data.code, "创建章节成功！", "创建章节失败！");
    });
    chapter.value = { ...initChapter };
  };
  const confirmUpdate = () => {
    if (judgeParentOpen(chapter.value.parentId!, chapter.value.type!)) {
      isLoading.value = true;
      updateChapterApi(chapter.value as IChapterData).then((res) => {
        reqCb(res.data.code, "修改成功！", "修改失败！");
        isLoading.value = false;
      });
    } else ElMessage.warning("请先开启父级展示！");
  };
  const confirmDelete = () => {
    deleteDialogVisible.value = false;
    deleteChapterApi(chapter.value.id!).then((res) => {
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
    nodeExpand,
    nodeCollapse,
    expandKeys,
    isUpdate,
  };
};

export default useChapter;
