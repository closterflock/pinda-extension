<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="search-bar">
        <h2 id="search-header">Search</h2>
        <input v-on:keyup="onKeyUp | debounce 750" v-model="term" type="text" name="search"/>
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
            },
            setSearch: function (value, searchOnValue) {
                searchOnValue = searchOnValue || false;
                this.term = value;

                if (searchOnValue) {
                    this.onKeyUp();
                }
            }
        }
    }
</script>