export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface SteamItem {
  id: number;
  name: string;
  image: string;
  rarity: ItemRarity;
  price: number;
  category: string;
}

export const mockItems: SteamItem[] = [
  {
    id: 1,
    name: 'AWP | Dragon Lore',
    image: '🎯',
    rarity: 'legendary',
    price: 4500,
    category: 'Weapon'
  },
  {
    id: 2,
    name: 'Karambit | Fade',
    image: '🔪',
    rarity: 'legendary',
    price: 3200,
    category: 'Knife'
  },
  {
    id: 3,
    name: 'M4A4 | Howl',
    image: '🔫',
    rarity: 'rare',
    price: 2800,
    category: 'Weapon'
  },
  {
    id: 4,
    name: 'AK-47 | Redline',
    image: '⚡',
    rarity: 'rare',
    price: 180,
    category: 'Weapon'
  },
  {
    id: 5,
    name: 'Desert Eagle | Blaze',
    image: '🔥',
    rarity: 'uncommon',
    price: 450,
    category: 'Weapon'
  },
  {
    id: 6,
    name: 'Glock-18 | Fade',
    image: '💎',
    rarity: 'uncommon',
    price: 320,
    category: 'Weapon'
  }
];

export const getRarityClass = (rarity: ItemRarity) => {
  const classes = {
    common: 'rarity-common',
    uncommon: 'rarity-uncommon',
    rare: 'rarity-rare',
    legendary: 'rarity-legendary'
  };
  return classes[rarity];
};

export const getRarityBadgeColor = (rarity: ItemRarity) => {
  const colors = {
    common: 'bg-muted-foreground/30',
    uncommon: 'bg-[hsl(var(--uncommon))]',
    rare: 'bg-[hsl(var(--rare))]',
    legendary: 'bg-[hsl(var(--legendary))]'
  };
  return colors[rarity];
};
