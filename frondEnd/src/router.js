
import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue';
import SginIn from '@/components/UserView/SginIn.vue';
import Profile from '@/components/UserView/Profile.vue';
import SginUp from '@/components/UserView/SginUp.vue';
import Library from "@/components/AlbemView/Library.vue"; 
import AlbumsView from "@/components/AlbemView/AlbumsView.vue"; 
import Artiste from "@/components/ArtisteView/Artiste.vue";
import ArtistView from "@/components/ArtisteView/ArtistView.vue";


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
        path: '/albums',
        name: 'albums',
        component: Library
    },
    {
        path: '/albums/:id',
        name: 'albums',
        component: AlbumsView
    },
    {
        path: '/artiste',
        name: 'artiste',
        component: Artiste
    },
    {
        path: '/artiste/:id',
        name: 'artiste',
        component: ArtistView
    },
    
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },





]






const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;