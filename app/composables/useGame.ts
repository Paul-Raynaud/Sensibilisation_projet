import { ref, watch, onMounted } from 'vue'
import type { Player, Log, GameState, Question } from '~/types'
import { STORAGE_KEY, COLORS, QUESTIONS, QUIZ_CASES, ITEM_CASES } from '~/utils/constants'

export const useGame = () => {
  // --- ÉTAT DU JEU ---
  const gameState = ref<GameState>("setup");
  const tempPlayerCount = ref(2);
  const players = ref<Player[]>([]);
  const currentPlayerIndex = ref(0);
  const diceResult = ref(0);
  const isRolling = ref(false);
  const isMoving = ref(false);
  const showModal = ref(false);
  const modalData = ref<Partial<Question>>({});
  const logs = ref<Log[]>([]);

  // --- LOGIQUE DE SAUVEGARDE ---
  const saveGame = () => {
    const data = {
      gameState: gameState.value,
      players: players.value,
      currentPlayerIndex: currentPlayerIndex.value,
      logs: logs.value,
      tempPlayerCount: tempPlayerCount.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const loadGame = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState.value = parsed.gameState;
      players.value = parsed.players;
      currentPlayerIndex.value = parsed.currentPlayerIndex;
      logs.value = parsed.logs;
      tempPlayerCount.value = parsed.tempPlayerCount;
      addLog("Session restaurée.", "info");
    }
  };

  // Surveillance automatique des changements
  watch(
    [gameState, players, currentPlayerIndex, logs],
    () => {
      saveGame();
    },
    { deep: true }
  );

  onMounted(() => {
    loadGame();
  });

  // --- LOGIQUE CORE ---
  const startGame = () => {
    players.value = [];
    for (let i = 0; i < tempPlayerCount.value; i++) {
      players.value.push({ pos: 0, inventory: [], color: COLORS[i] || '#fff' });
    }
    gameState.value = "board";
    addLog("Simulation initialisée.", "info");
  };

  const resetGame = () => {
    if (confirm("Réinitialiser la partie ?")) {
      localStorage.removeItem(STORAGE_KEY);
      gameState.value = "setup";
      players.value = [];
      currentPlayerIndex.value = 0;
      diceResult.value = 0;
      logs.value = [];
    }
  };

  const addLog = (msg: string, type: 'info' | 'success' | 'error' = "info") => {
    logs.value.unshift({
      msg,
      type,
      time: new Date().toLocaleTimeString().split(" ")[0] || "",
    });
    if (logs.value.length > 20) logs.value.pop();
  };

  const startTurn = () => {
    isRolling.value = true;
    let ticks = 0;
    const interval = setInterval(() => {
      diceResult.value = Math.floor(Math.random() * 6) + 1;
      ticks++;
      if (ticks > 12) {
        clearInterval(interval);
        isRolling.value = false;
        move(diceResult.value);
      }
    }, 60);
  };

  const move = async (steps: number) => {
    isMoving.value = true;
    const p = players.value[currentPlayerIndex.value];
    if (!p) {
      isMoving.value = false;
      return;
    }

    const dir = steps > 0 ? 1 : -1;
    const absSteps = Math.abs(steps);

    for (let i = 0; i < absSteps; i++) {
      p.pos += dir;
      if (p.pos < 0) p.pos = 0;
      if (p.pos >= 39) {
        p.pos = 39;
        alert(`AGENT ${currentPlayerIndex.value + 1} A GAGNÉ !`);
        resetGame();
        return;
      }
      await new Promise((r) => setTimeout(r, 250));
    }
    isMoving.value = false;
    handleLanding();
  };

  const handleLanding = () => {
    const p = players.value[currentPlayerIndex.value];
    if (!p) return;

    const caseId = p.pos + 1;

    if (QUIZ_CASES.includes(caseId)) {
      const randomQuestion = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
      if (randomQuestion) {
        modalData.value = randomQuestion;
        showModal.value = true;
      }
    } else if (ITEM_CASES.includes(caseId)) {
      p.inventory.push({ n: "VPN", icon: "🛡️", d: "Protection de recul" });
      addLog(`Agent ${currentPlayerIndex.value + 1} : VPN activé.`);
      nextTurn();
    } else {
      nextTurn();
    }
  };

  const answerQuiz = (idx: number) => {
    showModal.value = false;
    const p = players.value[currentPlayerIndex.value];
    if (!p) return;

    if (modalData.value && idx === modalData.value.c) {
      addLog(
        `Agent ${currentPlayerIndex.value + 1} : Conformité OK (+1)`,
        "success"
      );
      move(1);
    } else {
      const vpnIdx = p.inventory.findIndex((i) => i.n === "VPN");
      if (vpnIdx > -1) {
        p.inventory.splice(vpnIdx, 1);
        addLog(`Agent ${currentPlayerIndex.value + 1} : Erreur bloquée par VPN.`);
        nextTurn();
      } else {
        addLog(
          `Agent ${currentPlayerIndex.value + 1} : Violation ! Recul de ${
            diceResult.value
          }`,
          "error"
        );
        move(-diceResult.value);
      }
    }
  };

  const nextTurn = () => {
    currentPlayerIndex.value =
      (currentPlayerIndex.value + 1) % players.value.length;
  };

  return {
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
  };
};
