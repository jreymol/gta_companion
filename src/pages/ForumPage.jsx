import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ForumPage.css';

const API_BASE = 'https://4f8ebe37-e7e2-45bf-8b41-4a5747219b85.mock.pstmn.io';

const INITIAL_POSTS = [
  { id: 1, usuario: 'BigSmoke', tema: 'Historia', mensaje: 'El orden de las misiones de Smoke es insuperable.', fecha: '2024-01-10' },
  { id: 2, usuario: 'Ryder', tema: 'Trucos', mensaje: 'HESOYAM da vida completa más dinero. Indispensable.', fecha: '2024-01-12' },
  { id: 3, usuario: 'SweetJohnson', tema: 'Grove Street', mensaje: 'Grove Street for life. Nunca olvidéis de dónde venimos.', fecha: '2024-01-14' },
];

export default function ForumPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [form, setForm] = useState({ tema: '', mensaje: '' });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.tema.trim() || !form.mensaje.trim()) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE}/community/forum`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: user.username, ...form }),
      });
      const result = await response.json();

      setPosts((prev) => [
        {
          id: Date.now(),
          usuario: user.username,
          tema: form.tema,
          mensaje: form.mensaje,
          fecha: new Date().toISOString().split('T')[0],
        },
        ...prev,
      ]);
      setForm({ tema: '', mensaje: '' });
      setStatus({ ok: true, text: result.mensaje ?? 'Post publicado correctamente.' });
    } catch {
      setStatus({ ok: false, text: 'Error al publicar el post.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="forum-page">
      <div className="page-header">
        <h1>Foro de la Comunidad</h1>
        <p>Comparte trucos, noticias y estrategias de San Andreas</p>
      </div>

      <div className="forum-layout">
        <section className="forum-posts">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <div className="post-avatar">{post.usuario.charAt(0)}</div>
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-user">{post.usuario}</span>
                  <span className="post-topic">{post.tema}</span>
                  <span className="post-date">{post.fecha}</span>
                </div>
                <p className="post-message">{post.mensaje}</p>
              </div>
            </div>
          ))}
        </section>

        <aside className="forum-form-panel">
          <h2>Nuevo Post</h2>
          <form onSubmit={handleSubmit} className="forum-form">
            <div className="form-group">
              <label>Usuario</label>
              <input type="text" value={user?.username ?? ''} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="tema">Tema</label>
              <input
                id="tema"
                name="tema"
                type="text"
                value={form.tema}
                onChange={handleChange}
                placeholder="Ej: Trucos, Historia..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje..."
                rows={4}
                required
              />
            </div>

            {status && (
              <p className={`form-status ${status.ok ? 'ok' : 'err'}`}>{status.text}</p>
            )}

            <button type="submit" className="forum-submit" disabled={submitting}>
              {submitting ? 'Publicando...' : 'Publicar'}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
