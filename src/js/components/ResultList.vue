<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="result-list" v-show="links.length > 0">
        <h2>
            {{links.length}} Result{{links.length == 1 ? '' : 's'}}
        </h2>
        <ul class="results">
            <li class="result" v-for="link in links">
                <h3 class="title">
                    <a v-bind:href="link.url" target="_blank">
                        {{link.title}}
                    </a>
                </h3>
                <p v-if="link.description && link.description !== ''" class="description">
                    {{link.description}}
                </p>
                <ul class="tag-list">
                    <li class="tag" v-for="tag in link.tags" v-on:click.prevent="clickTag(tag)">
                        {{tag.name}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            onClickedTag: {
                type: Function
            },
            links: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        methods: {
            showResults: function (links) {
                this.links = links;
            },
            clickTag: function (tag) {
                this.onClickedTag(tag.name);
            }
        }
    }
</script>