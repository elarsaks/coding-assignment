<template>
    <div>
        <Node :children="children" />
    </div>
</template>

<style scoped lang="scss">
div {
  background: #eee;
  width: 300px;
  font-size: 10px;
}
</style>

<script>
    import { mapState } from 'vuex';
    import Node from './Node';
    export default {
        name: 'Overview',
        components: {
            Node,
        },
        data() {
            return {
                children: [],
            };
        },
        computed: {
            ...mapState('deckOfCards', ['cards']),
            ...mapState(['initialized']),
        },
        created() {
            const data = Object.values(this.cards);
            // Get distinct suits
            const suits = [...new Set(data.map(item => item.suit))];

            // Map data to each suit
            const children = suits.map(suit => {
                const children = data.filter(card => suit == card.suit);
                const suitName = children[0].name.split(' ').slice(-1)[0];

                // Get Named cards
                const named = children.filter(
                    child => !Number.isInteger(parseInt(child.rank))
                );

                // Get numbered Cards
                const numbers = children.filter(child =>
                    Number.isInteger(parseInt(child.rank))
                );

                // Return a single suit data obj
                return {
                    name: suitName,
                    children: [
                        { name: 'named', children: named },
                        { name: 'numbers', children: numbers },
                    ],
                };
            });

            // Set mapped suits data array as a children of suits obj
            this.children = [{ name: 'suits', children }];
        },
        methods: {},
    };
</script>
