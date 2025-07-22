import { SportCategory } from '../types';

export const sportsCategories: SportCategory[] = [
  // Traditional Sports
  { id: 'football', name: 'Football (Soccer)', category: 'traditional', icon: '⚽' },
  { id: 'tennis', name: 'Tennis', category: 'traditional', icon: '🎾' },
  { id: 'basketball', name: 'Basketball', category: 'traditional', icon: '🏀' },
  { id: 'hockey', name: 'Ice Hockey', category: 'traditional', icon: '🏒' },
  { id: 'baseball', name: 'Baseball', category: 'traditional', icon: '⚾' },
  { id: 'american-football', name: 'American Football', category: 'traditional', icon: '🏈' },
  { id: 'cricket', name: 'Cricket', category: 'traditional', icon: '🏏' },
  { id: 'table-tennis', name: 'Table Tennis', category: 'traditional', icon: '🏓' },
  { id: 'volleyball', name: 'Volleyball', category: 'traditional', icon: '🏐' },
  { id: 'handball', name: 'Handball', category: 'traditional', icon: '🤾' },
  { id: 'snooker', name: 'Snooker', category: 'traditional', icon: '🎱' },
  { id: 'boxing', name: 'Boxing', category: 'traditional', icon: '🥊' },
  { id: 'mma', name: 'MMA', category: 'traditional', icon: '🥋' },
  { id: 'golf', name: 'Golf', category: 'traditional', icon: '⛳' },
  { id: 'rugby', name: 'Rugby', category: 'traditional', icon: '🏉' },
  { id: 'darts', name: 'Darts', category: 'traditional', icon: '🎯' },
  
  // Racing
  { id: 'horse-racing', name: 'Horse Racing', category: 'racing', icon: '🏇' },
  { id: 'formula1', name: 'Formula 1', category: 'racing', icon: '🏎️' },
  { id: 'nascar', name: 'NASCAR', category: 'racing', icon: '🏁' },
  { id: 'greyhound-racing', name: 'Greyhound Racing', category: 'racing', icon: '🐕' },
  { id: 'motogp', name: 'MotoGP', category: 'racing', icon: '🏍️' },
  
  // Esports
  { id: 'fifa', name: 'FIFA', category: 'esports', icon: '🎮' },
  { id: 'lol', name: 'League of Legends', category: 'esports', icon: '🎮' },
  { id: 'cs2', name: 'Counter-Strike 2', category: 'esports', icon: '🎮' },
  { id: 'valorant', name: 'Valorant', category: 'esports', icon: '🎮' },
  { id: 'dota2', name: 'Dota 2', category: 'esports', icon: '🎮' },
];