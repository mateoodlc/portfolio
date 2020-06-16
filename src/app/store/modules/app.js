/**
 * Created by mendieta on 10/23/16.
 */

import { environment } from "src/config";
export const LOCALE_CHANGED = "locale/changed";
export const LOCALE_LOADING = "locale/loading";
export const ASSET_LOADING = 'app/loading';
export const SHOW_ABOUT = 'app/showAbout';
export const HIDE_ABOUT = 'app/hideAbout';
export const SHOW_CONTACT = 'app/showContact';
export const HIDE_CONTACT = 'app/hideContact';
export const DISPLAY_WORK = 'app/animWork';
export const HIDE_WORK = 'app/hideWork';

const state = {
    public: environment.url.public,
    locale: "",
    locale_loading: false,
    loading: true,
    showAbout: false,
    showContact: false,
    displayWork: false,
};

const actions = {
    [LOCALE_LOADING]({commit}){
        commit(LOCALE_LOADING, true);
    },
    [LOCALE_CHANGED]({commit}, locale){
        commit(LOCALE_CHANGED, locale);
    },
    [ASSET_LOADING]({commit}, payload){
        commit(ASSET_LOADING, payload);
    },
    [SHOW_ABOUT]({commit}){
        commit(SHOW_ABOUT, true);
    },
    [HIDE_ABOUT]({commit}){
        commit(HIDE_ABOUT, false);
    },
    [SHOW_CONTACT]({commit}){
        commit(SHOW_CONTACT, true);
    },
    [HIDE_CONTACT]({commit}){
        commit(HIDE_CONTACT, false);
    },
    [DISPLAY_WORK]({commit}){
        commit(DISPLAY_WORK, true);
    },
    [HIDE_WORK]({commit}){
        commit(HIDE_WORK, false);
    },
};

const mutations = {
    [LOCALE_CHANGED](state, locale){
        state.locale = locale;
        state.locale_loading = false;
    },
    [LOCALE_LOADING](state){
        state.locale_loading = true;
    },
    [ASSET_LOADING](state, payload){
        state.loading = payload;
    },
    [SHOW_ABOUT](state){
        state.showAbout = true;
    },
    [HIDE_ABOUT](state){
        state.showAbout = false;
    },
    [SHOW_CONTACT](state){
        state.showContact = true;
    },
    [HIDE_CONTACT](state){
        state.showContact = false;
    },
    [DISPLAY_WORK](state){
        state.displayWork = true;
    },
    [HIDE_WORK](state){
        state.displayWork = false;
    },
};

const getters = {
    locale: state => {
        return state.locale;
    },
    public: state => {
        return state.public;
    },
    about: state => {
        return state.showAbout;
    },
    contact: state => {
        return state.showContact;
    },
    display: state => {
        return state.displayWork;
    }
};

export default {state, actions, mutations, getters};
