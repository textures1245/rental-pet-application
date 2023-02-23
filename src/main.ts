import { createApp, markRaw } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/appRoutes";
import store from "./store/store";

//- firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAnalytics } from "firebase/analytics";
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
initializeApp(firebaseConfig);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig);
app.use(vuetify);

router.isReady().then(() => {
  app.mount("#app");
});
