import Vue from "vue";

export default Vue.component("ContactTransition", {
    functional: true,
    render: function (h, ctx) {
        let vm = ctx.parent;
        let data = {
            props: {
                name: "ContactTransition",
                css: false,
                appear: false,
                //mode:"out-in"
            },
            on: {
                beforeEnter: function (el) {

                },
                enter: function (el, done) {
                    TweenMax.fromTo(el, 0.5, {alpha: 0}, {alpha: 1, onComplete: done});
                },
                afterEnter: function (el) {

                },
                enterCancelled: function (el) {

                },
                beforeLeave: function (el) {

                },
                leave: function (el, done) {
                    TweenMax.to(el, 0.5, {alpha: 0, onComplete: done});
                },
                afterLeave: function (el) {

                },
                leaveCancelled: function (el) {

                }
            }
        };
        return h("transition", data, ctx.children);
    }
});
