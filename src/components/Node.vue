<template>
    <div class="node" :class="cardColor(name)">
        <ul>
            <li>
                <div v-if="nodes.length > 0">
                    <div
                        class="node-header"
                        :class="{
                            [`active-${cardColor(name)}`]: cardSelected == true,
                        }"
                        @click="openClose">
                        {{ name }}
                    </div>

                    <transition name="slide">
                        <div v-if="open || cardSelected">
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
                    <div
                        class="item-header"
                        :class="{
                            [`active-${cardColor(name)}`]: cardSelected == true,
                        }"
                        @click="selectCard">
                        {{ name }}
                    </div>
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

.active-black {
  color: #000;
}

.active-red {
  color: #ff0000;
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
            id: VT.string,
        },
        data() {
            return {
                open: false,
            };
        },
        computed: {
            cardSelected() {
                return this.findByIdRecursive({ id: this.id, nodes: this.nodes });
            },
        },
        methods: {
            cardColor(name) {
                const nameEnd = name.split(' ').slice(-1);
                const diamonds = name[0] == '♦' || nameEnd == 'Diamonds';
                const hearts = name[0] == '♥' || nameEnd == 'Hearts';

                return diamonds || hearts ? 'red' : 'black';
            },
            findByIdRecursive(node) {
                if (node.id) {
                    return node.id == this.$route.params.cardId;
                } else if (node.nodes) {
                    const found = node.nodes.find(n => this.findByIdRecursive(n));

                    return found ? true : false;
                }
            },
            openClose() {
                this.open = !this.open;

                // Check if this nodes child card is open
                const nodeCardOpen = this.findByIdRecursive({
                    id: this.id,
                    nodes: this.nodes,
                });

                // Set routing to 0 when Cards parent node is closed
                if (nodeCardOpen) {
                    this.$router.push({ params: { cardId: '0' } });
                }
            },
            selectCard() {
                if (this.$route.params.cardId != this.id) {
                    this.$router.push({ params: { cardId: this.id } });
                }
            },
        },
    };
</script>
