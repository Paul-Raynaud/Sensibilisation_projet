<template>
  <div class="min-h-screen bg-[#050b18] text-slate-100 p-4 font-sans flex flex-col items-center">
    
    <div v-if="gameState === 'setup'" class="flex flex-col items-center justify-center flex-1 space-y-8 animate-in fade-in zoom-in duration-500">
      <h1 class="text-5xl font-black text-cyan-400 uppercase tracking-widest text-center drop-shadow-2xl">
        Horizon : Compliance Quest
      </h1>
      <div class="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <p class="text-slate-400 mb-6 font-mono text-sm uppercase">Configuration de la simulation</p>
        <h2 class="text-xl font-bold mb-6">Nombre d'agents IT ?</h2>
        <div class="flex justify-center gap-4 mb-8">
          <button v-for="n in [2, 3, 4]" :key="n" 
                  @click="tempPlayerCount = n"
                  :class="['w-14 h-14 rounded-full font-black text-xl border-2 transition-all', 
                           tempPlayerCount === n ? 'bg-cyan-500 border-white text-black scale-110' : 'bg-slate-800 border-slate-700 text-slate-400']">
            {{ n }}
          </button>
        </div>
        <button @click="startGame" 
                class="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl uppercase tracking-widest shadow-lg transition-transform active:scale-95">
          Initialiser le déploiement
        </button>
      </div>
    </div>

    <template v-else>
      <div class="w-full max-w-6xl flex justify-between items-center mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 class="text-2xl font-black text-cyan-400 uppercase tracking-tighter">Horizon <span class="text-white">Compliance</span></h1>
          <p class="text-[10px] text-slate-500 font-mono italic">AGENT_TRACKER // ACTIVE_SESSION</p>
        </div>
        <div class="flex gap-3">
          <div v-for="(p, i) in players" :key="i" 
               :class="['px-4 py-2 rounded-lg border transition-all', currentPlayerIndex === i ? 'bg-slate-800 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-950 border-slate-800 opacity-40']">
            <div class="text-[10px] uppercase font-black" :style="{ color: p.color }">Agent {{ i + 1 }}</div>
            <div class="flex gap-1 mt-1">
              <span v-for="it in p.inventory" :key="it.n" :title="it.d">{{ it.icon }}</span>
              <span v-if="!p.inventory.length" class="text-[10px] text-slate-600">Vide</span>
            </div>
          </div>
          <button @click="resetGame" class="ml-4 p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Recommencer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        <div class="relative bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-2xl">
          <div class="grid grid-cols-8 grid-rows-5 gap-3 relative" style="width: 760px; height: 480px;">
            <div v-for="(c, idx) in totalCases" :key="idx" 
                 :id="'case-'+idx"
                 :class="['relative rounded-xl border flex items-center justify-center transition-all duration-300', getCaseTheme(idx)]">
              <span class="absolute top-1 left-2 text-[10px] font-mono opacity-30">{{ idx + 1 }}</span>
              <div v-if="quizCases.includes(idx + 1)" class="text-2xl drop-shadow-md">🛡️</div>
              <div v-if="itemCases.includes(idx + 1)" class="text-2xl drop-shadow-md">🎁</div>
              <div v-if="idx === 0" class="text-[10px] font-black uppercase text-emerald-400">Start</div>
              <div v-if="idx === 39" class="text-[10px] font-black uppercase text-rose-500">Prod</div>
            </div>

            <div v-for="(p, i) in players" :key="'pion-'+i"
                 class="absolute w-12 h-12 rounded-full border-2 border-white shadow-2xl z-50 flex items-center justify-center font-black text-black transition-all duration-500 ease-out"
                 :style="getPionPosition(i)">
              {{ i + 1 }}
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-4">
          <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col items-center gap-6">
            <div class="relative">
              <div class="text-7xl font-black text-cyan-400 font-mono tracking-tighter">{{ isRolling ? '?' : diceResult }}</div>
              <div v-if="isMoving" class="absolute -bottom-2 w-full h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                <div class="h-full bg-cyan-400 animate-pulse"></div>
              </div>
            </div>
            <button @click="startTurn" :disabled="isRolling || isMoving || showModal"
                    class="w-full py-5 bg-cyan-600 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-black rounded-2xl uppercase tracking-[0.2em] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)] disabled:shadow-none active:translate-y-1">
              Lancer le Dé
            </button>
            <p class="text-xs text-slate-500 font-mono uppercase">
              Prochain : <span :style="{ color: players[currentPlayerIndex].color }">Agent {{ currentPlayerIndex + 1 }}</span>
            </p>
          </div>

          <div class="flex-1 bg-black/40 border border-slate-800 p-4 rounded-2xl font-mono text-[11px] overflow-y-auto max-h-[180px]">
            <div v-for="(log, idx) in logs" :key="idx" :class="log.type === 'error' ? 'text-rose-400' : 'text-cyan-400'" class="mb-2">
              <span class="opacity-50">[{{ log.time }}]</span> {{ log.msg }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <Transition name="scale">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4">
        <div class="bg-slate-900 border-2 border-cyan-500/30 p-10 rounded-[2.5rem] max-w-xl w-full shadow-[0_0_100px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <div class="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black">?</div>
          <div class="text-cyan-400 text-[10px] font-black tracking-[0.3em] mb-4 uppercase">{{ modalData.category }}</div>
          <h3 class="text-2xl font-bold mb-10 leading-relaxed">{{ modalData.q }}</h3>
          <div class="grid gap-4">
            <button v-for="(opt, idx) in modalData.o" :key="idx" @click="answerQuiz(idx)"
                    class="group w-full p-5 bg-slate-800/50 hover:bg-cyan-500 rounded-2xl text-left transition-all border border-slate-800 flex items-center gap-4">
              <span class="w-8 h-8 rounded-lg bg-slate-700 group-hover:bg-white/20 flex items-center justify-center font-mono font-bold text-sm">{{ idx + 1 }}</span>
              <span class="group-hover:text-black font-semibold">{{ opt }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// --- CONFIGURATION STATIQUE ---
const totalCases = 40
const quizCases = [4, 8, 12, 16, 20, 24, 28, 32, 36]
const itemCases = [6, 11, 22, 30, 38]
const colors = ['#22d3ee', '#f43f5e', '#10b981', '#f59e0b']

// --- ÉTAT DU JEU ---
const gameState = ref('setup')
const tempPlayerCount = ref(2)
const players = reactive([])
const currentPlayerIndex = ref(0)
const diceResult = ref(0)
const isRolling = ref(false)
const isMoving = ref(false)
const showModal = ref(false)
const modalData = ref({})
const logs = ref([])

// --- QUESTIONS BASÉES SUR LE COURS ---
const questions = [
  { category: "DCP", q: "Comment définit-on une Donnée à Caractère Personnel (DCP) ?", o: ["Toute info liée à une personne identifiable", "Uniquement le nom et prénom", "Toute donnée stockée sur un cloud"], c: 0 },
  { category: "Minimisation", q: "Que stipule la règle d'or sur la minimisation des données ?", o: ["Collecter un maximum 'au cas où'", "Ne collecter que le strict nécessaire", "Compresser les fichiers pour gagner de la place"], c: 1 },
  { category: "Conservation", q: "Combien de temps doit-on conserver les bulletins de paie selon le cours ?", o: ["1 mois", "5 ans", "10 ans"], c: 1 },
  { category: "Sanctions", q: "Quel est le montant max d'une amende administrative (Niveau 2) ?", o: ["10 000 €", "10 M€ ou 2% du CA", "20 M€ ou 4% du CA"], c: 2 },
  { category: "DPO", q: "La nomination d'un DPO (Délégué) est-elle toujours obligatoire ?", o: ["Oui, pour toutes les entreprises", "Non, mais toujours conseillée", "Seulement pour les start-ups"], c: 1 },
  { category: "Portabilité", q: "En quoi consiste le droit à la portabilité des données ?", o: ["Le droit de déplacer ses meubles", "Recevoir ses données pour les transmettre ailleurs", "Le droit de changer de mot de passe"], c: 1 },
  { category: "Intérêt légitime", q: "Traiter des données sans consentement nécessite :", o: ["Une raison valable et proportionnée", "Une simple envie de l'entreprise", "L'accord oral du client"], c: 0 },
  { category: "Finalité", q: "Peut-on utiliser les données scolaires pour faire de la politique ?", o: ["Oui, si c'est pour l'école", "Non, c'est un détournement de finalité", "Seulement par mail"], c: 1 }
]

// --- LOGIQUE CORE ---
const startGame = () => {
  players.length = 0
  for (let i = 0; i < tempPlayerCount.value; i++) {
    players.push({ pos: 0, inventory: [], color: colors[i] })
  }
  gameState.value = 'board'
  addLog("Simulation initialisée. En attente du déploiement.", "info")
}

const resetGame = () => {
  if (confirm("Voulez-vous réinitialiser la partie ?")) {
    gameState.value = 'setup'
    currentPlayerIndex.value = 0
    diceResult.value = 0
    logs.value = []
  }
}

const addLog = (msg, type = "info") => {
  logs.value.unshift({ msg, type, time: new Date().toLocaleTimeString().split(' ')[0] })
}

const getCaseTheme = (idx) => {
  if (idx === 0) return 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
  if (idx === 39) return 'bg-rose-500/10 border-rose-500/50 text-rose-500'
  if (quizCases.includes(idx + 1)) return 'bg-cyan-500/10 border-cyan-500/50 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]'
  if (itemCases.includes(idx + 1)) return 'bg-amber-500/10 border-amber-500/40'
  return 'bg-slate-900/50 border-slate-800'
}

const getPionPosition = (playerIdx) => {
  const p = players[playerIdx]
  const row = Math.floor(p.pos / 8)
  let col = p.pos % 8
  if (row % 2 !== 0) col = 7 - col // Effet serpentin (Zig-Zag)

  const caseW = 760 / 8
  const caseH = 480 / 5
  
  // Décalage pour collision entre joueurs sur la même case
  const offset = playerIdx * 6 

  return {
    left: `${(col * caseW) + (caseW / 2) - 24 + offset}px`,
    top: `${(row * caseH) + (caseH / 2) - 24 + offset}px`,
    backgroundColor: p.color
  }
}

const startTurn = () => {
  isRolling.value = true
  let ticks = 0
  const interval = setInterval(() => {
    diceResult.value = Math.floor(Math.random() * 6) + 1
    ticks++
    if (ticks > 15) {
      clearInterval(interval)
      isRolling.value = false
      move(diceResult.value)
    }
  }, 50)
}

const move = async (steps) => {
  isMoving.value = true
  const p = players[currentPlayerIndex.value]
  const dir = steps > 0 ? 1 : -1
  const absSteps = Math.abs(steps)

  for (let i = 0; i < absSteps; i++) {
    p.pos += dir
    if (p.pos < 0) p.pos = 0
    if (p.pos >= 39) {
      p.pos = 39
      alert(`AGENT ${currentPlayerIndex.value + 1} A RÉUSSI LE DÉPLOIEMENT !`)
      resetGame()
      return
    }
    await new Promise(r => setTimeout(r, 300))
  }
  isMoving.value = false
  handleLanding()
}

const handleLanding = () => {
  const p = players[currentPlayerIndex.value]
  const caseId = p.pos + 1

  if (quizCases.includes(caseId)) {
    modalData.value = questions[Math.floor(Math.random() * questions.length)]
    showModal.value = true
  } else if (itemCases.includes(caseId)) {
    p.inventory.push({ n: "VPN", icon: "🛡️", d: "Protection de recul" })
    addLog(`Agent ${currentPlayerIndex.value + 1} : Atout 'VPN' récupéré.`)
    nextTurn()
  } else {
    nextTurn()
  }
}

const answerQuiz = (idx) => {
  showModal.value = false
  const p = players[currentPlayerIndex.value]
  if (idx === modalData.value.c) {
    addLog(`Agent ${currentPlayerIndex.value + 1} : Conformité validée. Bonus +1`, "success")
    move(1)
  } else {
    const vpnIdx = p.inventory.findIndex(i => i.n === "VPN")
    if (vpnIdx > -1) {
      p.inventory.splice(vpnIdx, 1)
      addLog(`Agent ${currentPlayerIndex.value + 1} : Erreur détectée. VPN utilisé pour bloquer le recul.`)
      nextTurn()
    } else {
      addLog(`Agent ${currentPlayerIndex.value + 1} : Violation détectée ! Recul de ${diceResult.value} cases.`, "error")
      move(-diceResult.value)
    }
  }
}

const nextTurn = () => {
  currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.length
}
</script>

<style scoped>
.scale-enter-active, .scale-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }

@keyframes ping-small {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.1); opacity: 0; }
}

.case.quiz::after {
  content: '';
  position: absolute;
  inset: -2px;
  border: 2px solid cyan;
  border-radius: 12px;
  animation: ping-small 1.5s infinite;
}
</style>