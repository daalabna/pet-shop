import type { Order, Pet, User } from "../api/petstore";

export interface PetsState {
  pets: Pet[];
  selectedPet: Pet | null;
  loading: boolean;
  error: string | null;
}

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}