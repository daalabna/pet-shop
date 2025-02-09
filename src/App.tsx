import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import PetManagement from './components/PetManagement';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Register from './components/Register';
import LogoutConfirmation from './components/LogoutConfirmation';
import Navigation from './components/Navigation';
import './styles/main.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navigation />
          <main className="container">
            <Routes>
              <Route path="/" element={<PetList />} />
              <Route path="/pet/:id" element={<PetDetails />} />
              <Route path="/pets/manage" element={<PetManagement />} />
              <Route path="/order" element={<OrderForm />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<LogoutConfirmation />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;