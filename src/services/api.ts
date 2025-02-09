import { Api } from '../api/petstore';

const client = new Api({
  baseUrl: 'https://petstore3.swagger.io/api/v3',
});

export const petApi = {
  getPetById: (id: number) => client.pet.getPetById(id),
  findByStatus: (status: 'available' | 'pending' | 'sold') => 
    client.pet.findPetsByStatus({ status }),
  addPet: (pet: Parameters<typeof client.pet.addPet>[0]) => 
    client.pet.addPet(pet),
  updatePet: (pet: Parameters<typeof client.pet.updatePet>[0]) => 
    client.pet.updatePet(pet),
  deletePet: (id: number) => client.pet.deletePet(id),
};

export const storeApi = {
  placeOrder: (order: Parameters<typeof client.store.placeOrder>[0]) => 
    client.store.placeOrder(order),
  getOrderById: (id: number) => client.store.getOrderById(id),
  deleteOrder: (id: number) => client.store.deleteOrder(id),
  getInventory: () => client.store.getInventory(),
};

export const userApi = {
  createUser: (user: Parameters<typeof client.user.createUser>[0]) => 
    client.user.createUser(user),
  getUserByUsername: (username: string) => client.user.getUserByName(username),
  updateUser: (username: string, user: Parameters<typeof client.user.updateUser>[0]) => 
    client.user.updateUser(username, user),
  deleteUser: (username: string) => client.user.deleteUser(username),
  login: (username: string, password: string) => 
    client.user.loginUser({ username, password }),
  logout: () => client.user.logoutUser(),
};