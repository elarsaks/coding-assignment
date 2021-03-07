<template>
    <div class="card-detail" :class="color">
        <transition name="slide">
            <Card :card="card" />
        </transition>

        <div class="buttons" :class="color">
            <button :class="color" @click="prev">
                <i class="arrow left" />
            </button>
            <h2>{{ card.name }}</h2>
            <button :class="color" @click="next">
                <i class="arrow right" />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../app.scss';

.card-detail {
  text-align: center;
  background: #fff;
  border-radius: 1rem;
  border: 1px solid $border-color;
  padding: $default-padding;
  margin-right: 2em;
}

.red {
  color: #ff0000;
  border: #ff0000;
}

.black {
  color: #000;
}

.arrow {
  border: solid;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 0.25em;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}

.buttons button {
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
}
</style>

<script>
    import VT from 'vue-types';
    import { mapState } from 'vuex';
    import Card from './Card';

    export default {
        name: 'Detail',
        components: {
            Card,
        },
        props: {
            cardId: VT.string.isRequired,
        },
        computed: {
            ...mapState('deckOfCards', ['cards']),
            card() {
                return this.cards[this.cardId];
            },
            color() {
                return this.card.suit === '♦' || this.card.suit === '♥' ? 'red' : 'black';
            },
        },
        methods: {
            prev() {
                const oldRoute = parseInt(this.$route.params.cardId);
                const newRoute = oldRoute - 1;

                if (newRoute != 0) {
                    this.$router.push({ params: { cardId: newRoute.toString() } });
                }
            },

            next() {
                const oldRoute = parseInt(this.$route.params.cardId);
                const newRoute = oldRoute + 1;

                if (newRoute != 53) {
                    this.$router.push({ params: { cardId: newRoute.toString() } });
                }
            },
        },
    };
</script>
