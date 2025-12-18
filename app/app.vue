<template>
  <div class="min-h-screen bg-[#050b18] text-slate-100 p-4 font-sans flex flex-col items-center">
    <GameSetup
      v-if="gameState === 'setup'"
      v-model:playerCount="tempPlayerCount"
      @start="startGame"
    />

    <template v-else>
      <GameHeader
        :players="players"
        :current-player-index="currentPlayerIndex"
        @reset="resetGame"
      />

      <div class="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        <GameBoard :players="players" />

        <GameControls
          :dice-result="diceResult"
          :is-rolling="isRolling"
          :is-moving="isMoving"
          :disabled="showModal"
          :players="players"
          :current-player-index="currentPlayerIndex"
          :logs="logs"
          @roll="startTurn"
        />
      </div>
    </template>

    <GameQuizModal
      :show="showModal"
      :data="modalData"
      @answer="answerQuiz"
    />
  </div>
</template>

<script setup lang="ts">
const {
  gameState,
  tempPlayerCount,
  players,
  currentPlayerIndex,
  diceResult,
  isRolling,
  isMoving,
  showModal,
  modalData,
  logs,
  startGame,
  resetGame,
  startTurn,
  answerQuiz,
} = useGame();
</script>
