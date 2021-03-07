<template>
    <div class="card-detail">
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

  .buttons {
    display: flex;
    justify-content: space-evenly;

    button {
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
      padding: 0.5em;

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
    }
  }
}
</style>

<script>
    import { mapState } from 'vuex';
    import Card from '../views/Card';

    export default {
        name: 'Detail',
        components: {
            Card,
        },
        props: {
            cardId: { validator: v => v === null || typeof v === 'string' },
        },
        computed: {
            ...mapState('deckOfCards', ['cards']),
            card() {
                return this.cards[this.cardId] ?
                    this.cards[this.cardId] :
                    { id: 0, name: 'Not selected', rank: '0', suit: '?' };
            },
            color() {
                return this.card.suit === '?' ?
                    'gray' :
                    this.card.suit === '♦' || this.card.suit === '♥' ?
                        'red' :
                        'black';
            },
            route() {
                return isNaN(this.$route.params.cardId) ?
                    0 :
                    parseInt(this.$route.params.cardId);
            },
        },
        methods: {
            prev() {
                const newRoute = this.route - 1;

                if (newRoute >= 0) {
                    this.$router.push({ params: { cardId: newRoute.toString() } });
                }
            },

            next() {
                const newRoute = this.route + 1;

                if (newRoute <= 52) {
                    this.$router.push({ params: { cardId: newRoute.toString() } });
                }
            },
        },
    };
</script>
