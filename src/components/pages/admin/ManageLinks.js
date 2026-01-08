import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './admin.scss';

export default function ManageLinks() {
  const { testId } = useParams();
  // placeholder links
  const [links, setLinks] = useState([
    { id: 'L1', code: 'ABC123XYZ', isActive: true },
    { id: 'L2', code: 'XYZ999AAA', isActive: false },
  ]);

  const toggle = (id) => {
    setLinks(ls => ls.map(l => l.id === id ? { ...l, isActive: !l.isActive } : l));
  };

  const copy = (code) => {
    const url = `${window.location.origin}/test/${code}`;
    if (navigator.clipboard) navigator.clipboard.writeText(url);
    alert('Copied: ' + url);
  };

  const genNew = () => {
    const newCode = Math.random().toString(36).slice(2, 10).toUpperCase();
    setLinks(ls => [{ id: `L${ls.length+1}`, code: newCode, isActive: true }, ...ls]);
  };

  return (
    <div className="admin-page admin-links">
      <h2>Manage Links - Test {testId}</h2>
      <div className="form-actions">
        <button className="btn-primary" onClick={genNew}>Generate New Link</button>
      </div>
      <ul className="links-list">
        {links.map(l => (
          <li key={l.id} className="link-item">
            <div>
              <strong>{l.code}</strong>
              <div className="muted">{l.isActive ? 'Active' : 'Inactive'}</div>
            </div>
            <div className="actions">
              <button className="btn-secondary" onClick={() => copy(l.code)}>Copy Link</button>
              <button className="btn-secondary" onClick={() => toggle(l.id)}>{l.isActive ? 'Deactivate' : 'Activate'}</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
