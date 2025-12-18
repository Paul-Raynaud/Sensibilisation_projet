<template>
  <div
    class="flex flex-col items-center justify-center flex-1 space-y-8 animate-in fade-in zoom-in duration-500"
  >
    <h1
      class="text-5xl font-black text-cyan-400 uppercase tracking-widest text-center drop-shadow-2xl"
    >
      Horizon : Compliance Quest
    </h1>
    <div
      class="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl text-center max-w-md w-full"
    >
      <p class="text-slate-400 mb-6 font-mono text-sm uppercase">
        Configuration de la simulation
      </p>
      <h2 class="text-xl font-bold mb-6">Nombre d'agents IT ?</h2>
      <div class="flex justify-center gap-4 mb-8">
        <button
          v-for="n in [2, 3, 4]"
          :key="n"
          @click="$emit('update:playerCount', n)"
          :class="[
            'w-14 h-14 rounded-full font-black text-xl border-2 transition-all',
            playerCount === n
              ? 'bg-cyan-500 border-white text-black scale-110'
              : 'bg-slate-800 border-slate-700 text-slate-400',
          ]"
        >
          {{ n }}
        </button>
      </div>

      <div class="space-y-3 mb-8 text-left">
        <label class="text-sm uppercase font-mono text-cyan-400">Noms des Agents</label>
        <div v-for="i in playerCount" :key="i" class="flex items-center gap-3">
          <span class="font-mono text-slate-500 text-sm">#{{ i }}</span>
          <input
            type="text"
            :value="playerNames[i - 1] || ''"
            @input="(e) => updateName(i - 1, (e.target as HTMLInputElement).value)"
            :placeholder="`Agent ${i}`"
            class="w-full bg-slate-800 border-b border-slate-700 p-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

       <div class="mb-10 text-left">
        <label class="text-sm uppercase font-mono text-cyan-400 block mb-2">Temps par question (sec)</label>
        <input
          type="number"
          :value="quizTimeout"
          @input="(e) => $emit('update:quizTimeout', Number((e.target as HTMLInputElement).value))"
          min="5"
          max="60"
          class="w-full bg-slate-800 border-b border-slate-700 p-2 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      <button
        @click="$emit('start')"
        class="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl uppercase tracking-widest shadow-lg transition-transform active:scale-95"
      >
        Initialiser le déploiement
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  playerCount: number;
  playerNames: string[];
  quizTimeout: number;
}>();

const emit = defineEmits<{
  (e: "update:playerCount", count: number): void;
  (e: "update:playerNames", names: string[]): void;
  (e: "update:quizTimeout", seconds: number): void;
  (e: "start"): void;
}>();

const updateName = (index: number, value: string) => {
  const newNames = [...props.playerNames];
  newNames[index] = value;
  emit("update:playerNames", newNames);
};
</script>
