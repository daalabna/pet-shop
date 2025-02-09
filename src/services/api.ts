import axios from 'axios';
import type { Pet, Order, User } from '../types/api';

const api = axios.create({
  baseURL: 'https://petstore3.swagger.io/api/v3',
});

export const petApi = {
  getPetById: (id: number) => api.get<Pet>(`/pet/${id}`),
  findByStatus: (status: string) => api.get<Pet[]>(`/pet/findByStatus?status=${status}`),
  addPet: (pet: Pet) => api.post<Pet>('/pet', pet),
  updatePet: (pet: Pet) => api.put<Pet>('/pet', pet),
  deletePet: (id: number) => api.delete(`/pet/${id}`),
};

export const storeApi = {
  placeOrder: (order: Order) => api.post<Order>('/store/order', order),
  getOrderById: (id: number) => api.get<Order>(`/store/order/${id}`),
  deleteOrder: (id: number) => api.delete(`/store/order/${id}`),
  getInventory: () => api.get<Record<string, number>>('/store/inventory'),
};

export const userApi = {
  createUser: (user: User) => api.post<User>('/user', user),
  getUserByUsername: (username: string) => api.get<User>(`/user/${username}`),
  updateUser: (username: string, user: User) => api.put<User>(`/user/${username}`, user),
  deleteUser: (username: string) => api.delete(`/user/${username}`),
  login: (username: string, password: string) =>
    api.get<string>(`/user/login?username=${username}&password=${password}`),
  logout: () => api.get('/user/logout'),
};