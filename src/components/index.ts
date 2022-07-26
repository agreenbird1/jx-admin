import type { App } from "vue";
import AsideMenu from "./AsideMenu.vue";
import MainHeader from "./MainHeader.vue";
import MyTable from "./MyTable.vue";
import RequireLabel from "./RequireLabel.vue";
import MySwitch from "./MySwitch.vue";
import {
  DataBoard,
  Folder,
  Tickets,
  Switch,
  Warning,
} from "@element-plus/icons-vue";
import {
  ElIcon,
  ElButton,
  ElTooltip,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElInput,
  ElSelect,
  ElOption,
  ElTree,
  ElTabs,
  ElTabPane,
  ElRadio,
  ElRadioGroup,
  ElHeader,
  ElContainer,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElPagination,
} from "element-plus";

AsideMenu.name = "aside-menu";
MainHeader.name = "main-header";
MyTable.name = "my-table";
RequireLabel.name = "require-label";
MySwitch.name = "my-switch";
const components = [
  RequireLabel,
  MyTable,
  MainHeader,
  AsideMenu,
  MySwitch,
  ElIcon,
  ElButton,
  ElTooltip,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElInput,
  ElSelect,
  ElOption,
  ElTree,
  ElTabs,
  ElTabPane,
  ElRadio,
  ElRadioGroup,
  ElHeader,
  ElContainer,
  ElMain,
  DataBoard,
  Folder,
  Tickets,
  Switch,
  Warning,
  ElMenu,
  ElMenuItem,
  ElPagination,
];

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
};
