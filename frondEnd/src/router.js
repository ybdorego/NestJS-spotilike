
import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue';
import SginIn from '@/components/UserView/SginIn.vue';
import Profile from '@/components/UserView/Profile.vue';
import SginUp from '@/components/UserView/SginUp.vue';
import Albums from "@/components/AlbemView/Albums.vue"; 
import AlbumsView from "@/components/AlbemView/AlbumsView.vue"; 
import Artiste from "@/components/ArtisteView/Artiste.vue";
import ArtistView from "@/components/ArtisteView/ArtistView.vue";
import Gener from '@/components/GenresView/Gener.vue';


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
        component: Albums
    },
    {
        path: '/albums/:id',
     
        component: AlbumsView
    },
    {
        path: '/register',
        component: SginUp
      },
    {
        path: '/artiste',
        component: Artiste
    },
    {
         path: '/artiste/:id',
         component: ArtistView
    },
    {
        path: '/gener',
        name: 'gener',
        component: Gener
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