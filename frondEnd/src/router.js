
import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue';
import SginIn from '@/components/UserView/SginIn.vue';
import Profile from '@/components/UserView/Profile.vue';
import SginUp from '@/components/UserView/SginUp.vue';
import Albums from "@/components/AlbumView/Albums.vue"; 
import AlbumsView from "@/components/AlbumView/AlbumsView.vue"; 
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
        component: Home,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/albums',
        component: Albums, 
        meta: {
            requiresAuth: true
          }

    },
    {
        path: '/albums/:id',
     
        component: AlbumsView,
        meta: {
        requiresAuth: true
      }
    },
    {
        path: '/register',
        component: SginUp
      },
    {
        path: '/artiste',
        component: Artiste,
        meta: {
            requiresAuth: true
          }
    },
    {
         path: '/artiste/:id',
         component: ArtistView,
         meta: {
            requiresAuth: true
          }
    },
    {
        path: '/gener',
        name: 'gener',
        component: Gener,
        meta: {
            requiresAuth: true
          }
   },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            requiresAuth: true
          }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === from.name) {
      return next();
    }
    next();
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem("user") == null) {
        next({
          path: "/"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router;