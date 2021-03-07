<template>
    <div class="card-detail">
        <h1>{{ card.name }}</h1>
        <Card :card="card" />
    </div>
</template>

<style scoped lang="scss">
@import '../app.scss';

.card-detail {
  background: #fff;
  border-radius: 1rem;
  border: 1px solid $border-color;
  padding: $default-padding;
  margin-right: 2em;
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
        },
    };
</script>
