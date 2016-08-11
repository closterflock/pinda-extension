<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <ul class="tag-list">
        <li v-for="tag in tags">
            {{tag.name}}
        </li>
    </ul>
</template>

<script>
    export default {
        props: [
            'tags'
        ]
    }
</script>