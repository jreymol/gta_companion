import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-gta">GTA</span>
        <span className="brand-sa">:SA</span>
        <span className="brand-sub">Companion</span>
      </NavLink>

      {user && (
        <ul className="navbar-links">
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          <li><NavLink to="/characters" className={({ isActive }) => isActive ? 'active' : ''}>Personajes</NavLink></li>
          <li><NavLink to="/vehicles" className={({ isActive }) => isActive ? 'active' : ''}>Vehículos</NavLink></li>
          <li><NavLink to="/forum" className={({ isActive }) => isActive ? 'active' : ''}>Foro</NavLink></li>
        </ul>
      )}

      <div className="navbar-actions">
        {user ? (
          <>
            <span className="navbar-user">👤 {user.username}</span>
            <button className="btn-logout" onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <NavLink to="/login" className="btn-login">Iniciar Sesión</NavLink>
        )}
      </div>
    </nav>
  );
}
