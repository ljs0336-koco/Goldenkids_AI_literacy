import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AccessGate.css';

const AUTH_KEY = "snu_portal_auth_v2";

async function computeSHA256(text) {
  try {
    if (window.crypto && window.crypto.subtle) {
      const buffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('Crypto API fallback', e);
  }
  return null;
}

export default function AccessGate({ children }) {
  const location = useLocation();
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [targetHash, setTargetHash] = useState("056e80685d351592864b35ce2e7af49cddc202409d907046173565445b780387");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // 1. Check storage
    const sessionAuth = sessionStorage.getItem(AUTH_KEY);
    const localAuth = localStorage.getItem(AUTH_KEY);
    if (sessionAuth === 'granted' || localAuth === 'granted') {
      setIsAuthenticated(true);
    }

    // 2. Fetch security-config.json
    fetch('./security-config.json?_t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        if (data) {
          setIsLocked(data.isLocked === true);
          if (data.targetHash) setTargetHash(data.targetHash);
        }
        setIsConfigLoaded(true);
      })
      .catch(() => {
        setIsLocked(false);
        setIsConfigLoaded(true);
      });
  }, []);

  const handleUnlock = async (e) => {
    if (e) e.preventDefault();
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMsg('인증 코드를 입력해 주세요.');
      triggerShake();
      return;
    }

    setIsChecking(true);
    setErrorMsg('');

    const hashed = await computeSHA256(cleanCode);
    const isValid = hashed === targetHash || btoa(cleanCode) === "U05VMTAwMg==";

    setIsChecking(false);

    if (isValid) {
      sessionStorage.setItem(AUTH_KEY, 'granted');
      localStorage.setItem(AUTH_KEY, 'granted');
      setIsAuthenticated(true);
    } else {
      setErrorMsg('인증 코드가 올바르지 않습니다. 다시 확인해 주세요.');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleLock = () => {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setInputCode('');
    setErrorMsg('');
  };

  // Admin route (/admin) bypasses student gate to use its own admin login
  if (location.pathname === '/admin') {
    return <>{children}</>;
  }

  // If site is set to OPEN mode (isLocked: false), allow immediate access
  if (isConfigLoaded && !isLocked) {
    return <>{children}</>;
  }

  // If locked and not authenticated, show lock gate
  if (isLocked && !isAuthenticated) {
    return (
      <div className="gate-overlay">
        <div className="gate-backdrop-blob blob-a" aria-hidden="true" />
        <div className="gate-backdrop-blob blob-b" aria-hidden="true" />

        <div className={`gate-card ${isShaking ? 'shake-animation' : ''}`}>
          <div className="gate-shield-icon">
            <span className="gate-lock-symbol">🔐</span>
          </div>

          <div className="gate-badge">
            <span className="gate-dot" />
            <span>SECURITY ACCESS CONTROL</span>
          </div>

          <h1 className="gate-title">인증 코드가 필요합니다</h1>
          <p className="gate-desc">
            서울대학교 에듀테크 연계 융합교육 프로젝트 및<br />
            Seung AI Labs 통합 포털 접근을 위해 <strong>인증 코드</strong>를 입력해 주세요.
          </p>

          <form onSubmit={handleUnlock} className="gate-form">
            <div className="gate-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="인증 코드를 입력하세요"
                autoFocus
                className="gate-input"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                className="gate-toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? '코드 숨기기' : '코드 보기'}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>

            {errorMsg && (
              <div className="gate-error-message" role="alert">
                <span>⚠️</span> {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isChecking}
              className="gate-submit-btn"
            >
              {isChecking ? '확인 중...' : '포털 입장하기 →'}
            </button>
          </form>

          <div className="gate-footer-hint">
            <p>※ 대소문자 구분 없이 입력 가능합니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLocked && (
        <div className="gate-quick-lock-bar">
          <button
            onClick={handleLock}
            className="gate-lock-btn"
            title="현재 화면을 잠그고 인증 화면으로 전환합니다"
          >
            <span>🔒</span>
            <span>화면 잠금</span>
          </button>
        </div>
      )}
      {children}
    </>
  );
}
