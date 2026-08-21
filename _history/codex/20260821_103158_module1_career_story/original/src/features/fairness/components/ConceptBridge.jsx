import React from 'react';

export default function ConceptBridge({ children }) {
  return (
    <aside className="fair-concept-bridge">
      <strong>이게 왜 AI 리터러시일까요?</strong>
      <p>{children}</p>
    </aside>
  );
}
