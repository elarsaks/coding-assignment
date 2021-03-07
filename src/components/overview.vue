<template>
    <div>
        <Node
            v-for="node in nodes"
            :key="node.name"
            :name="node.name"
            :nodes="node.nodes" />
    </div>
</template>

<style scoped lang="scss">
div {
  width: 30vw;
  background: #fff;
  font-size: 10px;
  right: 0;
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
                nodes: [],
            };
        },
        computed: {
            ...mapState('deckOfCards', ['cards']),
            ...mapState(['initialized']),
        },
        created() {
            // Get cards as an Array
            const data = Object.values(this.cards);

            // Insert card id (key in cards obj) to each card
            data.forEach((card, i) => (card.id = String(i + 1)));

            // Get distinct suits
            const suits = [...new Set(data.map(item => item.suit))];

            // Map data to each suit
            this.nodes = suits.map(suit => {
                const nodes = data.filter(card => suit == card.suit);
                const suitName = nodes[0].name.split(' ').slice(-1)[0];

                // Get Named cards
                const named = nodes.filter(
                    child => !Number.isInteger(parseInt(child.rank))
                );

                // Get numbered Cards
                const numbers = nodes.filter(child =>
                    Number.isInteger(parseInt(child.rank))
                );

                // Return a single suit data obj
                return {
                    name: suit + ' ' + suitName,
                    nodes: [
                        { name: suit + ' ' + 'Named', nodes: named },
                        { name: suit + ' ' + 'Numbers', nodes: numbers },
                    ],
                };
            });
        },
        methods: {},
    };
</script>
