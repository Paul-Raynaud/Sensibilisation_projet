<template>
  <div class="flex-1 flex flex-col gap-4">
    <div
      class="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col items-center gap-6"
    >
      <div class="relative">
        <div
          class="text-7xl font-black text-cyan-400 font-mono tracking-tighter"
        >
          {{ isRolling ? "?" : diceResult }}
        </div>
        <div
          v-if="isMoving"
          class="absolute -bottom-2 w-full h-1 bg-cyan-500/20 rounded-full overflow-hidden"
        >
          <div class="h-full bg-cyan-400 animate-pulse"></div>
        </div>
      </div>
      <button
        @click="$emit('roll')"
        :disabled="isRolling || isMoving || disabled"
        class="w-full py-5 bg-cyan-600 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-black rounded-2xl uppercase tracking-[0.2em] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)] disabled:shadow-none active:translate-y-1"
      >
        Lancer le Dé
      </button>
      <p
        v-if="players.length && players[currentPlayerIndex]"
        class="text-xs text-slate-500 font-mono uppercase"
      >
        Prochain :
        <span :style="{ color: players[currentPlayerIndex]?.color }"
          >Agent {{ currentPlayerIndex + 1 }}</span
        >
      </p>
    </div>

    <div
      class="flex-1 bg-black/40 border border-slate-800 p-4 rounded-2xl font-mono text-[11px] overflow-y-auto max-h-45"
    >
      <div
        v-for="(log, idx) in logs"
        :key="idx"
        :class="log.type === 'error' ? 'text-rose-400' : 'text-cyan-400'"
        class="mb-2"
      >
        <span class="opacity-50">[{{ log.time }}]</span> {{ log.msg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player, Log } from "~/types";

defineProps<{
  diceResult: number;
  isRolling: boolean;
  isMoving: boolean;
  disabled: boolean;
  players: Player[];
  currentPlayerIndex: number;
  logs: Log[];
}>();

defineEmits<{
  (e: "roll"): void;
}>();
</script>
