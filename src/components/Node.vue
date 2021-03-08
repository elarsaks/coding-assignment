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
@import '../app.scss';
.node {
  min-width: 500px;
  list-style-type: none;
  letter-spacing: 0.2rem;
  font-size: 1.2rem;
  color: $gray;
  transition: all 0.3s;

  ul {
    list-style-type: none;
  }

  @mixin headerMixin {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.01);
    }
  }

  .node-header {
    font-weight: bold;
    @include headerMixin;
  }

  .item-header {
    font-weight: 400;
    @include headerMixin;
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

  .slide-enter-active {
    transition-duration: 0.3s;
    transition-timing-function: ease-in;
  }

  .slide-leave-active {
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
}

// TODO: these colors in SASS
.black :hover {
  color: $black;
  transition: all 0.3s;
}

.red :hover {
  color: $red;
  transition: all 0.3s;
}

.active-black {
  color: $black;
}

.active-red {
  color: $red;
}
</style>

<script>
    import ColorMixin from './helpers/ColorMixin.js';
    import VT from 'vue-types';
    export default {
        name: 'Node',
        components: {},
        mixins: [ColorMixin],
        // TODO: should the props be validated or this enough?
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
