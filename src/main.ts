import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

//- Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//- Pinia configuration
import { createPinia } from "pinia";
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(pinia).use(vuetify).mount("#app");
