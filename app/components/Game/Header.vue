<template>
  <div
    class="w-full max-w-6xl flex justify-between items-center mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800"
  >
    <div>
      <h1 class="text-2xl font-black text-cyan-400 uppercase tracking-tighter">
        Horizon <span class="text-white">Compliance</span>
      </h1>
      <p class="text-[10px] text-slate-500 font-mono italic">
        AGENT_TRACKER // ACTIVE_SESSION
      </p>
    </div>
    <div class="flex gap-3">
      <div
        v-for="(p, i) in players"
        :key="i"
        :class="[
          'px-4 py-2 rounded-lg border transition-all',
          currentPlayerIndex === i
            ? 'bg-slate-800 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            : 'bg-slate-950 border-slate-800 opacity-40',
        ]"
      >
        <div
          class="text-[10px] uppercase font-black"
          :style="{ color: p.color }"
        >
          Agent {{ i + 1 }}
        </div>
        <div class="flex gap-1 mt-1">
          <span v-for="it in p.inventory" :key="it.n" :title="it.d">{{
            it.icon
          }}</span>
          <span v-if="!p.inventory.length" class="text-[10px] text-slate-600"
            >Vide</span
          >
        </div>
      </div>
      <button
        @click="$emit('reset')"
        class="ml-4 p-2 text-slate-400 hover:text-rose-500 transition-colors"
        title="Recommencer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from "~/types";

defineProps<{
  players: Player[];
  currentPlayerIndex: number;
}>();

defineEmits<{
  (e: "reset"): void;
}>();
</script>
