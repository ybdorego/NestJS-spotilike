
import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';

import SginIn from './components/SginIn.vue';
import SginUp from './components/SginUp.vue';
import Library from "@/components/Library.vue";
const routes = [
    {
        path: '/',
        name: 'login',
        component: SginIn
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/SginUp',
        name: 'SginUp',
        component: SginUp
    },
    {
        path: '/library',
        name: 'library',
        component: Library
    },




]






const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;