import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import WorksheetModal from './WorksheetModal';

function ModalHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>활동지 열기</button>
      <WorksheetModal isOpen={open} onClose={() => setOpen(false)} onPrint={vi.fn()} title="검증 활동지">
        <p>미리보기 본문</p>
      </WorksheetModal>
    </>
  );
}

describe('WorksheetModal', () => {
  it('대화상자 의미와 초점 이동·복원을 제공하고 Escape로 닫힌다', () => {
    render(<ModalHarness />);
    const opener = screen.getByRole('button', { name: '활동지 열기' });
    opener.focus();
    fireEvent.click(opener);
    expect(screen.getByRole('dialog', { name: '검증 활동지' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '활동지 미리보기 닫기' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });
});
