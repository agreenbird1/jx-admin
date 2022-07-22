import { ref } from "vue";

interface IInfo {
  name: string;
  PDF: string;
}

const useCourseInfo = () => {
  const infoDialogVisible = ref(false);
  const info = ref<IInfo>({
    name: "",
    PDF: "",
  });
  const tableData = [
    {
      name: "测试propname",
      PDF: "www.hadi1y28ehdas.conconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFasdiqwe871t2dcsaiudoASFASF.PDF",
    },
    {
      name: "测试propname",
      PDF: "www.hadi1y28ehdas.conconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFasdiqwe871t2dcsaiudoASFASF.PDF",
    },
    {
      name: "测试propname",
      PDF: "www.hadi1y28ehdas.conconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFasdiqwe871t2dcsaiudoASFASF.PDF",
    },
    {
      name: "测试propname",
      PDF: "www.hadi1y28ehdas.conconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFconasdiqwe871t2dcsaiudoASFASFasdiqwe871t2dcsaiudoASFASF.PDF",
    },
  ];

  const addInfo = () => {
    info.value.PDF = "";
    info.value.name = "";
    infoDialogVisible.value = true;
  };
  const updateInfo = (curInfo: IInfo) => {
    infoDialogVisible.value = true;
    info.value = curInfo;
  };
  const deleteInfo = () => {
    infoDialogVisible.value = true;
  };

  return {
    info,
    infoDialogVisible,
    addInfo,
    updateInfo,
    deleteInfo,
    tableData,
  };
};

export default useCourseInfo;
