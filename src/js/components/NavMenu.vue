<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="hamburger-wrapper " v-on:click.prevent="toggleNav" v-bind:class="{ 'active': active }">
        <div class="hamburger"></div>
    </div>
    <nav class="hamburger-nav" style="opacity: 0">
        <ul class="nav">
            <li class="item">Logout</li>
        </ul>
    </nav>
</template>

<script>
    export default {
        data: function () {
            return {
                active: false
            }
        },
        methods: {
            toggleNav: function () {
//                console.log(this.$el);
                this.active = !(this.active);
                var nav = this.$el.nextElementSibling.nextElementSibling;
//                var nav = document.querySelector('.hamburger-nav');
                var opacity = nav.style.opacity;
                console.log(nav);
                nav.style.opacity = (opacity === '1' ? '0' : '1');
            }
        }
    }
</script>