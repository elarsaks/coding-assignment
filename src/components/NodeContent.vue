<template>
    <div class="node-content">
        <ul>
            <li>
                <div v-if="nodes.length > 0">
                    <span class="node-header" @click="openClose">{{ name }}</span>
                    <Node
                        v-for="node in nodes"
                        :key="node.name"
                        :nodes="node.nodes"
                        :name="node.name" />
                </div>
                <div v-else>
                    <span class="item-header" @click="openClose">{{ name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss"></style>

<script>
    import VT from 'vue-types';
    export default {
        name: 'NodeContent',
        components: {},
        props: {
            nodes: VT.array,
            name: VT.string,
        },
        created() {
            // console.log(this.name, this.nodes);
        },
        methods: {
            openClose() {
                console.log('CLicked');
            },
        },
    };
</script>
