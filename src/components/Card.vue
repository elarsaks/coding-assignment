<template>
    <div
        class="card"
        :class="card.suit === '♦' || card.suit === '♥' ? 'red' : 'black'">
        <span class="card_suit card_suit_top">{{ card.suit }}</span>
        <span class="card_rank">{{ card.rank }} </span>
        <span class="card_suit card_suit_bottom">{{ card.suit }}</span>
    </div>
</template>

<style scoped lang="scss">
div {
  background: #eee;
}

@keyframes float {
  0% {
    transform: skewY(0deg);
  }
  50% {
    transform: skewY(1deg);
  }
  100% {
    transform: skewY(0deg);
  }
}

.card {
  position: relative;
  font-size: 1em;
  background: rgb(229, 238, 238);
  display: inline-block;
  width: 13em;
  height: 19em;
  min-width: 75px;
  border-radius: 1em;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 1.5s;
  cursor: pointer;
  margin: 10px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 60px;
    height: 100%;
    top: 0;
    filter: blur(30px);
    transform: translateX(-100px) skewX(-15deg);
  }

  &:hover {
    &::before {
      transform: translateX(300px) skewX(-15deg);
      transition: 1.5s;
    }

    animation: float 1.5s;
  }
}

.card_suit {
  width: 100%;
  display: block;
  font-size: 3em;
}

.card_suit_top {
  display: flex;
  justify-content: start;
  padding-left: 4%;
}

.card_suit_bottom {
  display: flex;
  justify-content: end;
  position: absolute;
  width: 96%;
  bottom: 0em;
  transform: rotate(180deg);
}

.card_rank {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 40%;
  font-size: 3em;
}

.red {
  color: #ff0000;
}

.black {
  color: #000;
}
</style>

<script>
    export default {
        name: 'Card',
        props: {
            // TODO: Prop type checking
            card: {},
        },
    };
</script>
