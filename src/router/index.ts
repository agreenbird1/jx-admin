import { createRouter, createWebHashHistory } from "vue-router";
import nProgress from "nprogress";
// 需要引入css
import "nprogress/nprogress.css";
import { useAdminStore } from "@/store/admin";
import pinia from "@/store";

const adminStore = useAdminStore(pinia);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("@/views/Layout.vue"),
      redirect: "/subject",
      children: [
        {
          path: "course",
          name: "course",
          component: () => import("@/views/course/index.vue"),
          children: [
            {
              path: "operatecourse",
              name: "operatecourse",
              component: () =>
                import("@/views/course/components/OperateCourse.vue"),
            },
          ],
        },
        {
          path: "chapter",
          name: "chapter",
          component: () => import("@/views/chapter/index.vue"),
        },
        {
          path: "subject",
          name: "subject",
          component: () => import("@/views/subject/index.vue"),
          children: [
            {
              path: "operatesubject",
              name: "operatesubject",
              component: () =>
                import("@/views/subject/components/OperateSubject.vue"),
            },
          ],
        },
      ],
      beforeEnter(to) {
        if (adminStore && adminStore.id) return true;
        else {
          router.push("/login");
          return false;
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, left: 0 };
  },
});

// 配置 nprogress
router.beforeEach((to, from, next) => {
  nProgress.start();
  next();
});
router.afterEach(() => {
  nProgress.done();
});

export default router;
