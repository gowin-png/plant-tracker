
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  plantedDate: string;
  location: string;
  notes?: string;
  waterFrequency?: number;
  lastWatered?: string;
  imageUrl?: string;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
