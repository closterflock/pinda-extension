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
        <button type="submit">Submit</button>
    </form>
</template>

<script>
    export default {
        data: function () {
            return {
                title: undefined,
                description: undefined,
                url: undefined
            }
        },
        props: [
            'onSubmit'
        ],
        methods: {
            submitForm: function () {
                this.$http.post(
                'http://pinda.app/api/v1/links/new',
                {
                    title: this.name,
                    description: this.description,
                    url: this.url
                }).then(function (response) {
                    console.log(response.data);
                });
            }
        }
    }
</script>