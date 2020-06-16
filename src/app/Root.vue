<style src="styles/views/Root.styl" lang="stylus" scoped></style>

<script>
import { mapState } from "vuex";
import isMobile from "ismobilejs";
import Loader from "app/components/base/Loader.vue";
import RotateScreen from "app/components/base/RotateScreen.vue";
import MainContainer from "app/components/MainContainer.vue";
import Preloader from "./components/base/Preloader";

export default {
    name: "App",
    components: {
        Preloader,
        Loader,
        RotateScreen,
        MainContainer,
    },
    methods: {
        onDeprecateScroll() {
            if (this.$store.getters.about) {
                document.getElementById("app").style.overflow = "hidden";
            } else {
                document.getElementById("app").style.overflow = "auto";
            }
        },
    },
    computed: {
        ...mapState({
            started: state => !state.app.loading,
        }),
        isPhone() {
            return isMobile.phone;
        },
        aboutUs() {
            return this.$store.getters.about;
        }
    },
    watch: {
        aboutUs() {
            this.onDeprecateScroll();
        }
    }
};
</script>

<template>
    <div id="app">
        <preloader v-if="!started" transitionMode="out-in"></preloader>
        <template v-if="started">
            <loader></loader>
            <main-container></main-container>
            <rotate-screen v-if="isPhone"></rotate-screen>
        </template>
    </div>
</template>
