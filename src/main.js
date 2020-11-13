import Vue from "vue";
import App from "./layout/App.vue";

import "./css/estilos.css";

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
    render: h => h(App)
}).$mount("#app");