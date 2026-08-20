import React from 'react';

export default function ResultComparison({ oldResults, newResults, labelOld, labelNew }) {
  const getStatus = (candidate) => {
    const isOld = oldResults.some(r => r.id === candidate.id);
    const isNew = newResults.some(r => r.id === candidate.id);
    
    if (isOld && isNew) return { text: '그대로 추천', color: 'var(--color-primary)', icon: '✅' };
    if (!isOld && isNew) return { text: '새로 추천', color: 'var(--color-orange)', icon: '✨' };
    if (isOld && !isNew) return { text: '이번에는 제외', color: 'var(--color-text-muted)', icon: '📉' };
    return null;
  };

  const allInvolved = Array.from(new Set([...oldResults, ...newResults].map(r => r.id)))
    .map(id => [...oldResults, ...newResults].find(r => r.id === id))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort by name

  return (
    <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
      {/* 처음 결과 */}
      <div style={{ flex: '1 1 250px', backgroundColor: 'var(--color-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
        <h3 className="text-center mb-4" style={{ color: 'var(--color-text-muted)' }}>{labelOld}</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {oldResults.map((candidate) => (
            <li key={candidate.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span>• {candidate.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 다시 살펴본 결과 */}
      <div style={{ flex: '1 1 250px', backgroundColor: '#f0fdfa', padding: '16px', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)' }}>
        <h3 className="text-center mb-4" style={{ color: 'var(--color-primary-hover)' }}>{labelNew}</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allInvolved.map((candidate) => {
            const status = getStatus(candidate);
            if (!status || status.text === '이번에는 제외') return null; // Show only selected in the new box
            return (
              <li key={candidate.id} className="flex justify-between items-center" style={{ 
                padding: '8px 0', 
                borderBottom: '1px solid var(--color-primary)',
                color: status.color,
                fontWeight: 'bold'
              }}>
                <span>• {candidate.name}</span>
                <span style={{ fontSize: 'var(--font-size-sm)' }}>{status.icon} {status.text}</span>
              </li>
            );
          })}
        </ul>
        {/* 제외된 학생 표시 영역 */}
        {allInvolved.some(c => getStatus(c)?.text === '이번에는 제외') && (
          <div className="mt-4 pt-2" style={{ borderTop: '1px dashed var(--color-text-muted)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>제외된 친구:</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0 0' }}>
              {allInvolved.filter(c => getStatus(c)?.text === '이번에는 제외').map(c => (
                <li key={c.id} style={{ padding: '4px 0', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  <del>• {c.name}</del> (📉 이번에는 제외)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
