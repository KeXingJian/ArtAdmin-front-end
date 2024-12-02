import Vue from 'vue';
import VueRouter, {NavigationFailureType} from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import ErrPage from "../components/errPage/ErrPage.vue";
import ContentPage from "@/components/contentPage/ContentPage.vue";
import ArtHome from "@/components/contentPage/content/ArtHome.vue";
import ArtIllustrated from "@/components/contentPage/content/ArtIllustrated.vue";
import ArtDictionary from "@/components/contentPage/content/ArtDictionary.vue";
import ArtAudit from "@/components/contentPage/content/ArtAudit.vue";
import ArtMe from "@/components/contentPage/content/ArtMe.vue";
import ArtPicture from "@/components/contentPage/content/ArtPicture.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import VideoAudit from "@/components/contentPage/content/audit/VideoAudit.vue";
import ArtistAudit from "@/components/contentPage/content/audit/ArtistAudit.vue";
import PictureAudit from "@/components/contentPage/content/audit/PictureAudit.vue";
import DictionaryAudit from "@/components/contentPage/content/audit/DictionaryAudit.vue";
import CollectionAudit from "@/components/contentPage/content/audit/CollectionAudit.vue";
import UserAudit from "@/components/contentPage/content/audit/UserAudit.vue";
import VideoPlayPage from "@/components/contentPage/content/VideoPlayPage.vue";
import VideoAuditPage from "@/components/contentPage/content/VideoAuditPage.vue";
import {getRole} from "@/utils";
import { isNavigationFailure } from 'vue-router';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: ContentPage,
        meta: {requiresAuth: true,roles:['admin','root','user']},
        children: [
            {
                path: 'ArtHome',
                name: 'ArtHome',
                component: ArtHome,
                meta: {requiresAuth: true,roles:['admin','root','user']},
            },
            {
                path: 'ArtIllustrated',
                name: 'ArtIllustrated',
                component: ArtIllustrated,
                meta: {requiresAuth: true,roles:['admin','root','user']},
            },
            {
                path: 'ArtDictionary',
                name: 'ArtDictionary',
                component: ArtDictionary,
                meta: {requiresAuth: true,roles:['admin','root','user']},
            },
            {
                path: 'ArtAudit',
                name: 'ArtAudit',
                component: ArtAudit,
                meta: {requiresAuth: true,roles:['admin','root']},
                children: [
                    {
                        path: 'VideoAudit',
                        name: 'VideoAudit',
                        component: VideoAudit,
                        meta: {requiresAuth: true,roles:['admin','root']},
                    },
                    {
                        path: 'ArtistAudit',
                        name: 'ArtistAudit',
                        component: ArtistAudit,
                        meta: {requiresAuth: true,roles:['admin','root']},
                    },
                    {
                        path: 'PictureAudit',
                        name: 'PictureAudit',
                        component: PictureAudit,
                        meta: {requiresAuth: true,roles:['admin','root']},
                    },
                    {
                        path: 'DictionaryAudit',
                        name: 'DictionaryAudit',
                        component: DictionaryAudit,
                        meta: {requiresAuth: true,roles:['admin','root']},

                    },
                    {
                        path: 'CollectionAudit',
                        name: 'CollectionAudit',
                        component: CollectionAudit,
                        meta: {requiresAuth: true,roles:['admin','root']},
                    },
                    {
                        path: 'UserAudit',
                        name: 'UserAudit',
                        component: UserAudit,
                        meta: {requiresAuth: true,roles:['admin','root']},
                    }
                ]
            },
            {
                path: 'ArtMe',
                name: 'ArtMe',
                component: ArtMe,
                meta: {requiresAuth: true,roles:['admin','root','user']},
            },
            {
                path: 'ArtPicture',
                name: 'ArtPicture',
                component: ArtPicture,
                meta: {requiresAuth: true,roles:['admin','root','user']},
            },
            {
                path: 'VideoPlayPage',
                name: 'VideoPlayPage',
                component: VideoPlayPage,
                meta: {requiresAuth: true,roles:['admin','root','user']},
            },
            {
                path: 'VideoAuditPage',
                name: 'VideoAuditPage',
                component: VideoAuditPage,
                meta: {requiresAuth: true,roles:['admin','root']},
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
        meta: {requiresAuth: false}
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
            const role = getRole(token);
            if (role && to.meta.roles.includes(role)) {
                next();
            } else {
                next({path: '/loginPage'});
            }
        }
    } else {
        next();
    }

});
router.onError(error => {
    if (isNavigationFailure(error, NavigationFailureType.duplicated)) {

        return;
    }

});

export default router;