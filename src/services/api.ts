import SwaggerClient from 'swagger-client';
import type { Pet, Order, User } from '../types/api';

let client: any = null;

const initClient = async () => {
  if (!client) {
    client = await new SwaggerClient({
      url: 'https://petstore3.swagger.io/api/v3/openapi.json',
    });
  }
  return client;
};

export const petApi = {
  getPetById: async (id: number) => {
    const api = await initClient();
    const response = await api.apis.pet.getPetById({ petId: id });
    return { data: response.body as Pet };
  },
  
  findByStatus: async (status: string) => {
    const api = await initClient();
    const response = await api.apis.pet.findPetsByStatus({ status });
    return { data: response.body as Pet[] };
  },
  
  addPet: async (pet: Pet) => {
    const api = await initClient();
    const response = await api.apis.pet.addPet({ body: pet });
    return { data: response.body as Pet };
  },
  
  updatePet: async (pet: Pet) => {
    const api = await initClient();
    const response = await api.apis.pet.updatePet({ body: pet });
    return { data: response.body as Pet };
  },
  
  deletePet: async (id: number) => {
    const api = await initClient();
    await api.apis.pet.deletePet({ petId: id });
  }
};

export const storeApi = {
  placeOrder: async (order: Order) => {
    const api = await initClient();
    const response = await api.apis.store.placeOrder({ body: order });
    return { data: response.body as Order };
  },
  
  getOrderById: async (id: number) => {
    const api = await initClient();
    const response = await api.apis.store.getOrderById({ orderId: id });
    return { data: response.body as Order };
  },
  
  deleteOrder: async (id: number) => {
    const api = await initClient();
    await api.apis.store.deleteOrder({ orderId: id });
  },
  
  getInventory: async () => {
    const api = await initClient();
    const response = await api.apis.store.getInventory({});
    return { data: response.body as Record<string, number> };
  }
};

export const userApi = {
  createUser: async (user: User) => {
    const api = await initClient();
    const response = await api.apis.user.createUser({ body: user });
    return { data: response.body as User };
  },
  
  getUserByUsername: async (username: string) => {
    const api = await initClient();
    const response = await api.apis.user.getUserByName({ username });
    return { data: response.body as User };
  },
  
  updateUser: async (username: string, user: User) => {
    const api = await initClient();
    const response = await api.apis.user.updateUser({ username, body: user });
    return { data: response.body as User };
  },
  
  deleteUser: async (username: string) => {
    const api = await initClient();
    await api.apis.user.deleteUser({ username });
  },
  
  login: async (username: string, password: string) => {
    const api = await initClient();
    const response = await api.apis.user.loginUser({ username, password });
    return { data: response.body as string };
  },
  
  logout: async () => {
    const api = await initClient();
    await api.apis.user.logoutUser({});
  }
};