<template>
    <ul class="contents">
        <li v-for="child in children" :key="child.name">
            {{ child.name }}
            <Node v-if="child.children" :children="child.children" />
        </li>
    </ul>
</template>

<style scoped lang="scss"></style>

<script>
    import Node from './NodeContent.vue';
    export default {
        name: 'Node',
        components: {
            Node,
        },
        props: {
            children: {
                type: [Object, Array],
            },
        },
    };
</script>
