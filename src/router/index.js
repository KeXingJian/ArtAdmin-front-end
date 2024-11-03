import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import ErrPage from "../components/errPage/ErrPage.vue";
import ContentPage from "@/components/contentPage/ContentPage.vue";
import ArtHome from "@/components/contentPage/content/ArtHome.vue";
import ArtIllustrated from "@/components/contentPage/content/ArtIllustrated.vue";
import ArtDictionary from "@/components/contentPage/content/ArtDictionary.vue";
import ArtAudit from "@/components/contentPage/content/ArtAudit.vue";
import ArtAuthentication from "@/components/contentPage/content/ArtAuthentication.vue";
import ArtMe from "@/components/contentPage/content/ArtMe.vue";
import ArtPicture from "@/components/contentPage/content/ArtPicture.vue";
import RegisterPage from "@/components/RegisterPage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: ContentPage,
        meta: {requiresAuth: true},
        children: [
            {
                path: 'ArtHome',
                name: 'ArtHome',
                component: ArtHome,
                meta: {requiresAuth: true}
            },
            {
                path: 'ArtIllustrated',
                name: 'ArtIllustrated',
                component: ArtIllustrated,
                meta: {requiresAuth: true}
            },
            {
                path: 'ArtDictionary',
                name: 'ArtDictionary',
                component: ArtDictionary,
                meta: {requiresAuth: true}
            },
            {
                path: 'ArtAudit',
                name: 'ArtAudit',
                component: ArtAudit,
                meta: {requiresAuth: true}
            },
            {
                path: 'ArtAuthentication',
                name: 'ArtAuthentication',
                component: ArtAuthentication,
                meta: {requiresAuth: true}
            },
            {
                path: 'ArtMe',
                name: 'ArtMe',
                component: ArtMe,
                meta: {requiresAuth: true}
            },
            {
                path: 'ArtPicture',
                name: 'ArtPicture',
                component: ArtPicture,
                meta: {requiresAuth: true}
            }

        ],

    },


    {
        path: '/loginPage',
        name: 'loginPage',
        component: LoginPage,
        meta: {requiresAuth: false},
    },
    {
        path: '/registerPage',
        name: 'registerPage',
        component: RegisterPage,
        meta: {requiresAuth: false},
    },
    {
        path: '/errPage',
        name: 'errPage',
        component: ErrPage,
        meta: {requiresAuth: true}
    }
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({path: '/loginPage'});
        } else {
            next();
        }
    } else {
        next();
    }

});


export default router;