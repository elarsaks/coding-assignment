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
            // TODO: Clean all this up
            const data = Object.values(this.cards);

            const suits = [...new Set(data.map(item => item.suit))];

            const children = suits.map(suit => {
                const children = data.filter(card => suit == card.suit);
                const name = children[0].name.split(' ').slice(-1)[0];

                return {
                    name,
                    children,
                };
            });

            this.children = [{ name: 'suits', children }];
        },
        methods: {},
    };
</script>
