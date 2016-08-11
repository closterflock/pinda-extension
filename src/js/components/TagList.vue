<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <ul class="tag-list">
        <li class="tag" v-for="tag in tags" v-on:click="toggleClickedTag(this.tags[$index])">
            {{tag.name}}
        </li>
    </ul>
</template>

<script>
    export default {
        data: function () {
            return {
                activeTags: []
            };
        },
        props: [
            'tags'
        ],
        methods: {
            toggleClickedTag: function (tag) {
                var id = tag.id;
                var index = this.activeTags.indexOf(id);
                if (index < 0) {
                    this.activeTags.push(id);
                } else {
                    this.activeTags.splice(index, 1);
                }
            },
            getActiveTags: function () {
                return this.activeTags;
            }
        }
    }
</script>