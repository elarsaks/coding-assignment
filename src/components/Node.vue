<template>
    <div class="node" :class="{ active: isRed, 'text-danger': hasError }">
        <ul>
            <li>
                <div v-if="nodes.length > 0">
                    <span class="node-header" @click="openClose">{{ name }}</span>
                    <transition name="slide">
                        <div v-if="open" :class="nodeContent">
                            <Node
                                v-for="node in nodes"
                                :key="node.name"
                                :nodes="node.nodes"
                                :name="node.name" />
                        </div>
                    </transition>
                </div>
                <div v-else>
                    <span class="item-header" @click="openClose">{{ name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.node {
  min-width: 500px;
  list-style-type: none;
  letter-spacing: 0.2rem;
  font-size: 1.2rem;
  color: rgb(149, 149, 149);

  & :hover {
    color: black;
    //color: red;
  }
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

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>

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
        computed: {
            nodeContent() {
                let openClass = 'close';

                switch (this.open) {
                case false:
                    openClass = 'close';
                    break;
                case true:
                    openClass = 'open';
                    break;
                }

                return { [openClass]: true };
            },
        },
        methods: {
            openClose() {
                this.open = !this.open;
                console.log('clicked', this.open);
            },
        },
    };
</script>
