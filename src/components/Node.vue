<template>
    <ul class="node">
        <li v-for="child in children" :key="child.name">
            {{ child.name }}
            <NodeContent v-if="child.children" :children="child.children" />
        </li>
    </ul>
</template>

<style scoped lang="scss"></style>

<script>
    import NodeContent from './NodeContent.vue';
    import VT from 'vue-types';
    export default {
        name: 'Node',
        components: {
            NodeContent,
        },
        props: {
            children: VT.array.isRequired,
        },
    };
</script>
