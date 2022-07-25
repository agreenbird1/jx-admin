import type { App } from "vue";
import AsideMenu from "./AsideMenu.vue";
import MainHeader from "./MainHeader.vue";
import MyTable from "./MyTable.vue";
import RequireLabel from "./RequireLabel.vue";

AsideMenu.name = "aside-menu";
MainHeader.name = "main-header";
MyTable.name = "my-table";
RequireLabel.name = "require-label";
const components = [RequireLabel, MyTable, MainHeader, AsideMenu];

export default {
  install: (app: App) => {
    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
};
