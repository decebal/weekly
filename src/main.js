/* eslint-disable no-new */
import Vue from "vue";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import App from "./App";
import store from "../vuex/store";


if (process.env.NODE_ENV === "production") {
    OfflinePluginRuntime.install({
        onUpdateReady: function () {
            OfflinePluginRuntime.applyUpdate();
        },
        onUpdated: function () {
            window.location.reload();
        }
    });
}

new Vue({
    el: "#app",
    store: store,
    render: h => h(App)
});

