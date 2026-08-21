import React, { useEffect, useState } from 'react';
import { GUIDE_EVENT_NAME } from '../utils/learningGuide';

export default function LearningGuideToast({ message }) {
  const [guide, setGuide] = useState(() => message ? { id: 'screen', message } : null);

  useEffect(() => {
    const handleGuide = event => {
      if (!event.detail?.message) return;
      setGuide({ id: Date.now(), message: event.detail.message });
    };
    window.addEventListener(GUIDE_EVENT_NAME, handleGuide);
    return () => window.removeEventListener(GUIDE_EVENT_NAME, handleGuide);
  }, []);

  useEffect(() => {
    if (!guide) return undefined;
    const timer = window.setTimeout(() => setGuide(null), 7000);
    return () => window.clearTimeout(timer);
  }, [guide]);

  if (!guide) return null;

  return (
    <aside className="learning-guide-toast no-print" role="status" aria-live="polite" aria-atomic="true">
      <span className="learning-guide-toast-icon" aria-hidden="true">☝</span>
      <div>
        <strong>지금 해볼 일</strong>
        <p>{guide.message}</p>
      </div>
      <button type="button" onClick={() => setGuide(null)} aria-label="안내 닫기">×</button>
    </aside>
  );
}
