import Vue from 'nativescript-vue'
import App from './components/App'
import LandingPage from './components/LandingPage'
import VueDevtools from 'nativescript-vue-devtools'

Vue.registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


import * as firebase from "nativescript-plugin-firebase"
import { messaging, Message } from "nativescript-plugin-firebase/messaging";

firebase.init()
    .then(instance => {
        console.log("Firebase init success");
        /*firebase.registerForPushNotifications(
            {
              showNotifications: true,
              showNotificationsWhenInForeground: true,
              onPushTokenReceivedCallback: token => console.log(`------------------- token received: ${token}`),
              onMessageReceivedCallback: message => console.log(`------------------- message received`)
            })
            .then(instance => console.log("registerForPushNotifications done"))*/
        messaging.registerForPushNotifications({

            onPushTokenReceivedCallback: (token) => {
                console.log("Firebase plugin received a push token: " + token);
            },

            onMessageReceivedCallback: (message) => {
                console.log("Push message received: " + message.title);
            },

            // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
            showNotifications: true,

            // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
            showNotificationsWhenInForeground: true
        })
            .then(() => console.log("Registered for push"))
            .catch(error => console.log(`-------------- registerForPushNotifications error: ${error}`));
    })
    .catch(error => console.log(`firebase.init error: ${error}`));

setTimeout(()=>{
    messaging.getCurrentPushToken()
        //do not do anything more
        .then(token => console.log(`Current push token: ${token}`));
}, 5000);


new Vue({
  render: h => h('frame', [h(LandingPage)])
}).$start()
