<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="search-bar">
        <label>
            Search
            <input v-on:keyup="onKeyUp | debounce 500" v-model="term" type="text" name="search"/>
        </label>
    </div>
</template>

<script>
    export default {
        props: [
            'onTermChange'
        ],
        data: function () {
            return {
                term: ''
            };
        },
        methods: {
            onKeyUp: function () {
                if (this.term !== '') {
                    this.onTermChange(this.term);
                }
            }
        }
    }
</script>