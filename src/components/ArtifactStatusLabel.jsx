import React from 'react';

export default function ArtifactStatusLabel({ mark = 'AI', source, status, tone = 'ai' }) {
  return (
    <div className={`artifact-status-label artifact-status-label--${tone}`} aria-label={`${source} · ${status}`}>
      <span className="artifact-status-label__source">
        <b aria-hidden="true">{mark}</b>
        <strong>{source}</strong>
      </span>
      <span className="artifact-status-label__state">{status}</span>
    </div>
  );
}
