export default {
    methods: {
        cardColor(name) {
            const nameEnd = name.split(" ").slice(-1)
            const clubs = name[0] == "♣️" || nameEnd == "Clubs"
            const diamonds = name[0] == "♦" || nameEnd == "Diamonds"
            const hearts = name[0] == "♥" || nameEnd == "Hearts"
            const spades = name[0] == "♠️" || nameEnd == "Spades"

            return diamonds || hearts
                ? "red"
                : clubs || spades
                ? "black"
                : "gray"
        },
    },
}
