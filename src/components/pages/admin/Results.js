import React from 'react';
import { useParams } from 'react-router-dom';
import './admin.scss';

export default function Results() {
  const { testId } = useParams();
  const results = [
    { rank: 1, name: 'Rahul Sharma', email: 'rah***@gmail.com', college: 'ABC College', score: '85/100', percentage: '85%' },
    { rank: 2, name: 'Anita Verma', email: 'ani***@yahoo.com', college: 'XYZ Institute', score: '78/100', percentage: '78%' },
  ];

  const download = (type) => {
    // TODO: request real file from backend
    alert('Downloading ' + type + ' for test ' + testId);
  };

  return (
    <div className="admin-page admin-results">
      <h2>Results - Test {testId}</h2>
      <div className="form-actions">
        <button className="btn-secondary" onClick={() => download('summary')}>Download Summary Excel</button>
        <button className="btn-secondary" onClick={() => download('detailed')}>Download Detailed Excel</button>
      </div>

      <table className="results-table">
        <thead>
          <tr><th>Rank</th><th>Name</th><th>Email</th><th>College</th><th>Score</th><th>Percentage</th></tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.rank}>
              <td>{r.rank}</td>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.college}</td>
              <td>{r.score}</td>
              <td>{r.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
