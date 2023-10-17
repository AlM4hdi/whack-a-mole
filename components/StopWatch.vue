<template>
    <div>
        Time: {{ secondsLeft }}
    </div>
</template>

<script setup>
const props = defineProps({
    time: {
        type: Number,
        required: true
    },
    resetTime: {
        type: Boolean,
        required: true
    }
})
const {time, resetTime} = toRefs(props)
const countdown = ref(null);
const secondsLeft = ref(time.value / 1000);
const timer = () => {
    const now = Date.now();
    const then = now + time.value;
    countdown.value = setInterval(() => {
        secondsLeft.value = Math.round((then - Date.now()) / 1000 - 1);
        if (secondsLeft.value < 0) {
            clearInterval(countdown.value);
            secondsLeft.value = 0;
            return;
        }
    }, 1000);
}


onMounted(() => {
    timer();
})
watch(() => resetTime.value, (newVal, oldVal) => {
    if (newVal) {
        secondsLeft.value = time.value / 1000;
    clearInterval(countdown.value);
    timer();
    }
});
</script>

<style lang="scss" scoped>

</style>