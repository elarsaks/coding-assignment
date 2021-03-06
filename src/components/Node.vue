<template>
    <div class="node">
        <ul>
            <li>
                <div v-if="nodes.length > 0">
                    <span class="node-header" @click="openClose">{{ name }}</span>
                    <div v-if="open" class="node-content">
                        <Node
                            v-for="node in nodes"
                            :key="node.name"
                            :nodes="node.nodes"
                            :name="node.name" />
                    </div>
                </div>
                <div v-else>
                    <span class="item-header" @click="openClose">{{ name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import VT from 'vue-types';
    export default {
        name: 'Node',
        components: {},
        props: {
            nodes: VT.array,
            name: VT.string,
        },
        data() {
            return {
                open: false,
            };
        },
        created() {
            // console.log(this.name, this.nodes);
        },
        methods: {
            openClose() {
                this.open = !this.open;
                console.log('clicked', this.open);
            },
        },
    };
</script>

<style scoped lang="scss">
.node {
  min-width: 500px;
  list-style-type: none;
  color: rgb(41, 41, 41);
  letter-spacing: 0.2rem;
  font-size: 1.2rem;
}

.node ul {
  list-style-type: none;
}

.node-header {
  font-weight: bold;
  cursor: pointer;
}

.item-header {
  font-weight: 400;
  cursor: pointer;
}
</style>
