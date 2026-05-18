import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import Spinner from '../components/Spinner';
import './CharacterDetailPage.css';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const { data: char, loading, error } = useFetch(`/characters/${id}`);

  if (loading) return <Spinner />;
  if (error) return <div className="page-error">Error al cargar personaje: {error}</div>;

  return (
    <div className="detail-page">
      <Link to="/characters" className="detail-back">← Volver a Personajes</Link>

      {char && (
        <div className="detail-card">
          <div className="detail-avatar">
            {char.nombre?.charAt(0) ?? '?'}
          </div>

          <div className="detail-content">
            <h1>{char.nombre}</h1>
            {char.pandilla && <span className="detail-gang">{char.pandilla}</span>}

            <div className="detail-attrs">
              {Object.entries(char)
                .filter(([k]) => k !== 'id')
                .map(([key, val]) => (
                  <div className="detail-attr" key={key}>
                    <span className="attr-key">{key.replace(/_/g, ' ')}</span>
                    <span className="attr-val">
                      {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
