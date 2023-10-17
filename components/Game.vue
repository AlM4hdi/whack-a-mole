

<template>
    <div  class=" bg-slate-500 min-h-screen text-white">
        <div>
         <div class=" w-full h-16 shadow-md flex justify-evenly items-center">
            <button @click="goBack" class=" shadow-md text-slate-100  px-2 py-1 mx-1 my-2 hover:bg-slate-700">Go Back</button>
             <button @click="startGame" class=" shadow-md text-slate-100  px-2 py-1 mx-1 my-2 hover:bg-slate-700">Retry</button>
          
            
             <div class="score flex justify-evenly flex-1">
                <span class="">Score: {{ score }}</span>
                <span><StopWatch :time="time" :resetTime="resetTime"/></span>
                <span>{{ mode }}</span>
            </div>

         </div>
        </div>
        <div class="game ">
            <div class="hole" v-for="bushes, index in 6" :class="index + 1 === hole ? 'up' : ''">
                <img :src="!moleBonked ? '/mole-color.svg' : '/mole.svg'" class="mole" alt="" @click="bonk">
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['stop'])
const goBack = () => {
    emit('stop')
}
const props = defineProps({
    difficulty: {
        type: Object,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    }
})
const { difficulty, time, mode } = toRefs(props)

const MOLE_DISPLAY_TIME = 100;

const start = ref(false);
const hole = ref(0);
const lastHole = ref(0);
const score = ref(0);
const moleBonked = ref(false);
const changeTime = ref(0);
let peepTimeout = null; 
const resetTime = ref(false)


const randomHole = (holes) => {
  let id = Math.floor(Math.random() * holes + 1);
  while (id === lastHole.value) {
    id = Math.floor(Math.random() * holes + 1);
  }
  lastHole.value = id;
  return id;
};

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const peep = () => {
  clearTimeout(peepTimeout); // Clear any existing peep timeouts

  changeTime.value = randomTime(difficulty.value.MIN_RANDOM_TIME, difficulty.value.MAX_RANDOM_TIME);
  hole.value = randomHole(6);

  peepTimeout = setTimeout(() => {
    if (start.value) peep();
  }, changeTime.value);
};

const startGame = () => {
  let gameTime = time.value;
  resetTime.value = !resetTime.value;
  score.value = 0;
  start.value = true;
  hole.value = 0;
  moleBonked.value = false;
  peep(); // Start the first peep immediately
  setTimeout(() => {
    start.value = false;
    alert(`Game Over! Your score is ${score.value}`);
  }, gameTime);
};


// const startGame = () => {
//   let gameTime = time.value;
//   resetTime.value = !resetTime.value;
//   score.value = 0;
//   start.value = true;
//   peep(); // Start the first peep immediately
//   setTimeout(() => {
//     start.value = false;
//     hole.value = 0;
//     alert(`Game Over! Your score is ${score.value}`);
//   }, gameTime);
// };
startGame()

const bonk = (event) => {
  if (!event.isTrusted) return;
  score.value++;
  moleBonked.value = true;
  clearTimeout(peepTimeout); // Stop the current peep
  setTimeout(() => {
    moleBonked.value = false;
    peep(); // Start a new peep
  }, MOLE_DISPLAY_TIME);
};



</script>

<style  scoped>
.game {
    width: 600px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
}

.hole {
    flex: 1 0 33.33%;
    overflow: hidden;
    position: relative;
}

.hole:after {
    /* display: block; */
    display: inline-block;
    background: url('/bush.svg') bottom center no-repeat;
    background-size: cover;
    content: '';
    width: 100%;
    height: 100px;
    position: absolute;
    z-index: 2;
    bottom: -30px;
}

.mole {
    background: bottom center no-repeat;

    background-size: 100%;
    position: absolute;
    top: 100%;

    height: 150px;
    left: 5%;
    transition: all 0.4s;
}

.hole.up .mole {
    top: 40px;
}
</style>