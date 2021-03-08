<template>
    <div class="card-detail">
        <transition name="slide">
            <Card :card="card" />
        </transition>

        <div class="buttons" :class="cardColor(card.name)">
            <button :class="cardColor(card.name)" @click="next(-1)">
                <i class="arrow left" />
            </button>

            <h2>{{ card.name }}</h2>

            <button :class="cardColor(card.name)" @click="next(1)">
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
    import Card from '../views/Card';
    import ColorMixin from './helpers/ColorMixin.js';
    import { mapState } from 'vuex';

    export default {
        name: 'Detail',
        components: { Card },
        mixins: [ColorMixin],
        props: {
            cardId: { validator: v => v === null || typeof v === 'string' },
        },
        computed: {
            ...mapState('deckOfCards', ['cards']),

            // Return empty card if on the first page load
            card() {
                return this.cards[this.cardId] ?
                    this.cards[this.cardId] :
                    { id: 0, name: 'Not selected', rank: '0', suit: '?' };
            },

            // Return route for the next card function
            route() {
                return !isNaN(this.$route.params.cardId) ?
                    parseInt(this.$route.params.cardId) :
                    0;
            },
        },
        methods: {
            next(upDown) {
                const newRoute = this.route + upDown;

                if (newRoute >= 0 && newRoute <= 52) {
                    this.$router.push({ params: { cardId: newRoute.toString() } });
                }
            },
        },
    };
</script>
