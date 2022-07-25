import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router/index";
import components from "@/components";
import "@/assets/styles/normalize.less";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(components);
app.mount("#app");
