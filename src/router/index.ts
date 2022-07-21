import { createRouter, createWebHashHistory } from "vue-router";

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
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, left: 0 };
  },
});

export default router;
