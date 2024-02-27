import { get, writable } from 'svelte/store'

const defaultData = {
  status: "welcome",
  secondsLasted: 0,
  freezeRate: defaultFreezeRate,
  beganAt: null,
  endedAt: null
}

// On first load, get stored gameState from local storage
const localStorageGameState = localStorage.data ? JSON.parse(localStorage.gameState) : defaultData