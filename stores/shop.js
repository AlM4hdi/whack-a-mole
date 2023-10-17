
import { defineStore } from 'pinia'
export const useShopStore = defineStore('shop', () => {
    // const count = ref(0)
    // const name = ref('Eduardo')
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //   count.value++
    // }
    const difficulty = ref({
        MIN_RANDOM_TIME: 1000,
        MAX_RANDOM_TIME: 5000,
    })
    const mode = ref('easy')
    const time = ref(10000)
    return { 
        difficulty,
        mode,
        time
     }
  })