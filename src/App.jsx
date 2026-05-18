import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import VehiclesPage from './pages/VehiclesPage';
import ForumPage from './pages/ForumPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/characters" element={
            <ProtectedRoute><CharactersPage /></ProtectedRoute>
          } />
          <Route path="/characters/:id" element={
            <ProtectedRoute><CharacterDetailPage /></ProtectedRoute>
          } />
          <Route path="/vehicles" element={
            <ProtectedRoute><VehiclesPage /></ProtectedRoute>
          } />
          <Route path="/forum" element={
            <ProtectedRoute><ForumPage /></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <h2 style={{ color: '#f97316', fontSize: '3rem' }}>404</h2>
              <p>Página no encontrada en San Andreas.</p>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
