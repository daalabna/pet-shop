import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPet, deletePet } from '../store/slices/petsSlice';
import type { AppDispatch } from '../store';
import { Plus, Trash2 } from 'lucide-react';

const PetManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newPet, setNewPet] = useState({
    name: '',
    status: 'available' as const,
    photoUrls: [''],
  });
  const [petIdToDelete, setPetIdToDelete] = useState('');

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addPet({
      ...newPet,
      id: 0, // API will assign the actual ID
    }));
    setNewPet({
      name: '',
      status: 'available',
      photoUrls: [''],
    });
  };

  const handleDeletePet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (petIdToDelete) {
      await dispatch(deletePet(parseInt(petIdToDelete)));
      setPetIdToDelete('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Pet Management</h2>

      <div className="grid gap-8">
        {/* Add Pet Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Plus className="mr-2" size={20} />
            Add New Pet
          </h3>
          <form onSubmit={handleAddPet} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Name
              </label>
              <input
                type="text"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={newPet.status}
                onChange={(e) => setNewPet({ ...newPet, status: e.target.value as 'available' | 'pending' | 'sold' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
              >
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                value={newPet.photoUrls[0]}
                onChange={(e) => setNewPet({ ...newPet, photoUrls: [e.target.value] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                placeholder="https://example.com/pet-image.jpg"
              />
            </div>

            <button
              type="submit"
              className="button--primary w-full py-2 px-4 border rounded-md shadow-sm"
            >
              Add Pet
            </button>
          </form>
        </div>

        {/* Delete Pet Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center text-red-600">
            <Trash2 className="mr-2" size={20} />
            Delete Pet
          </h3>
          <form onSubmit={handleDeletePet} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet ID
              </label>
              <input
                type="number"
                value={petIdToDelete}
                onChange={(e) => setPetIdToDelete(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                min="1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Delete Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetManagement;