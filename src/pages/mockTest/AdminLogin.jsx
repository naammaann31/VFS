import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './mockTest.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@vectraforeignservices.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('vfs_token', data.token);
      localStorage.setItem('vfs_admin', JSON.stringify(data.user));

      navigate('/admin/mock-tests');
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mock-app-container" style={{ paddingTop: '100px' }}>
      <Navbar />

      <div style={{ maxWidth: '440px', width: '100%', margin: '4rem auto', padding: '0 1rem' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '2.5rem 2rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', background: '#FEF3C7', color: '#B45309', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
              🔒
            </div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.75rem', color: '#1C2B4B', marginBottom: '0.25rem' }}>
              Evaluator Login
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.88rem' }}>
              Access IELTS evaluations, grading queue & test management
            </p>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Admin Email
              </label>
              <input
                type="email"
                required
                className="fill-blank-input"
                style={{ maxWidth: '100%' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vectraforeignservices.com"
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Password
              </label>
              <input
                type="password"
                required
                className="fill-blank-input"
                style={{ maxWidth: '100%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                disabled={loading}
              />
              <div style={{ marginTop: '0.35rem', fontSize: '0.78rem', color: '#94A3B8' }}>
                Default demo password: <code>admin123</code>
              </div>
            </div>

            <button
              type="submit"
              className="btn-vfs btn-vfs-primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In to Admin Portal →'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
            <Link to="/mock-tests" style={{ fontSize: '0.88rem', color: '#64748B', textDecoration: 'none' }}>
              ← Return to Student Mock Tests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
