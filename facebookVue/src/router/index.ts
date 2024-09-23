import { createRouter, createMemoryHistory } from "vue-router";

import login from "@/views/login.vue";
import home from "@/views/home.vue";
import forgetPassWord from "@/views/forgetPassWord.vue";
import register from "@/views/register.vue";

const routes = [
    { path: '/home', component: home },
    { path: '/login', component: login },
    { path: '/forgetPassWord', component: forgetPassWord },
    { path: '/', component: register }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

  export default router;