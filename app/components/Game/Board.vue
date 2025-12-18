<template>
  <div
    class="relative bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-2xl"
  >
    <div
      class="grid grid-cols-8 grid-rows-5 gap-3 relative"
      style="width: 760px; height: 480px"
    >
      <div
        v-for="(c, idx) in totalCases"
        :key="idx"
        :id="'case-' + getLogicalIndex(idx)"
        :class="[
          'relative rounded-xl border flex items-center justify-center transition-all duration-300',
          getCaseTheme(getLogicalIndex(idx)),
        ]"
      >
        <span class="absolute top-1 left-2 text-[10px] font-mono opacity-30">{{
          getLogicalIndex(idx) + 1
        }}</span>
        <div v-if="quizCases.includes(getLogicalIndex(idx) + 1)" class="text-2xl drop-shadow-md">
          🛡️
        </div>
        <div v-if="itemCases.includes(getLogicalIndex(idx) + 1)" class="text-2xl drop-shadow-md">
          🎁
        </div>
        <div
          v-if="getLogicalIndex(idx) === 0"
          class="text-[10px] font-black uppercase text-emerald-400"
        >
          Start
        </div>
        <div
          v-if="getLogicalIndex(idx) === 39"
          class="text-[10px] font-black uppercase text-rose-500"
        >
          Prod
        </div>
      </div>

      <div
        v-for="(p, i) in players"
        :key="'pion-' + i"
        class="absolute w-12 h-12 rounded-full border-2 border-white shadow-2xl z-50 flex items-center justify-center font-black text-black transition-all duration-500 ease-out"
        :style="getPionPosition(i)"
      >
        {{ i + 1 }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from "~/types";
import { TOTAL_CASES } from "~/utils/constants";

const props = defineProps<{
  players: Player[];
  quizCases: number[];
  itemCases: number[];
}>();

const totalCases = TOTAL_CASES;

const getCaseTheme = (idx: number) => {
  if (idx === 0)
    return "bg-emerald-500/10 border-emerald-500/50 text-emerald-500";
  if (idx === 39) return "bg-rose-500/10 border-rose-500/50 text-rose-500";
  if (props.quizCases.includes(idx + 1))
    return "bg-cyan-500/10 border-cyan-500/50 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]";
  if (props.itemCases.includes(idx + 1)) return "bg-amber-500/10 border-amber-500/40";
  return "bg-slate-900/50 border-slate-800";
};

const getLogicalIndex = (idx: number) => {
  const row = Math.floor(idx / 8);
  const col = idx % 8;
  return row % 2 === 0 ? idx : row * 8 + (7 - col);
};

const getPionPosition = (playerIdx: number) => {
  const p = props.players[playerIdx];
  if (!p) return {};
  const row = Math.floor(p.pos / 8);
  let col = p.pos % 8;
  if (row % 2 !== 0) col = 7 - col;

  const caseW = 760 / 8;
  const caseH = 480 / 5;
  const offset = playerIdx * 5;

  return {
    left: `${col * caseW + caseW / 2 - 24 + offset}px`,
    top: `${row * caseH + caseH / 2 - 24 + offset}px`,
    backgroundColor: p.color,
  };
};
</script>
