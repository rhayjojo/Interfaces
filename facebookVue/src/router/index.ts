import { createRouter, createWebHistory } from "vue-router";

import login from "@/views/login.vue";
import home from "@/views/home.vue";
import forgetPassWord from "@/views/forgetPassWord.vue";
import register from "@/views/register.vue";

const routes = [
    { path: '/', component: register },
    { path: '/home', component: home },
    { path: '/login', component: login },
    { path: '/forgetPassWord', component: forgetPassWord },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
