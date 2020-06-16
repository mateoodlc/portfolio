<style src="styles/components/AboutComponent.styl" lang="stylus" scoped></style>

<script>
    import { SHOW_ABOUT, HIDE_ABOUT } from "app/store/modules/app.js"
    export default {
        name: "AboutComponent",
        data() {
            return {
                tl: undefined,
                styleObject: {
                    position: 'fixed',
                    width: "100px",
                    height: 0,
                    bottom: 0,
                }
            };
        },
        props: {},
        components: {},
        methods: {
            onShowAbout(el, done) {
                this.$store.commit(SHOW_ABOUT);
                if (this.$store.getters.about) {
                    this.tl.timeScale(1).play();
                } else {
                    this.closeAboutTl.reverse();
                }
            },
            onHideAbout(el, done) {
                this.$store.commit(HIDE_ABOUT);
                this.tl.timeScale(1.4).reverse();
            },
            onCloseHover() {
                this.closeAboutHover.play();
            },
            onCloseHoverOut() {
                this.closeAboutHover.reverse();
            },
            onCloseAbout() {
                this.closeAboutHover = new TimelineMax({delay: 0, paused: true});
                this.closeAboutHover.fromTo(this.$refs.closeArrow, 0.3, {y: "10%"}, {y: "70%"});
            }
        },
        computed: {},
        mounted() {
            this.$nextTick(() => {
                this.tl = new TimelineMax({delay: 0.5, paused: true})
                this.tl.fromTo(this.$el, 0.4, {height: "0px"}, {height: '100vh', ease: Power3.easeOut});
                this.tl.to(this.$el, 0, {zIndex: "10"})
                this.tl.to(this.$el, 0.4, {width: '100%', ease: Power3.easeOut});
                this.tl.add(TweenMax.fromTo(this.$refs.title, 0.5, {y: "100%", alpha: 0}, {y: "10%", alpha: 1, ease: Power2.linear}), 0.7);
                this.tl.add(TweenMax.fromTo(this.$refs.information, 0.5, {y: "100%", alpha: 0}, {y: "10%", alpha: 1, ease: Power2.linear}), 0.8);
                this.tl.add(TweenMax.fromTo(this.$refs.aspectItem, 0.5, {y: "100%", alpha: 0}, {y: "10%", alpha: 1, ease: Power2.linear}), 0.9);
                this.onCloseAbout();
            })
        }
    };
</script>

<template>
    <transition @enter="onShowAbout" @leave="onHideAbout">
        <div class="AboutComponent" :style="styleObject">
            <div class="info-details">
                <div class="about-information">
                    <h1 ref="title">I'm Mateo Orobio. Glad you meet me</h1>
                    <h2 ref="information">Mainly interested in front end creativity, focused on beautify all user interfaces and make the functionality great through user centered interaction</h2>
                    <div ref="aspectItem" class="aspects-items">
                        <span class="item">
                            <h3>User Centered</h3>
                        </span>
                        <span class="item">
                            <h3>User Centered</h3>
                        </span>
                        <span class="item">
                            <h3>User Centered</h3>
                        </span>
                    </div>
                </div>
            </div>
            <div class="photo-of-me"></div>
            <div ref="closeBtn" v-show="$store.getters.about" @mouseover="onCloseHover" @click="onHideAbout" @mouseout="onCloseHoverOut" class="closeBtn">
                <h2>Close</h2>
                <div ref="closeArrow" class="close-arrow">
                    <span ref="closeLine1" class="close-line1"></span>
                    <span ref="closeLine2" class="close-line2"></span>
                </div>
            </div>
        </div>
    </transition>
</template>
