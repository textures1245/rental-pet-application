import { createApp, markRaw } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/appRoutes";
import store from "./store/store";

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

const vuetify = createVuetify({
  components,
  directives,
});

app.use(pinia);
app.use(router);
app.use(vuetify);

router.isReady().then(() => {
  app.mount("#app");
});
