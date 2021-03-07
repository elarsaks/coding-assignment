<template>
    <div class="home-view">
        <div class="overview-beside-detail">
            <div class="overview-wrapper">
                <overview />
            </div>
            <div class="detail-wrapper">
                <detail :card-id="cardId" />
            </div>
        </div>

        <instructions />
    </div>
</template>

<style scoped lang="scss">
@import '../app.scss';

.overview-beside-detail {
  width: 50vw;
  align-items: flex-start;
  display: flex;
}

.overview-wrapper {
  width: 30vw;
}
</style>

<script>
    import Detail from '@/components/detail.vue';
    import Instructions from '@/components/instructions.vue';
    import Overview from '@/components/overview.vue';

    export default {
        name: 'Home',
        components: { Detail, Instructions, Overview },
        props: {
            cardId: { validator: v => v === null || typeof v === 'string' },
        },
    };
</script>
