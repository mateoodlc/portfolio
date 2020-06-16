<style src="styles/components/ContactComponent.styl" lang="stylus" scoped></style>

<script>
import { HIDE_CONTACT, SHOW_CONTACT } from '../store/modules/app';
export default {
    name: "ContactComponent",
    data() {
        return {
            componentStyle: {
                position: "fixed",
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#000",
                width: 0,
                height: 0,
                bottom: 0,
                left: "20%",
                zIndex: "-1"
            },
            tl: undefined,
        };
    },
    props: {},
    components: {},
    methods: {
        onShowContact(el, done) {
            this.$store.commit(SHOW_CONTACT);
            this.tl.timeScale(1).play();
            TweenMax.staggerFromTo([this.$refs.mail, this.$refs.phone, this.$refs.title], 0.2, {opacity: 0}, {opacity: 1, ease: Power2.easeOut}, 0, done)
        },
        onHideContact(el, done) {
            this.$store.commit(HIDE_CONTACT);
            this.tl.timeScale(1).reverse();
        },
        onCloseHover() {
            this.closeContactHover.play();
        },
        onCloseHoverOut() {
            this.closeContactHover.reverse();
        },
        onCloseContact() {
            this.closeContactHover = new TimelineMax({delay: 0, paused: true});
            this.closeContactHover.fromTo(this.$refs.closeArrow, 0.3, {y: "10%"}, {y: "70%"});
        }
    },
    computed: {},
    mounted() {
        this.$nextTick(() => {
            this.tl = new TimelineMax({delay: 0.2, paused: true})
            this.tl.fromTo(this.$el, 0.4, {height: "0px"}, {height: '100vh', ease: Power3.easeOut});
            this.tl.to(this.$el, 0, {zIndex: "10"})
            this.tl.fromTo(this.$el, 0.6, {width: "0%"}, {width: '100%', left: 0, ease: Power3.easeOut});
            this.onCloseContact();
        })
    }
};
</script>

<template>
    <transition @enter="onShowContact" @leave="onHideContact">
        <div class="ContactComponent" :style="componentStyle">
            <h2 ref="mail" class="mail" :style="{opacity: 0}">mateo@foostudio.mx</h2>
            <h2 ref="phone" class="phone" :style="{opacity: 0}">(+52)1 55 3804 5126</h2>
            <h2 ref="title" class="title" :style="{opacity: 0}">DO NOT HESITATE WRITING!</h2>
            <div ref="closeBtn" v-show="this.$store.getters.contact" @mouseover="onCloseHover" @click="onHideContact" @mouseout="onCloseHoverOut" class="closeBtn">
                <h2>Close</h2>
                <div ref="closeArrow" class="close-arrow">
                    <span ref="closeLine1" class="close-line1"></span>
                    <span ref="closeLine2" class="close-line2"></span>
                </div>
            </div>
        </div>
    </transition>
</template>
