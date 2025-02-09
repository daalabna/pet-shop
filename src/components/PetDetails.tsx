import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetById } from '../store/slices/petsSlice';
import type { AppDispatch, RootState } from '../store';
import { Dog, Tag } from 'lucide-react';

const PetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPet: pet, loading, error } = useSelector((state: RootState) => state.pets);

  useEffect(() => {
    if (id) {
      dispatch(fetchPetById(parseInt(id)));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!pet) return <div>Pet not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="button button--secondary mb-4"
      >
        Back
      </button>

      <div className="pet-card">
        {pet.photoUrls[0] ? (
          <img
            src={pet.photoUrls[0]}
            alt={pet.name}
            className="pet-card__image"
          />
        ) : (
          <div className="pet-card__image flex items-center justify-center bg-gray-100">
            <Dog size={64} className="text-gray-400" />
          </div>
        )}

        <div className="pet-card__content">
          <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
          
          <div className="mb-4">
            <span className={`pet-card__status pet-card__status--${pet.status}`}>
              {pet.status}
            </span>
          </div>

          {pet.category && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Category</h2>
              <p>{pet.category.name}</p>
            </div>
          )}

          {pet.tags && pet.tags.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {pet.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <Tag size={16} />
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/order', { state: { petId: pet.id } })}
            className="button button--primary mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;