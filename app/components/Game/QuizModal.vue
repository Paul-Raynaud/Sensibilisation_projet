<template>
  <Transition name="scale">
    <div
      v-if="show"
      class="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4"
    >
      <div
        class="bg-slate-900 border-2 border-cyan-500/30 p-10 rounded-[2.5rem] max-w-xl w-full shadow-[0_0_100px_rgba(6,182,212,0.15)] relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black">
          ?
        </div>
        <div
          class="text-cyan-400 text-[10px] font-black tracking-[0.3em] mb-4 uppercase"
        >
          {{ data.category }}
        </div>
        <h3 class="text-2xl font-bold mb-10 leading-relaxed">
          {{ data.q }}
        </h3>
        <div class="grid gap-4">
          <button
            v-for="(opt, idx) in data.o"
            :key="idx"
            @click="$emit('answer', idx)"
            class="group w-full p-5 bg-slate-800/50 hover:bg-cyan-500 rounded-2xl text-left transition-all border border-slate-800 flex items-center gap-4"
          >
            <span
              class="w-8 h-8 rounded-lg bg-slate-700 group-hover:bg-white/20 flex items-center justify-center font-mono font-bold text-sm"
              >{{ idx + 1 }}</span
            >
            <span class="group-hover:text-black font-semibold">{{ opt }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Question } from "~/types";

defineProps<{
  show: boolean;
  data: Partial<Question>;
}>();

defineEmits<{
  (e: "answer", idx: number): void;
}>();
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>
