import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <main className="landing">
      <div className="landing-hero">
        <div className="landing-badge">Los Santos • 1992</div>
        <h1 className="landing-title">
          <span>GTA</span>
          <span className="title-sa">San Andreas</span>
          <span className="title-companion">Companion App</span>
        </h1>
        <p className="landing-desc">
          Tu guía definitiva del universo de San Andreas. Explora personajes, vehículos,
          estadísticas del juego y conecta con la comunidad.
        </p>
        <div className="landing-actions">
          {user ? (
            <Link to="/dashboard" className="btn-primary">Ir al Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
              <Link to="/characters" className="btn-secondary">Ver Personajes</Link>
            </>
          )}
        </div>
      </div>

      <section className="landing-features">
        <div className="feature-card">
          <span className="feature-icon">🎮</span>
          <h3>Metadata del Juego</h3>
          <p>Información completa sobre el universo de GTA San Andreas.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">👥</span>
          <h3>Personajes</h3>
          <p>Conoce a CJ, Big Smoke, Ryder y todos los protagonistas del juego.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🚗</span>
          <h3>Vehículos</h3>
          <p>Filtra y explora la colección completa de vehículos por clase.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💬</span>
          <h3>Foro Comunidad</h3>
          <p>Comparte trucos, estrategias y noticias con otros jugadores.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Fan-made · No afiliado con Rockstar Games</p>
      </footer>
    </main>
  );
}
