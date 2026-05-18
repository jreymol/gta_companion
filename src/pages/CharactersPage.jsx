import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import Spinner from '../components/Spinner';
import './CharactersPage.css';

export default function CharactersPage() {
  const { data: characters, loading, error } = useFetch('/characters');

  if (loading) return <Spinner />;
  if (error) return <div className="page-error">Error al cargar personajes: {error}</div>;

  return (
    <div className="characters-page">
      <div className="page-header">
        <h1>Personajes</h1>
        <p>{characters?.length ?? 0} personajes en San Andreas</p>
      </div>

      <div className="characters-grid">
        {characters?.map((char) => (
          <Link to={`/characters/${char.id}`} key={char.id} className="char-card">
            <div className="char-avatar">{char.nombre?.charAt(0) ?? '?'}</div>
            <div className="char-info">
              <h3>{char.nombre}</h3>
              <span className="char-gang">{char.pandilla ?? char.gang ?? '—'}</span>
              {char.estado && <span className="char-status">{char.estado}</span>}
            </div>
            <span className="char-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
