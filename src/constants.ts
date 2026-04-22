export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverColor: string;
}

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'NEURAL_DRIFT.exe',
    artist: 'CYBER_MIND',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverColor: 'bg-cyan-500',
  },
  {
    id: '2',
    title: 'OBSIDIAN_PULSE.wav',
    artist: 'VOID_ENGINE',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverColor: 'bg-magenta-500',
  },
  {
    id: '3',
    title: 'CYBER_REPTILE.mp3',
    artist: 'GLITCH_LOGIC',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverColor: 'bg-purple-500',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [{ x: 10, y: 10 }];
export const INITIAL_DIRECTION = { x: 1, y: 0 };
export const GAME_SPEED = 100;
