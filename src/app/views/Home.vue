<script>
    import MainTransition from "app/transitions/GSAP";
    import VideoPlayer from "foo/components/VideoPlayer.vue";
    import WorkContainer from "app/components/WorkContainer.vue";
    import ShowMoreButtonRipple from "app/components/ShowMoreButtonRipple.vue"
    import ProjectContentComponent from "app/components/ProjectContentComponent.vue"
    import ExtraLinksComponent from "app/components/ExtraLinksComponent.vue"
    import AboutComponent from "app/components/AboutComponent.vue"

    export default {
        name: "Home",
        data() {
            return {
                works: [
                    {
                        id: 0,
                        url: "/stdrama",
                        color: "#0A7A06",
                        backgroundColor: "#0A7A06",
                        imageSrc: "/static/img/heinekenmockup.png",
                        title: "Site for champions league campaign",
                        logoSrc: "#icon-heinekenLogo",
                        flex: 1,
                    },
                    {
                        id: 1,
                        url: "/lacus",
                        color: "#0288d1",
                        backgroundColor: "#0288d1",
                        title: "App for the community",
                        imageSrc: "/static/img/lacusmockup.png",
                        logoSrc: "#icon-lacuslogo",
                        flex: 1,
                    },
                    {
                        id: 2,
                        url: "/kala",
                        color: "#fff",
                        backgroundColor: "#fff",
                        imageSrc: "/static/img/kalamockup.png",
                        title: "Site for Kala agency",
                        logoSrc: "#icon-kalalogo",
                        flex: 1,
                        headingColor: "#000",
                    },
                ],
                animatePlus: undefined,
                isMouseOver: false,
                isMouseOut: false,
                seeMoreWidth: 50,
                seeMoreHeight: 50,
                watchWork: undefined,
                displayProject: false,
                yOffset: undefined,
                clientMouse: {
                    x: 0,
                    y: 0,
                },
                mousePos: {
                    x: 0,
                    y: 0,
                },
                isAnimated: false,
                isWorkChanged: false,
                seeMoreStyle: {
                    position: 'absolute',
                    display: 'flex',
                    backgroundColor: '#fff',
                    zIndex: 11100,
                    pointerEvents: 'none',
                    boxShadow: "0 2px 10px 0px rgba(0,0,0,0.4)",
                    borderRadius: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                currentIndex: null,
            };
        },
        props: {},
        components: {MainTransition, VideoPlayer, WorkContainer, ShowMoreButtonRipple, ProjectContentComponent, ExtraLinksComponent, AboutComponent},
        mounted() {
            this.$nextTick(() => {
                window.App.render.add(this.onAnimate);
                this.$router.push("/");
            })
        },
        methods: {
            beforeEnter(el) {
                TweenMax.set(el, {alpha: 0, height: 0});
            },
            enter(el, done) {
                let delay = el.dataset.index * 0.015;
                TweenMax.to(el, 0.65, {
                    alpha: 1,
                    height: 24,
                    delay: delay,
                    ease: Power4.easeOut,
                    onComplete: done,
                });
            },
            leave(el, done) {
                let delay = el.dataset.index * 0.015;
                TweenMax.to(el, 0.65, {
                    alpha: 0,
                    height: 0,
                    ease: Power4.easeOut,
                    delay: delay,
                    onComplete: done,
                });
            },
            onAnimEnter(value){
                this.isAnimated = value;
            },
            onChangeWork(index) {
                this.currentIndex = index;
                this.onChangePlus(index);
            },
            onChangePlus() {
                TweenMax.fromTo(this.$refs.plus, 0.5, {rotation: 0}, {rotation: 360});
            },
            onWorkDisplayed(index) {
                TweenMax.to(this.$refs.project[index].$el, 0.5, {flex: 3, ease: Power2.easeOut});
                if (index === 0) {
                    TweenMax.to(this.$refs.project[2].$el, 0.2, {opacity: 0, ease: Power2.easeOut});
                    TweenMax.to(this.$refs.project[2].$el, 0.5, {scale: 0, ease: Power2.easeOut});
                    TweenMax.to(this.$refs.project[2].$el, 0.5, {flex: 0, ease: Power2.easeOut});
                }
                if (index < 2) {
                    TweenMax.to(this.$refs.project[index + 1].$el, 0.2, {opacity: 0, ease: Power2.easeOut});
                    TweenMax.to(this.$refs.project[index + 1].$el, 0.5, {flex: 0, ease: Power2.easeOut});
                    TweenMax.to(this.$refs.project[index + 1].$el, 0.5, {scale: 0, ease: Power2.easeOut});
                } else {
                    TweenMax.to(this.$refs.project[0].$el, 0.5, {flex: 0, ease: Power2.easeOut});
                    TweenMax.to(this.$refs.project[0].$el, 0.5, {scale: 0, ease: Power2.easeOut});
                    TweenMax.to(this.$refs.project[0].$el, 0.1, {opacity: 0, ease: Power2.easeOut});
                }
                TweenMax.to(this.$refs.project[index - 1].$el, 0.1, {opacity: 0, ease: Power2.easeOut});
                TweenMax.to(this.$refs.project[index - 1].$el, 0.5, {flex: 0, ease: Power2.easeOut});
                TweenMax.to(this.$refs.project[index - 1].$el, 0.5, {scale: 0, ease: Power2.easeOut});
            },
            onWorkHiden(index) {
                for (let i = 0; i < this.$refs.project.length; i++) {
                    TweenMax.to(this.$refs.project[i].$el, 0.5, {flex: 1, ease: Power1.easeOut});
                    TweenMax.to(this.$refs.project[i].$el, 0.5, {scale: 1, ease: Power2.easeOut});
                    TweenMax.to(this.$refs.project[i].$el, 0.1, {opacity: 1, ease: Power2.easeOut});
                }
            },
            onHidePlus(el, done) {
                console.log("eliminar plus");
                TweenMax.to(el, 0.5, {scale: 0, ease: Back.easeIn, onComplete: done});
            },
            onMouseEnter() {
                this.isMouseOver = true;
                this.isAnimated = true;
            },
            onMouseLeave() {
                this.isMouseOver = false;
                this.isAnimated = false;
            },
            onMouseMove(event) {
                this.clientMouse = {
                    x: event.clientX,
                    y: event.clientY,
                }
            },
            onAnimate() {
                let x = this.clientMouse.x;
                let y = this.clientMouse.y;
                let yOffset = window.pageYOffset;
                const toX = x;
                const toY = y + yOffset;
                const easedX = this.mousePos.x + (toX - this.mousePos.x) * 0.8;
                const easedY = (this.mousePos.y + (toY - this.mousePos.y) * 0.4);
                this.mousePos = {
                    x: easedX,
                    y: easedY,
                };
                if (this.$refs.plus !== null) {
                    TweenMax.set(this.$refs.plus, {x: easedX - 10, y: easedY - 10, force3D: true});
                };
            },

            onShowPlus(el, done) {
                TweenMax.fromTo(el, 0.1, {scale: 0}, {scale: 1, ease: Back.easeOut, onComplete: done}, 0);
            },
            onWorkClicked(value, index) {
                this.displayProject = !this.displayProject;
                this.onChangePlus();
                if (this.displayProject) {
                    console.log(this.displayProject);
                    console.log(this.works[index].url);
                    this.$router.push(this.works[index].url);
                    this.onWorkDisplayed(index);
                    this.onAnimEnter(index);
                } else {
                    this.onWorkHiden(index);
                    this.$router.push("/");
                }
            },
        },
        computed: {
            showPlus() {
                return this.isMouseOver && this.isAnimated;
            },
        },
        watch: {
            currentIndex(value, oldValue) {
                //TweenMax.set(this.$refs.plus, {backgroundColor: this.works[value].backgroundColor});
            }
        },
        beforeDestroy(){
            //window.App.render.remove(this.onAnimate);
        }
    };
</script>

<template>
    <main-transition>
        <div class="Home" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
            <transition @enter="onShowPlus" @leave="onHidePlus" :css="false">
                <div ref="plus" v-show="showPlus" :style="[seeMoreStyle, {width: '50px', height: '50px'}]">
                    <div>
                        <show-more-button-ripple v-show='currentIndex === index' v-for="(work, index) of works" :key="` work-plus-${work.id}`" :data="work"></show-more-button-ripple>
                    </div>
                    <span v-show="!displayProject" class="see-more--vertical-line"></span>
                    <span class="see-more--horizontal-line"></span>
                </div>
            </transition>
            <div class="works--container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
                <work-container :style="{flex: work.flex}" ref="project" v-for="(work, index) of works" :url="work.url" :key="`work-${work.id}`" :heading-color="work.headingColor" :index="index" :title="work.title" :flex="work.flex" :imageSrc="work.imageSrc" :color="work.color" :logoSrc="work.logoSrc" :backgroundColor="work.backgroundColor" @workChanged="onChangeWork" @animEnter="onAnimEnter" @workClicked="onWorkClicked"></work-container>
            </div>
            <transition>
                <project-content-component v-show="displayProject" @mouseEnter="onAnimEnter"></project-content-component>
            </transition>
        </div>
    </main-transition>
</template>

<style src="styles/views/Home.styl" lang="stylus"></style>
