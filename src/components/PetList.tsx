import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPetsByStatus } from '../store/slices/petsSlice';
import type { AppDispatch, RootState } from '../store';
import { Dog } from 'lucide-react';

const PetList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector((state: RootState) => state.pets);
  const [status, setStatus] = useState('available');

  useEffect(() => {
    dispatch(fetchPetsByStatus(status));
  }, [dispatch, status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pet Store</h1>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
        >
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Dog className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pets found</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no pets with status: {status}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Link 
              to={`/pet/${pet.id}`} 
              key={`pet-${pet.id}`} 
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9">
                {pet.photoUrls[0] ? (
                  <img
                    src={pet.photoUrls[0]}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <Dog size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                  ${status === 'available' ? 'bg-green-100 text-green-800' : 
                    status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}
                >
                  {pet.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetList;