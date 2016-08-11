<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <form class="new-link-form" v-on:submit.prevent="submitForm">
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
        <tag-list v-ref:tag-list :tags="tags"></tag-list>
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
                url: undefined,
                activeTags: []
            }
        },
        props: [
            'onSubmit',
            'tags'
        ],
        methods: {
            submitForm: function () {
                this.activeTags = this.$refs.tagList.getActiveTags();
                this.onSubmit(this);
            }
        }
    }
</script>