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
      <p class="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-8 opacity-80">
        Configuration de la simulation
      </p>

      <!-- Player Count Selection -->
      <div class="mb-8">
        <h2 class="text-white font-bold mb-4 text-lg">Nombre d'agents IT</h2>
        <div class="flex justify-center gap-4">
          <button
            v-for="n in [2, 3, 4]"
            :key="n"
            @click="$emit('update:playerCount', n)"
            class="w-14 h-14 rounded-2xl font-black text-xl transition-all duration-300 flex items-center justify-center border-2"
            :class="[
              playerCount === n
                ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110'
                : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300',
            ]"
          >
            {{ n }}
          </button>
        </div>
      </div>

      <!-- Player Names -->
      <div class="space-y-4 mb-8 text-left">
        <label class="text-xs uppercase font-mono text-cyan-400 ml-1">Identification des Agents</label>
        <div v-for="i in playerCount" :key="i" class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-slate-500 font-mono text-xs">#{{ i }}</span>
          </div>
          <input
            type="text"
            :value="playerNames[i - 1] || ''"
            @input="(e) => updateName(i - 1, (e.target as HTMLInputElement).value)"
            :placeholder="`Nom de code Agent ${i}`"
            class="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-slate-900 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      <!-- Quiz Timeout -->
      <div class="mb-10 text-left">
        <label class="text-xs uppercase font-mono text-cyan-400 ml-1 block mb-2">Compte à rebours</label>
        <div class="relative">
          <input
            type="number"
            :value="quizTimeout"
            @input="(e) => $emit('update:quizTimeout', Number((e.target as HTMLInputElement).value))"
            min="5"
            max="60"
            class="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
          <div class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">SEC</div>
        </div>
      </div>

      <button
        @click="$emit('start')"
        class="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black rounded-xl uppercase tracking-widest text-sm shadow-lg shadow-cyan-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
