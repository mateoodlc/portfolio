<style src="styles/components/ProjectContentComponent.styl" lang="stylus" scoped></style>

<script>
    //import VueRouter from 'vue-router'
    import VideoPlayer from "foo/components/VideoPlayer.vue";
    import Content from "app/components/base/content.json";

    export default {
        name: "ProjectContentComponent",
        data(){
            return {
                styleObject: {
                    position: "absolute",
                    left: "0%",
                    width: "5%",
                    height: "60%",
                    zIndex: 100,
                    top: "20%",
                    color: "#fff"
                }
            };
        },
        props: {
            title: "",
            description: "",
            images: [],
            videoSrc: "",
            toolsTitle: "",
            toolsImgSrc: [],
            designImageSrc: "",
            colorScheme: "",
            link: "",
            credits: "",
            roll: "",
            wireframesSrc: "",
        },
        components: {VideoPlayer},
        methods: {
            onMouseEnter() {
                this.$emit("mouseEnter", true);
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.colorScheme.contains("fff")) {
                    this.styleObject.color = "#000";
                }
            });
        },
        computed: {
            data(){
                return Content[this.$route.params.id];
            }
        }
    };
</script>

<template>
    <div class="ProjectContentComponent" @mouseover="onMouseEnter">
        <div class="container">
            <div class="project-description--container">
                <div class="outside" :style="[styleObject, {backgroundColor: data.colorScheme}]">
                    <span>PROJECT</span>
                </div>
                <div class="project-description">
                    <div class="project--general-description">
                        <h2>{{data.title}}</h2>
                        <p>{{data.description}}</p>
                    </div>
                    <div class="project--detailed-description">
                        <div class="project--detailed-description-item">
                            <h2>Credits</h2>
                            <p>{{data.credits}}</p>
                        </div>
                        <div class="project--detailed-description-item">
                            <h2>My roll</h2>
                            <p>{{data.roll}}</p>
                        </div>
                        <div class="project--detailed-description-item">
                            <h2>Link</h2>
                            <p>{{data.link}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="data.wireframesSrc" class="project-research" :style="{backgroundImage: 'url(' + data.wireframesSrc + ')'}">
                <img v-for="(image, index) of images" :key="`${data.id}-${index}`" :src="image"/>
                <!-- <img :src="data.designImageSrc"/> -->
                <div class="outside" :style="[styleObject, {backgroundColor: data.colorScheme}]">
                    <span>PROTOTYPING</span>
                </div>
            </div>
            <div class="project-design" :style="{backgroundImage: 'url(' + data.designImageSrc + ')'}">
                <img v-for="(image, index) of images" :key="`${data.id}-${index}`" :src="image"/>
                <!-- <img :src="data.designImageSrc"/> -->
                <div class="outside" :style="[styleObject, {backgroundColor: data.colorScheme}]">
                    <span>BEAUTIFY</span>
                </div>
            </div>
            <div class="project-details">
                <div class="project-details-video">
                    <!-- <video-player :src="{videoSrc}"></video-player> -->
                    <div class="outside" :style="[styleObject, {backgroundColor: data.colorScheme}]">
                        <span>DETAILS</span>
                    </div>
                </div>
                <div class="project-details-tools">
                    <img src="{toolsImgSrc[0]}">
                </div>
            </div>
            <div style="width: 50px; height: 50px; background-color: #000; position: absolute; bottom: 50px; right: 50px;"></div>
        </div>
    </div>
</template>
