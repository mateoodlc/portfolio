<style src="styles/components/ShowMoreButtonRipple.styl" lang="stylus" scoped></style>

<script>
    export default {
        name: "ShowMoreButtonRipple",
        data() {
            return {

            };
        },
        props: {
            data: {type: Object, required: true}
        },
        components: {},
        methods: {
            onEnter(el, done){
                TweenMax.staggerFromTo([this.$refs.color, this.$refs.white], 0.1, {scale: 0}, {scale: 1, ease: Power2.easeOut}, 0.15, done);
            },
            onLeave(el, done){
                TweenMax.set([this.$refs.color, this.$refs.white], {scale: 0, onComplete: done});
            }
        },
        computed: {}
    };
</script>

<template>
    <transition @enter="onEnter" @leave="onLeave">
        <div class="ShowMoreButtonRipple">
            <div ref="color" :style="{width: '100%', height:'100%', borderRadius: '100%', backgroundColor: data.backgroundColor, display:'block', position:'absolute', top: 0, left: 0}"></div>
            <div ref="white" :style="{width: '100%', height:'100%', borderRadius: '100%', backgroundColor: 'white', display:'block', position:'absolute', top: 0, left: 0}"></div>
        </div>
    </transition>
</template>
