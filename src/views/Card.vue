<template>
    <div class="card" :class="cardColor(card.name)">
        <span class="card_suit card_suit_top">{{ card.suit }}</span>
        <span class="card_rank">{{ card.rank }} </span>
        <span class="card_suit card_suit_bottom">{{ card.suit }}</span>
    </div>
</template>

<style scoped lang="scss">
@import '../app.scss';

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
  transition: transform 1.5s;
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
      transition: transform 1.5s;
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
}
</style>

<script>
    import ColorMixin from '../components/helpers/ColorMixin.js';
    import VT from 'vue-types';
    export default {
        name: 'Card',
        mixins: [ColorMixin],
        props: {
            card: VT.object.isRequired,
        },
    };
</script>
