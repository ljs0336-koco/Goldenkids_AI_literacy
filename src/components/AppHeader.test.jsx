import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import AppHeader from './AppHeader';
import LearningGuideToast from './LearningGuideToast';
import { announceLearningGuide } from '../utils/learningGuide';

describe('학생 공통 길찾기 도구', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = '#/fairness';
  });

  afterEach(() => window.localStorage.clear());

  it('전체 초기화 전에 확인하고 앱 기록만 지운 뒤 홈으로 돌아간다', () => {
    window.localStorage.setItem('ai-literacy-lab:v5', '{"mode":"growth"}');
    window.localStorage.setItem('ai-literacy-lab-verification:v1', '{"mode":"claim"}');
    window.localStorage.setItem('unrelated-setting', 'keep');

    render(<AppHeader title="테스트 활동" studentMode />);
    fireEvent.click(screen.getByRole('button', { name: '모든 활동 기록 초기화' }));
    expect(screen.getByRole('dialog', { name: '모든 활동을 처음부터 다시 할까요?' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '전체 기록 지우기' }));
    expect(window.localStorage.getItem('ai-literacy-lab:v5')).toBeNull();
    expect(window.localStorage.getItem('ai-literacy-lab-verification:v1')).toBeNull();
    expect(window.localStorage.getItem('unrelated-setting')).toBe('keep');
    expect(window.location.hash).toBe('#/');
  });

  it('화면 안내를 띄우고 페이지 안의 새 행동 안내로 갱신한다', () => {
    render(<LearningGuideToast message="가운데 소개를 읽고 다음 버튼을 누르세요." />);
    expect(screen.getByRole('status')).toHaveTextContent('가운데 소개를 읽고 다음 버튼을 누르세요.');

    act(() => announceLearningGuide('다음 내용이 열렸어요. 선택 카드를 누르세요.'));
    expect(screen.getByRole('status')).toHaveTextContent('다음 내용이 열렸어요. 선택 카드를 누르세요.');

    fireEvent.click(screen.getByRole('button', { name: '안내 닫기' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
