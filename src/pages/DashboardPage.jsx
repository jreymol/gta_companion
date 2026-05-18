import { useFetch } from '../hooks/useFetch';
import Spinner from '../components/Spinner';
import './DashboardPage.css';

export default function DashboardPage() {
  const { data, loading, error } = useFetch('/game-metadata');

  if (loading) return <Spinner />;
  if (error) return <div className="page-error">Error al cargar metadata: {error}</div>;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Información general del universo de San Andreas</p>
      </div>

      {data && (
        <div className="metadata-grid">
          {Object.entries(data).map(([key, value]) => (
            <div className="meta-card" key={key}>
              <span className="meta-label">{key.replace(/_/g, ' ')}</span>
              <span className="meta-value">
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
