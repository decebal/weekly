import Vue from "vue";
import Vuex from "vuex";

const highlight = require("highlight.js");
const marked = require("marked");
const axios = require("axios");


marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

Vue.use(Vuex);

const createID = () => {
    let t = "";
    for (let i = 0; i < 15; i++) {
        t += Math.floor(Math.random() * 10);
    }
    return t;
};

const saveID = (state) => {
    const idArr = [];
    for (let i = 0, len = state.archiveList.length; i < len; i++) {
        idArr.push(state.archiveList[i].id);
        localStorage.setItem("idArr", idArr.join(","));
    }
};

export default new Vuex.Store({
    state: {
        showMenu: true,
        archiveList: [
            {
                id: createID(),
                title: "Untitled",
                content: "Untitled\n---\n",
                current: false
            }
        ],
        templateList: [
        ]
    },
    mutations: {
        SHOW_MENU: function (state) {
            state.showMenu = !state.showMenu;
        },
        TEXT_INPUT: function (state, txt) {
            for (let i = 0, len = state.archiveList.length; i < len; i++) {
                if (state.archiveList[i].current) {
                    state.archiveList[i].content = txt;
                }
            }
        },
        SAVE_TO_CACHE: function (state) {
            for (let i = 0, len = state.archiveList.length; i < len; i++) {
                if (state.archiveList[i].current) {
                    localStorage.setItem(state.archiveList[i].id, state.archiveList[i].content);
                    saveID(state);
                }
            }
        },
        READ_FROM_CACHE: function (state) {
            for (let i = 0, len = state.archiveList.length; i < len; i++) {
                if (state.archiveList[i].current) {
                    state.archiveList[i].content = localStorage.getItem(state.archiveList[i].id);
                }
            }
        },
        SELECT_THIS: function (state, index) {
            for (let i = 0, len = state.archiveList.length; i < len; i++) {
                state.archiveList[i].current = false;
            }
            state.archiveList[index].current = true;
        },
        NEW_ARTICLE: function (state) {
            for (let i = 0, len = state.archiveList.length; i < len; i++) {
                state.archiveList[i].current = false;
            }

            const newOne = {
                id: createID(),
                content: "Untitled\n---",
                current: true
            };

            state.archiveList.push(newOne);
        },
        DELETE_THIS: function (state, index) {
            if (state.archiveList.length > 1) {
                const idArr = localStorage.getItem("idArr").split(",");
                const loc = idArr.indexOf(state.archiveList[index].id);
                idArr.splice(loc, 1);
                localStorage.setItem("idArr", idArr);

                localStorage.removeItem(state.archiveList[index].id);
                state.archiveList.splice(index, 1);

                for (let i = 0, len = state.archiveList.length; i < len; i++) {
                    state.archiveList[i].current = false;
                }
                state.archiveList[0].current = true;
            }
        },
        READ_LIST_FROM_LOCAL: function (state) {
            if (localStorage.getItem("idArr")) {
                state.archiveList = null;
                const idArr = localStorage.getItem("idArr").split(",");
                const articleArr = [];
                for (let i = 0, len = idArr.length; i < len; i++) {
                    const articleObj = {
                        id: "",
                        content: "",
                        current: false
                    };
                    articleObj.id = idArr[i];
                    articleObj.content = localStorage.getItem(idArr[i]);
                    articleArr.push(articleObj);
                }
                state.archiveList = articleArr;
                state.archiveList[0].current = true;
            }
        }
    },
    actions: {
        showMenu: function ({ commit }) {
            commit("SHOW_MENU");
        },
        textInput: function ({ commit }, txt) {
            commit("TEXT_INPUT", txt);
        },
        selectThis: function ({ commit }, index) {
            commit("SELECT_THIS", index);
        },
        newArticle: function ({ commit }) {
            commit("NEW_ARTICLE");
            commit("SAVE_TO_CACHE");
        },
        deleteThis: function ({ commit }, index) {
            commit("DELETE_THIS", index);
        },
        saveToCache: function ({ commit }) {
            commit("SAVE_TO_CACHE");
        },
        readFromCache: function ({ commit }) {
            commit("READ_FROM_CACHE");
        },
        loadCache: function ({ commit }) {
            commit("READ_LIST_FROM_LOCAL");
        }
    },
    getters: {
        articleRaw: (state) => {
            let content = "";
            for (let i = 0, len = state.archiveList.length; i < len; i++) {
                if (state.archiveList[i].current) {
                    content = state.archiveList[i].content;
                }
            }
            return content;
        },
        articleMd: (state, getters) => marked(getters.articleRaw),
        archiveList: state => state.archiveList,
        templateList: state => state.templateList
    }
});
