import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../store/slices/ordersSlice';
import type { AppDispatch, RootState } from '../store';

const OrderForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.orders);
  const [quantity, setQuantity] = useState(1);

  const petId = location.state?.petId;

  if (!petId) {
    return <div>No pet selected for order</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const order = {
      id: 0, // API will assign the actual ID
      petId,
      quantity,
      shipDate: new Date().toISOString(),
      status: 'placed' as const,
      complete: false
    };

    const resultAction = await dispatch(placeOrder(order));
    if (placeOrder.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="button button--secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="button button--primary"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;