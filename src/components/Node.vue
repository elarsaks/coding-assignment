<template>
    <div class="node" :class="isRed">
        <ul>
            <li>
                <div v-if="nodes.length > 0">
                    <div class="node-header" @click="openClose">{{ name }}</div>
                    <transition name="slide">
                        <div v-if="open" :class="nodeContent">
                            <Node
                                v-for="node in nodes"
                                :id="node.id"
                                :key="node.name"
                                :nodes="node.nodes"
                                :name="node.name" />
                        </div>
                    </transition>
                </div>
                <div v-else>
                    <div class="item-header" @click="selectCard">{{ name }}</div>
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
  transition: all 0.3s;
}

.black :hover {
  color: #000;
  transition: all 0.3s;
}

.red :hover {
  color: #ff0000;
  transition: all 0.3s;
}

.node ul {
  list-style-type: none;
}

.node-header {
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.01);
  }
}

.item-header {
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.03);
  }
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
            id: VT.number,
        },
        data() {
            return {
                open: false,
            };
        },
        computed: {
            isRed() {
                return this.name[0] == '♦' || this.name[0] == '♥' ? 'red' : 'black';
            },
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
            },
            selectCard() {
                this.$router.push({ params: { cardId: this.id } });
            },
        },
    };
</script>
