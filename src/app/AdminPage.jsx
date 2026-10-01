import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { securityService } from '../utils/securityService';
import './AdminPage.css';

// Admin Passcode Hashes for "dkagh1379" and "dkagh1379)"
const ADMIN_HASH_1 = "27ed6f3f98ed92edaade0ef482aee7cf13b16d68d38ab4a975d687412410300a";
const ADMIN_HASH_2 = "d0e53315da98db3a8d0eea56db8ef802833c4108ffeca3387950aab8b9cf8d57";
const ADMIN_AUTH_KEY = "seung_admin_auth_v2";

export default function AdminPage() {
  const [isAdminAuthed, setIsAdminAuthed] = useState(false);
  const [adminInput, setAdminInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showAdminPw, setShowAdminPw] = useState(false);

  // Content security config state
  const [config, setConfig] = useState(securityService.getConfig());
  const [newCodeInput, setNewCodeInput] = useState(config.defaultCode || 'SNU1002');
  const [noticeMsg, setNoticeMsg] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_AUTH_KEY) === 'granted') {
      setIsAdminAuthed(true);
      loadConfig();
    }
  }, []);

  const loadConfig = () => {
    const current = securityService.getConfig();
    setConfig(current);
    if (current.defaultCode) {
      setNewCodeInput(current.defaultCode);
    }
  };

  const handleAdminLogin = async (e) => {
    if (e) e.preventDefault();
    const clean = adminInput.trim();
    if (!clean) {
      setAdminError('관리자 마스터 암호를 입력해 주세요.');
      return;
    }
    const hash = await securityService.verifyContentCode(clean); // fallback
    const isMaster = clean === 'dkagh1379' || clean === 'dkagh1379)';

    if (isMaster) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'granted');
      setIsAdminAuthed(true);
      setAdminError('');
      loadConfig();
    } else {
      setAdminError('관리자 암호가 올바르지 않습니다.');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAdminAuthed(false);
    setAdminInput('');
    setAdminError('');
  };

  // Toggle Content Lock
  const handleToggleLock = async () => {
    const nextLocked = !config.isLocked;
    const updated = await securityService.setContentLockMode(nextLocked, newCodeInput);
    setConfig(updated);
    setNoticeMsg(
      nextLocked
        ? '🔒 [콘텐츠 잠금 모드]로 설정되었습니다. 첫 화면 포털은 공개되며, 콘텐츠 입장 시 인증 코드를 요구합니다.'
        : '🔓 [콘텐츠 전체 공개 모드]로 설정되었습니다. 누구나 실습 콘텐츠에 자유롭게 입장할 수 있습니다.'
    );
    setTimeout(() => setNoticeMsg(''), 4000);
  };

  // Save Custom Code
  const handleSaveCode = async (e) => {
    if (e) e.preventDefault();
    const clean = newCodeInput.trim().toUpperCase();
    if (!clean) {
      setNoticeMsg('⚠️ 인증 코드를 비워둘 수 없습니다.');
      return;
    }
    const updated = await securityService.setContentLockMode(config.isLocked, clean);
    setConfig(updated);
    setNoticeMsg(`✅ 인증 코드가 [${clean}] (으)로 변경 및 저장되었습니다.`);
    setTimeout(() => setNoticeMsg(''), 4000);
  };

  // Reset visitor authentication for quick testing
  const handleResetVisitorAuth = () => {
    securityService.revokeContentAuth();
    setNoticeMsg('🔄 현재 브라우저의 방문자 인증 세션이 초기화되었습니다. 포털에서 잠금 모드를 바로 테스트하실 수 있습니다.');
    setTimeout(() => setNoticeMsg(''), 4000);
  };

  // Login Gate
  if (!isAdminAuthed) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-lock-icon">⚙️</div>
          <span className="admin-badge">SEUNG AI LABS ADMIN</span>
          <h1 className="admin-title">관리자 콘솔 인증</h1>
          <p className="admin-desc">
            포털의 콘텐츠 보안 및 연수 운영 설정을 관리하는 전용 콘솔입니다.<br />
            관리자 마스터 암호를 입력해 주세요.
          </p>

          <form onSubmit={handleAdminLogin} className="admin-form">
            <div className="admin-input-wrapper">
              <input
                type={showAdminPw ? 'text' : 'password'}
                value={adminInput}
                onChange={(e) => setAdminInput(e.target.value)}
                placeholder="관리자 마스터 암호 입력"
                autoFocus
                className="admin-input"
              />
              <button
                type="button"
                className="admin-pw-toggle"
                onClick={() => setShowAdminPw(!showAdminPw)}
                title={showAdminPw ? '암호 숨기기' : '암호 보기'}
              >
                {showAdminPw ? '👁️' : '🔒'}
              </button>
            </div>

            {adminError && (
              <div className="admin-error-text">
                ⚠️ {adminError}
              </div>
            )}

            <button type="submit" className="admin-login-btn">
              관리자 콘솔 입장 →
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <Link to="/" className="admin-back-portal-link">
              ← 통합 포털 첫 화면으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <div className="admin-header-left">
          <span className="admin-pill">ADMIN CONSOLE</span>
          <h2>Seung AI Labs 통합 관리자 콘솔</h2>
          <p>첫 화면(포털)은 상시 공개되며, 세부 실습 콘텐츠의 잠금 여부 및 인증 코드를 제어합니다.</p>
        </div>
        <div className="admin-header-right">
          <Link to="/" className="admin-btn-secondary">
            🏠 통합 포털 바로가기
          </Link>
          <button onClick={handleAdminLogout} className="admin-btn-logout">
            로그아웃
          </button>
        </div>
      </header>

      {noticeMsg && (
        <div className="admin-toast-banner" role="status">
          {noticeMsg}
        </div>
      )}

      <main className="admin-main-grid">
        {/* Card 1: Content Security Mode Toggle */}
        <section className="admin-card">
          <div className="admin-card-head">
            <span className="admin-card-icon">🔒</span>
            <div>
              <h3>실습 콘텐츠 잠금 제어</h3>
              <p>첫 화면 포털은 언제나 공개되며, 세부 실습 콘텐츠 입장 시에만 인증 코드를 요구합니다.</p>
            </div>
          </div>

          <div className={`admin-status-banner ${config.isLocked ? 'status-locked' : 'status-open'}`}>
            <div className="status-indicator">
              <span className={`status-dot ${config.isLocked ? 'dot-red' : 'dot-green'}`} />
              <strong>
                {config.isLocked
                  ? '🔒 현재 상태: [콘텐츠 잠금 모드] 활성화'
                  : '🔓 현재 상태: [콘텐츠 전체 공개 모드] 활성화'}
              </strong>
            </div>
            <p className="status-sub">
              {config.isLocked
                ? '방문자가 포털에서 리터러시 실험실, 융합 허브, 매거진 입장 클릭 시 인증 코드를 요구합니다.'
                : '비밀번호 없이 누구나 포털의 모든 실습 도구와 매거진에 자유롭게 입장할 수 있습니다.'}
            </p>
          </div>

          <div className="admin-toggle-box">
            <label className="admin-toggle-label">모드 즉시 전환:</label>
            <button
              onClick={handleToggleLock}
              className={`admin-toggle-switch-btn ${config.isLocked ? 'btn-make-open' : 'btn-make-locked'}`}
            >
              {config.isLocked ? '🔓 [전체 공개 모드]로 전환하기' : '🔒 [콘텐츠 잠금 모드]로 전환하기'}
            </button>
          </div>

          <form onSubmit={handleSaveCode} className="admin-passcode-field">
            <label className="admin-input-label">방문자/학생용 인증 코드 설정:</label>
            <div className="admin-code-row">
              <input
                type="text"
                value={newCodeInput}
                onChange={(e) => setNewCodeInput(e.target.value.toUpperCase())}
                placeholder="예: SNU1002"
                className="admin-code-input"
              />
              <button type="submit" className="admin-code-save-btn">
                코드 저장
              </button>
            </div>
            <span className="admin-code-hint">
              ※ 현재 설정된 코드: <strong>{config.defaultCode || 'SNU1002'}</strong> (대소문자 구분 없음)
            </span>
          </form>

          <div className="admin-test-tool-box">
            <button
              type="button"
              onClick={handleResetVisitorAuth}
              className="admin-reset-test-btn"
            >
              🧪 방문자 인증 세션 초기화 (잠금 모드 테스트용)
            </button>
            <span className="admin-test-hint">
              인증을 해제하고 포털 메인으로 가시면 잠금 팝업이 뜨는 과정을 바로 체험해보실 수 있습니다.
            </span>
          </div>
        </section>

        {/* Card 2: Quick Links & Services */}
        <section className="admin-card">
          <div className="admin-card-head">
            <span className="admin-card-icon">📊</span>
            <div>
              <h3>플랫폼 콘텐츠 바로가기</h3>
              <p>각 세부 교육 서비스 바로 연결</p>
            </div>
          </div>

          <div className="admin-service-list">
            <div className="admin-service-item">
              <div className="admin-service-info">
                <span className="service-emoji">🧠</span>
                <div>
                  <strong>금쪽이 AI 리터러시 실험실</strong>
                  <span>4개 인터랙티브 시뮬레이션 모듈 (공정성·팩트체크·역할·안전)</span>
                </div>
              </div>
              <Link to="/literacy" className="admin-service-btn">
                열기 →
              </Link>
            </div>

            <div className="admin-service-item">
              <div className="admin-service-info">
                <span className="service-emoji">🐕</span>
                <div>
                  <strong>에듀테크 융합교육 허브</strong>
                  <span>로보독 강화학습(RL), 질문 전후 비교, 통학 데이터 탐구 v2</span>
                </div>
              </div>
              <a href="./hub/index.html" className="admin-service-btn">
                열기 →
              </a>
            </div>

            <div className="admin-service-item">
              <div className="admin-service-info">
                <span className="service-emoji">📎</span>
                <div>
                  <strong>연재 매거진 덱 (Vol. 01)</strong>
                  <span>The Agentic Shift · 코코아팹 사업부 에디토리얼 프레젠테이션</span>
                </div>
              </div>
              <a href="./deck/index.html" className="admin-service-btn">
                열기 →
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
