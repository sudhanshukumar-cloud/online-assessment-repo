import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.scss';

export default function CreateTest() {
  const [testName, setTestName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const validExts = ['.xlsx', '.xls'];
    const ext = f.name.substring(f.name.lastIndexOf('.')).toLowerCase();
    if (!validExts.includes(ext)) {
      setError('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }
    setExcelFile(f);
    setError(null);
  };

  const genPasscode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasscode(code);
  };

  const validate = () => {
    if (!testName.trim()) return 'Test name is required';
    if (testName.trim().length > 300) return 'Test name must not exceed 300 characters';
    if (!category) return 'Please select a category';
    if (!excelFile) return 'Please upload an Excel file with questions';
    if (!passcode.trim()) return 'Please enter or generate a passcode';
    if (passcode.length !== 8) return 'Passcode must be exactly 8 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);

    try {
      // TODO: wire to real backend with FormData for file upload
      // const formData = new FormData();
      // formData.append('testName', testName);
      // formData.append('category', category);
      // formData.append('description', description);
      // formData.append('instructions', instructions);
      // formData.append('excelFile', excelFile);
      // formData.append('passcode', passcode);
      // const res = await fetch('/api/admin/tests', { method: 'POST', body: formData });
      // if (!res.ok) throw new Error('Failed to create test');
      // const { testId } = await res.json();
      setSuccess(true);
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to create test');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page admin-create">
      <div className="create-header">
        <h2>✨ Create New Test</h2>
        <p>Set up your exam with all required information and questions</p>
      </div>

      <form onSubmit={handleSubmit} className="create-form card">
        {success && (
          <div className="success-banner">
            ✓ Test created successfully! Redirecting to dashboard...
          </div>
        )}

        <div className="form-section">
          <h3>Test Information</h3>
          <div className="form-row two-col">
            <div className="form-group">
              <label>Test Name *</label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                maxLength={300}
                placeholder="e.g., Aptitude Test - Batch A"
                disabled={loading}
              />
              <div className="char-count">{testName.length}/300</div>
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
              >
                <option value="">-- Select Category --</option>
                <option value="aptitude">🧠 Aptitude</option>
                <option value="technical">💻 Technical</option>
                <option value="coding">⚙️ Coding</option>
                <option value="general">📚 General Knowledge</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional: Brief description of the test (for admin only)"
              maxLength={500}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Instructions shown to students before the test starts..."
              maxLength={1000}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-divider" />

        <div className="form-section">
          <h3>Questions & Content</h3>
          <p>Upload an Excel file with all test questions and options</p>
          <div className="file-upload-area">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="excel-file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label htmlFor="excel-file" className="file-label">
                <span className="upload-icon">📊</span>
                <span className="upload-text">
                  {excelFile ? `✓ ${excelFile.name}` : 'Click to upload Excel file or drag & drop'}
                </span>
                <span className="upload-hint">Supported formats: .xlsx, .xls (Max 10MB)</span>
              </label>
            </div>
            {excelFile && (
              <div className="file-info">
                <strong>📁 Selected:</strong> {excelFile.name} • {(excelFile.size / 1024).toFixed(2)} KB
              </div>
            )}
          </div>
        </div>

        <div className="form-divider" />

        <div className="form-section">
          <h3>Access Passcode</h3>
          <p>8-character alphanumeric code for test access by students</p>
          <div className="form-group passcode-group">
            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.toUpperCase())}
              maxLength={8}
              placeholder="EXAM2024"
              disabled={loading}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={genPasscode}
              disabled={loading}
            >
              🔐 Generate
            </button>
          </div>
          {passcode && (
            <div className="passcode-display">
              🔑 Passcode: <strong>{passcode}</strong>
            </div>
          )}
        </div>

        {error && <div className="admin-error">⚠️ {error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Creating Test...' : '✨ Create Test'}
          </button>
        </div>
      </form>
    </div>
  );
}
