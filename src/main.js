import Vue from "vue";
import App from "./layout/App.vue";

import "./css/estilos.scss";

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
    render: h => h(App)
}).$mount("#app");