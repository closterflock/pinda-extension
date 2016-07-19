<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="hamburger-wrapper " v-on:click.prevent="toggleNav" v-bind:class="{ 'active': active }">
        <div class="hamburger"></div>
    </div>
    <nav class="hamburger-nav" v-opaque="active">
        <ul class="nav">
            <li class="item" v-on:click.prevent="logout">Logout</li>
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
        props: ['onLogout'],
        methods: {
            toggleNav: function () {
                this.active = !(this.active);
            },
            logout: function () {
                this.active = false;
                this.onLogout();
            }
        }
    }
</script>