import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

// Admin Passcode Hashes for "dkagh1379" and "dkagh1379)"
const ADMIN_HASH_1 = "27ed6f3f98ed92edaade0ef482aee7cf13b16d68d38ab4a975d687412410300a";
const ADMIN_HASH_2 = "d0e53315da98db3a8d0eea56db8ef802833c4108ffeca3387950aab8b9cf8d57";
const ADMIN_AUTH_KEY = "seung_admin_auth_v1";

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

export default function AdminPage() {
  const [isAdminAuthed, setIsAdminAuthed] = useState(false);
  const [adminInput, setAdminInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showAdminPw, setShowAdminPw] = useState(false);

  // Config states
  const [config, setConfig] = useState({
    isLocked: false,
    mode: 'public',
    defaultCode: 'SNU1002',
    targetHash: '056e80685d351592864b35ce2e7af49cddc202409d907046173565445b780387',
    updatedAt: ''
  });
  const [newCodeInput, setNewCodeInput] = useState('SNU1002');
  const [githubPat, setGithubPat] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_AUTH_KEY) === 'granted') {
      setIsAdminAuthed(true);
      fetchConfig();
    }
  }, []);

  const fetchConfig = () => {
    fetch('./security-config.json?_t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        if (data) {
          setConfig(data);
          if (data.defaultCode) setNewCodeInput(data.defaultCode);
        }
      })
      .catch(err => console.log('Could not load config', err));
  };

  const handleAdminLogin = async (e) => {
    if (e) e.preventDefault();
    const clean = adminInput.trim();
    if (!clean) {
      setAdminError('관리자 암호를 입력해 주세요.');
      return;
    }
    const hash = await computeSHA256(clean);
    const isValid = hash === ADMIN_HASH_1 || hash === ADMIN_HASH_2 || clean === 'dkagh1379' || clean === 'dkagh1379)';

    if (isValid) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'granted');
      setIsAdminAuthed(true);
      setAdminError('');
      fetchConfig();
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

  const handleToggleLock = () => {
    const nextLocked = !config.isLocked;
    setConfig(prev => ({
      ...prev,
      isLocked: nextLocked,
      mode: nextLocked ? 'private' : 'public'
    }));
  };

  const handleSaveWithGitHub = async () => {
    if (!githubPat.trim()) {
      setSaveStatus('⚠️ GitHub Personal Access Token(PAT)을 입력해야 원격 저장소에 즉시 커밋됩니다.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('저장소 설정 파일 커밋 중...');

    try {
      const codeToUse = newCodeInput.trim().toUpperCase() || 'SNU1002';
      const codeHash = await computeSHA256(codeToUse);

      const updatedConfig = {
        isLocked: config.isLocked,
        mode: config.isLocked ? 'private' : 'public',
        defaultCode: codeToUse,
        targetHash: codeHash,
        updatedAt: new Date().toISOString()
      };

      const path = 'public/security-config.json';
      const url = `https://api.github.com/repos/ljs0336-koco/Seung_AI_Labs/contents/${path}`;

      // Get current file sha
      const getRes = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${githubPat.trim()}`,
          'Accept': 'application/vnd.github+json'
        }
      });
      const getData = await getRes.json();
      const fileSha = getData.sha;

      // Update file
      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(updatedConfig, null, 2))));
      const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubPat.trim()}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `chore: update access security mode to ${updatedConfig.mode} via Admin Console`,
          content: contentBase64,
          sha: fileSha
        })
      });

      if (putRes.ok) {
        setSaveStatus('✅ 성공적으로 GitHub 저장소에 반영되었습니다! 약 30초 후 전체 방문자에게 자동 적용됩니다.');
        setConfig(updatedConfig);
      } else {
        const errJson = await putRes.json();
        setSaveStatus(`❌ GitHub API 오류: ${errJson.message || '토큰 권한을 확인해 주세요.'}`);
      }
    } catch (e) {
      setSaveStatus(`❌ 저장 오류 발생: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadConfig = () => {
    const updatedConfig = {
      isLocked: config.isLocked,
      mode: config.isLocked ? 'private' : 'public',
      defaultCode: newCodeInput.trim().toUpperCase() || 'SNU1002',
      updatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(updatedConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // If not logged in as Admin, show Admin Login Screen
  if (!isAdminAuthed) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          <div className="admin-badge">
            <span>🛡️ SEUNG AI LABS ADMIN</span>
          </div>
          <h1 className="admin-title">관리자 콘솔 접속</h1>
          <p className="admin-desc">
            사이트 접근 권한 및 보안 설정을 제어하려면<br />
            <strong>관리자 마스터 코드</strong>를 입력해 주세요.
          </p>

          <form onSubmit={handleAdminLogin} className="admin-form">
            <div className="admin-input-wrapper">
              <input
                type={showAdminPw ? 'text' : 'password'}
                value={adminInput}
                onChange={(e) => setAdminInput(e.target.value)}
                placeholder="관리자 마스터 코드 입력"
                autoFocus
                className="admin-input"
              />
              <button
                type="button"
                className="admin-pw-toggle"
                onClick={() => setShowAdminPw(!showAdminPw)}
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
              ← 통합 포털로 돌아가기
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
          <p>플랫폼 전체의 공개 상태와 방문자 접근 인증 코드를 실시간으로 제어합니다.</p>
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

      <main className="admin-main-grid">
        {/* Card 1: Security Mode Toggle */}
        <section className="admin-card">
          <div className="admin-card-head">
            <span className="admin-card-icon">🔐</span>
            <div>
              <h3>사이트 접근 보안 모드</h3>
              <p>방문자에게 인증 코드를 요구할지, 전체 공개로 개방할지 설정합니다.</p>
            </div>
          </div>

          <div className={`admin-status-banner ${config.isLocked ? 'status-locked' : 'status-open'}`}>
            <div className="status-indicator">
              <span className={`status-dot ${config.isLocked ? 'dot-red' : 'dot-green'}`} />
              <strong>
                {config.isLocked ? '🔒 현재 상태: 보안 잠금 모드 (인증 코드 필요)' : '🔓 현재 상태: 전체 공개 모드 (자유 접속)'}
              </strong>
            </div>
            <p className="status-sub">
              {config.isLocked
                ? '모든 방문자 및 하위 웹앱 접근 시 지정된 인증 코드(SNU1002 등)를 필수로 요구합니다.'
                : '비밀번호 입력 없이 누구나 메인 포털 및 모든 실습 도구에 즉시 입장할 수 있습니다.'}
            </p>
          </div>

          <div className="admin-toggle-box">
            <label className="admin-toggle-label">모드 변경 스위치:</label>
            <button
              onClick={handleToggleLock}
              className={`admin-toggle-switch-btn ${config.isLocked ? 'btn-make-open' : 'btn-make-locked'}`}
            >
              {config.isLocked ? '🔓 [전체 공개 모드]로 전환하기' : '🔒 [보안 잠금 모드]로 전환하기'}
            </button>
          </div>

          <div className="admin-passcode-field">
            <label className="admin-input-label">방문자용 인증 코드 설정:</label>
            <div className="admin-code-row">
              <input
                type="text"
                value={newCodeInput}
                onChange={(e) => setNewCodeInput(e.target.value.toUpperCase())}
                placeholder="예: SNU1002"
                className="admin-code-input"
              />
              <span className="admin-code-hint">※ 방문자가 잠금 화면에서 입력할 코드</span>
            </div>
          </div>

          {/* Apply Instructions */}
          <div className="admin-apply-section">
            <h4>💡 변경 사항 원격 저장소 반영 방법 (2가지)</h4>
            
            <div className="admin-apply-option">
              <strong>방법 1. GitHub API로 즉시 반영 (원클릭)</strong>
              <p>GitHub Personal Access Token(repo 권한)을 입력하고 버튼을 누르면 저장소 파일이 즉시 갱신됩니다.</p>
              <div className="admin-pat-row">
                <input
                  type="password"
                  value={githubPat}
                  onChange={(e) => setGithubPat(e.target.value)}
                  placeholder="GitHub PAT (ghp_...)"
                  className="admin-pat-input"
                />
                <button
                  onClick={handleSaveWithGitHub}
                  disabled={isSaving}
                  className="admin-pat-submit-btn"
                >
                  {isSaving ? '저장 중...' : '저장소에 즉시 반영'}
                </button>
              </div>
              {saveStatus && <div className="admin-save-status">{saveStatus}</div>}
            </div>

            <div className="admin-apply-option">
              <strong>방법 2. AI 어시스턴트(Antigravity) 채팅창에 말씀하기 (추천)</strong>
              <p>토큰 없이도 채팅창에 <strong>"지금 사이트 잠궈줘"</strong> 또는 <strong>"다시 열어줘"</strong>라고 한마디만 하시면 제가 10초 만에 코드를 갱신하여 자동 배포해 드립니다!</p>
            </div>
          </div>
        </section>

        {/* Card 2: Quick Links & Monitoring */}
        <section className="admin-card">
          <div className="admin-card-head">
            <span className="admin-card-icon">📊</span>
            <div>
              <h3>연동 플랫폼 및 서비스</h3>
              <p>Seung AI Labs 산하 3대 교육 서비스 바로가기</p>
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
                <span className="service-emoji">📑</span>
                <div>
                  <strong>에이전틱 AI 인사이트 덱</strong>
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
