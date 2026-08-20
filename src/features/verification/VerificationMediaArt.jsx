import React from 'react';

export default function VerificationMediaArt({ mediaCase, className = '', decorative = false }) {
  if (!mediaCase) return null;

  return (
    <div className={`verification-media-art verification-media-art--${mediaCase.artPosition} ${className}`.trim()}>
      <img
        src={mediaCase.image}
        alt={decorative ? '' : `${mediaCase.title} 교육용 가상 사례 장면`}
        aria-hidden={decorative || undefined}
      />
    </div>
  );
}
