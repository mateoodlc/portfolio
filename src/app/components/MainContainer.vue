<style src="styles/components/MainContainer.styl" lang="stylus" scoped></style>

<script>
    import AppHeader from "app/components/AppHeader.vue";
    import BackgroundVideo from "foo/components/BackgroundVideo.vue";
    import ExtraLinksComponent from "app/components/ExtraLinksComponent.vue"
    import AboutComponent from "app/components/AboutComponent.vue"
    import ContactComponent from "app/components/ContactComponent.vue"
    import { HIDE_ABOUT, SHOW_ABOUT, SHOW_CONTACT, HIDE_CONTACT } from '../store/modules/app';
    import Home from "app/views/Home.vue";

    export default {
        name: "MainContainer",
        data() {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
                showAbout: false,
                showContact: false,
            };
        },
        created() {
        },
        mounted() {
            App.resize.add(this.onResize);
        },
        props: {},
        components: {AppHeader, BackgroundVideo, ExtraLinksComponent, AboutComponent, ContactComponent, Home},
        methods: {
            onResize(data) {
                this.width = data.width;
                this.height = data.height;
            },
            onAboutClicked() {
                if (this.$store.getters.about) {
                    this.$store.commit(HIDE_ABOUT);
                } else {
                    this.$store.commit(SHOW_ABOUT);
                }
            },
            onContactClicked() {
                if (this.$store.getters.contact) {
                    this.$store.commit(HIDE_CONTACT);
                } else {
                    this.$store.commit(SHOW_CONTACT);
                }
            },
        },
        computed: {}
    };
</script>

<template>
    <div class="MainContainer" id="main-container_id">
        <keep-alive>
            <home/>
        </keep-alive>
        <svg class="logo">
            <use xlink:href="#icon-mocLogo"/>
        </svg>
        <about-component v-show="$store.getters.about"></about-component>
        <contact-component v-show="$store.getters.contact"></contact-component>
        <extra-links-component @isContactClicked="onContactClicked" @isAboutClicked="onAboutClicked"></extra-links-component>
    </div>
</template>
