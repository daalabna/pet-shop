import type { paths } from './api-schema';

// Pet types
export type Pet = paths['/pet/{petId}']['get']['responses']['200']['content']['application/json'];
export type PetStatus = paths['/pet/findByStatus']['get']['parameters']['query']['status'];

// Order types
export type Order = paths['/store/order/{orderId}']['get']['responses']['200']['content']['application/json'];
export type OrderStatus = Order['status'];

// User types
export type User = paths['/user/{username}']['get']['responses']['200']['content']['application/json'];

// Category and Tag types
export type Category = NonNullable<Pet['category']>;
export type Tag = NonNullable<Pet['tags']>[number];