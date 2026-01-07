import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.scss';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!email || !password) return 'Please enter email and password';
    // simple email regex
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'Please enter a valid email address';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);
    try {
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 3000);
      // TODO: wire to real backend. Placeholder POST
    //   const res = await fetch('/api/admin/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   res={ok:true} // remove this line when backend is ready
    //   if (!res.ok) throw new Error('Invalid email or password');
      // on success - optionally save token if remember
      // const { token } = await res.json();
      // token handling should be implemented by backend wiring
    //   navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page admin-login">
      <div className="login-outer">
        <div className="admin-card login-card">
          <div className="brand">
            <div className="logo">OC</div>
            <div className="brand-text">
              <h3>Online Campus Exam</h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="admin-form login-form">
            <div className="field">
              <label>Email</label>
              <div className="input-with-icon">
                <span className="icon">@</span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-with-icon">
                <span className="icon">🔒</span>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
              </div>
            </div>

            
            {error && <div className="admin-error">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
