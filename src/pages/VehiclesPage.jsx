import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Spinner from '../components/Spinner';
import './VehiclesPage.css';

const CLASSES = ['', 'lowrider', 'sport', 'muscle', 'suv', 'moto', 'barco', 'avion'];

export default function VehiclesPage() {
  const [selectedClass, setSelectedClass] = useState('');

  const endpoint = selectedClass
    ? `/vehicles?clase=${selectedClass}`
    : '/vehicles';

  const { data: vehicles, loading, error } = useFetch(endpoint);

  return (
    <div className="vehicles-page">
      <div className="page-header">
        <h1>Vehículos</h1>
        <p>Filtra por clase para encontrar tu próximo vehículo</p>
      </div>

      <div className="vehicles-filter">
        {CLASSES.map((cls) => (
          <button
            key={cls || 'all'}
            className={`filter-btn ${selectedClass === cls ? 'active' : ''}`}
            onClick={() => setSelectedClass(cls)}
          >
            {cls || 'Todos'}
          </button>
        ))}
      </div>

      {loading && <Spinner />}
      {error && <p className="page-error">Error: {error}</p>}

      {!loading && !error && (
        <div className="vehicles-grid">
          {vehicles?.length === 0 && (
            <p className="no-results">No se encontraron vehículos para esta clase.</p>
          )}
          {vehicles?.map((v, i) => (
            <div className="vehicle-card" key={v.id ?? i}>
              <div className="vehicle-icon">🚗</div>
              <div className="vehicle-info">
                <h3>{v.nombre ?? v.name ?? `Vehículo ${i + 1}`}</h3>
                <span className="vehicle-class">{v.clase ?? v.class ?? '—'}</span>
                {v.velocidad && (
                  <div className="vehicle-stat">
                    <span>Velocidad</span>
                    <div className="stat-bar">
                      <div className="stat-fill" style={{ width: `${Math.min(v.velocidad, 100)}%` }} />
                    </div>
                    <span>{v.velocidad}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
