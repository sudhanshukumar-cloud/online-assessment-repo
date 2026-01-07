import React from 'react';
import { Link } from 'react-router-dom';
import './admin.scss';

export default function AdminDashboard() {
  // Placeholder data; replace with real API calls
  const stats = [
    { label: 'Total Tests', value: 12, icon: '📋', color: 'blue' },
    { label: 'Active Links', value: 3, icon: '🔗', color: 'green' },
    { label: 'Total Attempts', value: 248, icon: '✍️', color: 'purple' },
  ];
  
  const tests = [
    { id: 't1', name: 'Aptitude Test - Batch A', questions: 40, status: 'Active', students: 45, lastUpdated: '2 days ago' },
    { id: 't2', name: 'DS & Algo Hiring Test', questions: 50, status: 'Active', students: 32, lastUpdated: '1 week ago' },
    { id: 't3', name: 'General Knowledge Quiz', questions: 25, status: 'Inactive', students: 18, lastUpdated: '3 weeks ago' },
  ];

  return (
    <div className="admin-page admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, Admin! 👋</h1>
          <p>Here's your test management overview</p>
        </div>
        <Link to="/admin/tests/create" className="btn-primary btn-create">
          ✨ Create New Test
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className="stat-bg" />
          </div>
        ))}
      </div>

      <section className="dashboard-card">
        <div className="card-header">
          <h2>📋 Your Tests</h2>
        </div>
        <ul className="test-list">
          {tests.map(t => (
            <li key={t.id} className="test-item">
              <div className="test-info">
                <div className="test-header">
                  <strong className="test-name">{t.name}</strong>
                  <span className={`status-badge status-${t.status.toLowerCase()}`}>{t.status}</span>
                </div>
                <div className="test-meta">
                  <span>📝 {t.questions} questions</span>
                  <span>👥 {t.students} students</span>
                  <span>⏰ {t.lastUpdated}</span>
                </div>
              </div>
              <div className="test-actions">
                <Link to={`/admin/tests/${t.id}/links`} className="btn-small">🔗 Links</Link>
                <Link to={`/admin/tests/${t.id}/monitor`} className="btn-small">👁️ Monitor</Link>
                <Link to={`/admin/tests/${t.id}/results`} className="btn-small">📊 Results</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
