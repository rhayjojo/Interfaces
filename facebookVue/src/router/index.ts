import { createRouter, createMemoryHistory } from "vue-router";

import login from "@/views/login.vue";
import home from "@/views/home.vue";
import forgetPassWord from "@/views/forgetPassWord.vue";
import register from "@/views/register.vue";
import welcome from "@/views/welcome.vue";
import path from "path";

const routes = [
    { path: '/home', component: home },
    { path: '/login', component: login },
    { path: '/forgetPassWord', component: forgetPassWord },
    { path: '/register', component: register },
    { path: '/', component: welcome},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

  export default router;