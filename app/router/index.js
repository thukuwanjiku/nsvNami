import Vue from 'nativescript-vue';
import NsVueNami from 'ns-vue-nami';
import login from '~/components/Login';
import dashboard from '~/components/App';
import AuthService from './../services/AuthService';

Vue.use(NsVueNami);

const vm = new Vue();
var authService = new AuthService();
console.log(authService.isLoggedIn());
var isAuthenticated = true //authService.isLoggedIn();

vm.$nami.authGuard((next) => {
    if(true/*authService.isLoggedIn()*/) {
        next();
    } else {
        next('login');
    }
});

// register all routes here.
vm.$nami.init({
    routes: [
        {
            name: 'login',
            component: login,
            noAuth: true,
            entry: !isAuthenticated
        },
        {
            name: 'dashboard',
            component: dashboard,
            entry: isAuthenticated
        }
    ]
});