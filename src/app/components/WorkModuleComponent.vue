<style src="styles/components/WorkModuleComponent.styl" lang="stylus" scoped></style>

<script>
    export default {
        name: "WorkModuleComponent",
        data(){
            return {
                test: true
            };
        },
        props: {
            title: {default: "título"},
            imageUrl: {default: undefined}
        },
        components: {
        },
        methods: {
        },
        computed: {},
    };
</script>

<template>
    <div class="WorkModuleComponent">
        <p>{title}</p>
        <img :src="imageUrl" alt="">
    </div>
</template>
