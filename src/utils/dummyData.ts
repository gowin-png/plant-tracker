
import { Plant } from '@/types';

export const dummyPlants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    species: 'Monstera deliciosa',
    plantedDate: '2023-04-15',
    location: 'Living Room',
    notes: 'Thriving well near the east-facing window',
    waterFrequency: 7,
    lastWatered: '2023-05-10',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    userId: '1'
  },
  {
    id: '2',
    name: 'Snake Plant',
    species: 'Sansevieria trifasciata',
    plantedDate: '2023-02-20',
    location: 'Bedroom',
    notes: 'Very low maintenance, perfect for the corner spot',
    waterFrequency: 14,
    lastWatered: '2023-05-05',
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    userId: '1'
  },
  {
    id: '3',
    name: 'Peace Lily',
    species: 'Spathiphyllum',
    plantedDate: '2023-03-10',
    location: 'Home Office',
    notes: 'Droops when it needs water, then perks right up after watering',
    waterFrequency: 5,
    lastWatered: '2023-05-12',
    imageUrl: 'https://images.unsplash.com/photo-1593691567111-12b1d9a525f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    userId: '1'
  }
];
