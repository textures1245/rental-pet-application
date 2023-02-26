import { createApp, markRaw } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/appRoutes";
import store from "./store/store";

//- firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseApp } from "./firebase.config";
import { getAnalytics } from "firebase/analytics";
import { VueFire, VueFireAuth } from "vuefire";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import "@formkit/themes/genesis";
import { plugin, defaultConfig } from "@formkit/vue";

//- Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";

//- Pinia configuration
const app = createApp(App);
const pinia = createPinia();

// Initialize Firebase

const vuetify = createVuetify({
  components,
  directives,
});

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});

app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig);
app.use(vuetify);

router.isReady().then(() => {
  app.mount("#app");
});
