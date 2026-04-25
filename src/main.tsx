import { Provider } from 'react-redux';
import { store } from '@api/store';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@/index.css';
import Login from '@pages/Login';
import Register from '@pages/Register';
import { Home } from '@pages/Home';
import { AuthProvider } from '@/providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
