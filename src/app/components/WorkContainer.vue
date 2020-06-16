<style src="styles/components/WorkContainer.styl" lang="stylus" scoped></style>

<script>
    import WorkModuleComponent from "app/components/WorkModuleComponent.vue"
    import {
        TweenMax
    } from "gsap";
    export default {
        name: "WorkContainer",
        data() {
            return {
                workModule: undefined,
                totalWidth: undefined,
                totalHeight: undefined,
                seeMoreDisplay: undefined,
                workDisplayed: false,
                tl: undefined,
                styleObject: {
                    width: 0,
                    height: 0,
                    minWidth: "300px",
                    minHeight: "300px",
                    boxShadow: "0 5px 10px 0px rgba(0,0,0,0.3)",
                    color: "#000",
                },
                seeMoreStyle: {
                    display: "block",
                    top: 0,
                    left: 0,
                    width: 50,
                    height: 50,
                    backgroundColor: "#fff"
                },
            };
        },
        props: {
            title: {
                default: "holi"
            },
            description: {
                default: ""
            },
            imageSrc: {
                default: "~assets/img/lacusmockup.png"
            },
            color: {
                default: "#000"
            },
            backgroundColor: {
                default: undefined
            },
            index: {
                type: Number,
                required: true
            },
            logoSrc: {
                default: undefined
            },
            flex: {
                type: Number,
                required: true
            },
            headingColor: {
                default: "#fff"
            }
        },
        components: {
            WorkModuleComponent
        },
        methods: {
            onHover(event) {
                this.tl.timeScale(1);
                this.$emit('workChanged', this.index);
                if (!this.workDisplayed) {
                    this.tl.play();
                    TweenMax.to(this.$el, 0.3, {
                        flex: 1.3,
                        ease: Power4.easeOut
                    });
                }
            },
            onMouseOut() {
                TweenMax.to(this.$el, 0.3, {
                    flex: 1,
                    ease: Power4.easeOut
                });
                this.tl.timeScale(2);
                if (this.workDisplayed === false) {
                    this.tl.reverse();
                }
                this.isMouseOver = false;
                this.isAnimated = false;
            },
            onMouseEnter() {
                this.isMouseOver = true;
            },
            onMouseMove(event) {
                this.mousePos = {
                    x: event.clientX,
                    y: event.clientY,
                }
            },
            onResize() {
                const totalWidth = window.innerWidth;
                this.styleObject.width = (totalWidth * 0.25) + "px";
                this.totalHeight = window.innerHeight;
                this.styleObject.height = (totalWidth * 0.25) + "px";
            },
            onAnimate() {
                this.tl = new TimelineMax({
                    delay: 0,
                    paused: true,
                    onComplete: this.onAnimComplete
                });
                this.tl.add(TweenMax.to(this.$refs.hoverColor, 1.5, {
                    scale: "15vw",
                    ease: Power2.easeOut
                }, 0));
                this.tl.add(TweenMax.to(this.$refs.hoverElem, 0.2, {
                    boxShadow: "0 0 5px 5px transparent",
                    ease: Sine.easeOut
                }), 0);
                this.tl.add(TweenMax.fromTo(this.$refs.title, 0.8, {
                    y: 300
                }, {
                    y: 210,
                    ease: Power2.easeOut
                }), 0.5);
                this.tl.add(TweenMax.fromTo(this.$refs.title, 0.8, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeOut
                }), 0.6);
            },
            onAnimComplete() {
                this.$emit('animEnter', true);
            },
            onWorkDisplayed() {
                this.workDisplayed = !this.workDisplayed;
            },
            onWorkClicked() {
                this.onWorkDisplayed();
                this.$emit('workClicked', true, this.index);
            },
        },
        computed: {},
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
                this.onResize();
                this.onAnimate();
            });
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        }
    };
</script>

<template>
    <div class="WorkContainer" @mouseenter="onHover" @mouseleave="onMouseOut" @click="onWorkClicked">
        <div class="work-container--middle-line"></div>
        <div class="work-module" v-bind:style="[styleObject, {backgroundColor:backgroundColor}]" ref="hoverElem">
            <img class="mockup" :src="imageSrc">
            <div ref="title" class="project-title">
                <h2 :style="{color: headingColor}">{{title}}</h2>
                <p :style="{color: headingColor}">{{description}}</p>
            </div>
            <svg class="project-logo">
                                    <use :xlink:href="logoSrc"/>
                                </svg>
        </div>
        <div class="work-container--hover" ref="hoverColor" :style="{backgroundColor:color}">
            <video src="https://youtu.be/NWETcnweEUc"></video>
        </div>
    </div>
</template>
