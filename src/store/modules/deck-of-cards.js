import { Ranks, Suits } from "@/constants"

function getDefaultState() {
    return {
        cards: {},
        suits: [],
        ranks: [],
    }
}

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        resetState: (s) => Object.assign(s, getDefaultState()),
        setCards: (s, cards) => (s.cards = cards),
    },
    actions: {
        initialize({ commit }) {
            const cards = {}
            let id = 1

            Object.entries(Suits).map(([suit, name]) =>
                Ranks.map((rank) => {
                    cards[id] = { rank, suit, name: `${rank} of ${name}` }
                    id += 1
                })
            )

            commit("setCards", cards)
        },
    },
}
