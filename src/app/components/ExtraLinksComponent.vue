<style src="styles/components/ExtraLinksComponent.styl" lang="stylus" scoped></style>

<script>
    import isMobile from "ismobilejs";

    export default {
        name: "ExtraLinksComponent",
        data() {
            return {
                curtainStyle: {
                    position: "absolute",
                    width: "25%",
                    height: "10px",
                    backgroundColor: "#000",
                    pointerEvents: "none",
                    bottom: 0,
                },
                contactCurtainStyle: {
                    position: "absolute",
                    display: "block",
                    width: "20%",
                    height: "10px",
                    backgroundColor: "#fff",
                    pointerEvents: "none",
                },
                aboutHoverTl: undefined,
                contactHoverTl: undefined,
                tlAbout: undefined,
                tlContact: undefined,
            };
        },
        props: {},
        components: {},
        mounted() {
            this.$nextTick(() => {
                this.aboutCurtainAnimate();
                this.contactCurtainAnimate();
                //ABOUT BUTTON HOVER
                this.aboutHoverTl = new TimelineMax({delay: 0, paused: true});
                this.aboutHoverTl.fromTo(this.$refs.aboutButton, 0.4, {height: "100px"}, {height: "200px", ease: Back.easeOut});
                if (!isMobile.any) {
                    this.aboutHoverTl.fromTo(this.$refs.aboutButton, 0.2, {width: "20%"}, {width: "25%", ease: Back.easeOut})
                }
                this.aboutHoverTl.fromTo(this.$refs.aboutButton, 0.2, {boxShadow: "0px 0px 0px rgba(0,0,0,0)"}, {boxShadow: "10px -10px 20px 1px rgba(0,0,0,0.3)", ease: Power1.easeOut});
                this.aboutHoverTl.add(TweenMax.fromTo(this.$refs.line1, 0.2, {rotation: 0}, {rotation: -45, ease: Back.easeOut}), 0.5);
                this.aboutHoverTl.add(TweenMax.fromTo(this.$refs.line2, 0.2, {rotation: 0}, {rotation: 45}), 0.5);
                //CONTACT BUTTON HOVER
                this.contactHoverTl = new TimelineMax({delay: 0, paused: true});
                this.contactHoverTl.fromTo(this.$refs.contactButton, 0.4, {height: "100px"}, {height: "200px", ease: Back.easeOut});
                if (!isMobile.any) {
                    this.contactHoverTl.fromTo(this.$refs.contactButton, 0.2, {width: "20%"}, {width: "25%", ease: Back.easeOut})
                }
                this.contactHoverTl.fromTo(this.$refs.contactButton, 0.2, {boxShadow: "0px 0px 0px rgba(0,0,0,0)"}, {boxShadow: "5px -5px 20px 1px rgba(0,0,0,0.2)", ease: Power1.easeOut});
                this.contactHoverTl.add(TweenMax.fromTo(this.$refs.cLine1, 0.2, {rotation: 0}, {rotation: -45, ease: Back.easeOut}), 0.5);
                this.contactHoverTl.add(TweenMax.fromTo(this.$refs.cLine2, 0.2, {rotation: 0}, {rotation: 45}), 0.5);
            })
        },
        methods: {
            onAboutHover() {
                this.aboutHoverTl.play();
            },
            onAboutOut() {
                this.aboutHoverTl.reverse();
            },
            onContactHover() {
                this.contactHoverTl.play();
            },
            onContactOut() {
                this.contactHoverTl.reverse();
            },
            aboutCurtainAnimate() {
                TweenMax.to(this.$refs.aboutButton, 0, {zIndex: 0});
                this.tlAbout = new TimelineMax({delay: 0, paused: true});
                this.tlAbout.fromTo(this.$refs.aboutCurtain, 0.3, {height: 0}, {height: "100vh", ease: Power3.easeOut});
                if (!isMobile.any) {
                    this.tlAbout.fromTo(this.$refs.aboutCurtain, 0.4, {width: "25%"}, {width: "100%"});
                } else {
                    this.tlAbout.fromTo(this.$refs.aboutCurtain, 0.4, {width: "20%"}, {width: "100%"});
                }
                this.tlAbout.to(this.$refs.aboutCurtain, 0.2, {transformOrigin: "100% 0", ease: Power3.easeIn});
                this.tlAbout.to(this.$refs.aboutCurtain, 0.3, {scaleX: 0});
            },
            contactCurtainAnimate() {
                this.tlContact = new TimelineMax({delay: 0, paused: true});
                this.tlContact.fromTo(this.$refs.contactCurtain, 0.3, {height: 0}, {height: "100vh", ease: Power3.easeOut});
                this.tlContact.to(this.$refs.contactCurtain, 0.4, {left: "0", width: "100%", ease: Power3.easeOut});
                this.tlContact.to(this.$refs.contactCurtain, 0.2, {transformOrigin: "100% 0", ease: Power3.easeIn});
                this.tlContact.to(this.$refs.contactCurtain, 0.4, {scaleX: 0});
            },
            onAboutClicked() {
                this.$emit('isAboutClicked', true);
                this.onStartAbout();
            },
            onStartAbout() {
                if (this.$store.getters.about) {
                    this.tlAbout.timeScale(1).play();
                } else {
                    this.tlAbout.timeScale(0.9).reverse();
                }
            },
            onStartContact() {
                if (this.$store.getters.contact) {
                    this.tlContact.play();
                } else {
                    this.tlContact.reverse();
                }
            },
            onContactClicked() {
                this.$emit('isContactClicked', true);
                this.onStartContact();
            }
        },
        computed: {
            onContactChanged() {
                return this.$store.getters.contact;
            },
            onAboutChanged() {
                return this.$store.getters.about;
            }
        },
        watch: {
            onAboutChanged() {
                this.onStartAbout();
            },
            onContactChanged() {
                this.onStartContact();
            }
        }
    };
</script>

<template>
    <div class="ExtraLinksComponent">
        <div ref="aboutCurtain" class="aboutCurtain" :style="curtainStyle"></div>
        <div ref="contactCurtain" class="contactCurtain" :style="contactCurtainStyle"></div>
        <div ref="aboutButton" @mouseover="onAboutHover" @mouseout="onAboutOut" class="about-btn" @click="onAboutClicked">
            <h2>get to know me</h2>
            <span ref="line1" class="about-line1"></span>
            <span ref="line2" class="about-line2"></span>
        </div>
        <div ref="contactButton" @mouseover="onContactHover" @mouseout="onContactOut" class="contact-btn" @click="onContactClicked">
            <h2>lets talk</h2>
            <span ref="cLine1" class="contact-line1"></span>
            <span ref="cLine2" class="contact-line2"></span>
        </div>
    </div>
</template>
