export interface InventoryItem {
  n: string;
  icon: string;
  d: string;
}

export interface Player {
  pos: number;
  inventory: InventoryItem[];
  color: string;
}

export interface Log {
  msg: string;
  type: 'info' | 'success' | 'error';
  time: string;
}

export interface Question {
  category: string;
  q: string;
  o: string[];
  c: number;
}

export type GameState = 'setup' | 'board';
