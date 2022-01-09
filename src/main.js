import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";

import Modal from "./components/global/Modal.vue";

import Header from "./components/global/Header.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowLeft,
  faBars,
  faUser,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
library.add(faArrowLeft, faBars, faUser, faTimes, faPlus);

const app = createApp(App);

app.component("fa-icon", FontAwesomeIcon);
app.component("vModal", Modal);
app.component("vHeader", Header);

app.use(router).mount("#app");
