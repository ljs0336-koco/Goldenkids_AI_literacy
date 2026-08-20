import React from 'react';
import { dataSets } from '../fairnessData';

export default function DatasetScreen({ selectedDatasetId, onSelectDataset, onNext }) {
  return (
    <div className="card">
      <h2 className="text-center mb-4">어떤 기록을 보여줄까요?</h2>
      <p className="text-center mb-6" style={{ color: 'var(--color-text-muted)' }}>
        AI에게 보여 줄 기록을 골라주세요. 기록에 따라 AI가 추천하는 친구가 달라집니다.
      </p>

      <div className="flex gap-4 mb-6" style={{ flexWrap: 'wrap' }}>
        {Object.values(dataSets).map((ds) => {
          const isSelected = selectedDatasetId === ds.id;
          return (
            <div 
              key={ds.id} 
              className={`flex-1 p-4 ${isSelected ? 'selected' : ''}`}
              style={{
                border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? '#f0fdfa' : 'var(--color-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onClick={() => onSelectDataset(ds.id)}
              aria-pressed={isSelected}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectDataset(ds.id);
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 style={{ margin: 0, color: isSelected ? 'var(--color-primary-hover)' : 'inherit' }}>
                  {ds.id === 'past' ? '📄' : '📚'} {ds.title}
                </h3>
                {isSelected && <span aria-hidden="true" style={{ fontSize: '20px' }}>✅</span>}
              </div>
              
              <p className="mb-4" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                총 <strong>{ds.recordCount}건</strong>의 기록
              </p>

              <div className="mb-2">
                <strong style={{ fontSize: 'var(--font-size-sm)' }}>포함된 내용:</strong>
                <ul style={{ paddingLeft: '20px', fontSize: 'var(--font-size-sm)', margin: '4px 0' }}>
                  {ds.includes.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              
              <div>
                <strong style={{ fontSize: 'var(--font-size-sm)' }}>빠진 내용:</strong>
                <ul style={{ paddingLeft: '20px', fontSize: 'var(--font-size-sm)', margin: '4px 0', color: 'var(--color-warning)' }}>
                  {ds.excludes.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              
              {isSelected && (
                <div style={{ position: 'absolute', top: '-12px', right: '16px', backgroundColor: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                  선택됨
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!selectedDatasetId}
        >
          이 기록으로 AI 추천 받기
        </button>
      </div>
    </div>
  );
}
