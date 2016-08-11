<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <form class="auth-form" v-on:submit.prevent="submitForm">
        <h2>
            New Link
        </h2>
        <label>
            Title
            <input type="text" name="title" v-model="title" lazy/>
        </label>
        <label>
            Description
            <input type="text" name="description" v-model="description" lazy/>
        </label>
        <label>
            URL
            <input type="text" name="url" v-model="url" lazy/>
        </label>
        <tag-list :tags="tags"></tag-list>
        <button type="submit">Submit</button>
    </form>
</template>

<script>
    var TagList = require('./TagList.vue');

    export default {
        components: {
            'tag-list': TagList
        },
        data: function () {
            return {
                title: undefined,
                description: undefined,
                url: undefined
            }
        },
        props: [
            'onSubmit',
            'tags'
        ],
        methods: {
            submitForm: function () {
                console.log(this.tags);
                this.onSubmit(this);
            }
        }
    }
</script>