import { createWebHistory, createRouter } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../components/Login.vue"),
    },
    {
        path: "/posts",
        name: "PostList",
        component: () => import("../components/PostList.vue"), // 文章列表 + 新增文章
    },
    {
        path: "/posts/:id",
        name: "PostDetail",
        component: () => import("../components/PostDetail.vue"), // 單篇文章留言區
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
