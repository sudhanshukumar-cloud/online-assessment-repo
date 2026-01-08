import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './admin.scss';

export default function Monitor() {
  const { testId } = useParams();
  const [students] = useState([
    { id: 's1', name: 'Rahul Sharma', email: 'rah***@gmail.com', status: 'IN_PROGRESS', currentQuestion: 12, suspicious: false },
    { id: 's2', name: 'Anita Verma', email: 'ani***@yahoo.com', status: 'SUBMITTED', currentQuestion: 40, suspicious: true },
  ]);

  const terminate = (id) => {
    // TODO: call backend to terminate session
    alert('Terminated session for ' + id);
  };

  const activeCount = students.filter(s => s.status === 'IN_PROGRESS').length;
  const completedCount = students.filter(s => s.status === 'SUBMITTED').length;

  return (
    <div className="admin-page admin-monitor">
      <h2>Live Test Monitor - Test {testId}</h2>
      <div className="admin-stats">
        <div className="stat">Active Students<br/><strong>{activeCount}</strong></div>
        <div className="stat">Completed<br/><strong>{completedCount}</strong></div>
      </div>

      <section className="admin-section">
        <h3>Students</h3>
        <ul className="student-list">
          {students.map(s => (
            <li key={s.id} className={`student-item ${s.suspicious ? 'suspicious' : ''}`}>
              <div>
                <strong>{s.name}</strong>
                <div className="muted">{s.email} • Q: {s.currentQuestion} • {s.status}</div>
              </div>
              <div className="actions">
                {s.suspicious && <span className="flag">Suspicious</span>}
                <button className="btn-secondary" onClick={() => terminate(s.id)}>Terminate Session</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
