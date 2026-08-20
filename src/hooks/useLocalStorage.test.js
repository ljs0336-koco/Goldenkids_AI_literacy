import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  
  afterEach(() => {
    window.localStorage.clear();
  });

  it('should return initial value if storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', { a: 1 }));
    expect(result.current[0]).toEqual({ a: 1 });
  });

  it('should return stored value if valid v1 data exists', () => {
    window.localStorage.setItem('test-key', JSON.stringify({ currentStep: 3, mode: 'audit' }));
    const { result } = renderHook(() => useLocalStorage('test-key', { currentStep: 0 }));
    expect(result.current[0]).toEqual({ currentStep: 3, mode: 'audit' });
  });

  it('should fallback to initial value if JSON is corrupted', () => {
    window.localStorage.setItem('test-key', '{invalid_json:]}');
    const { result } = renderHook(() => useLocalStorage('test-key', { fallback: true }));
    expect(result.current[0]).toEqual({ fallback: true });
  });

  it('should handle setting values and persist them', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', { a: 1 }));
    
    act(() => {
      result.current[1]({ a: 2, b: 3 });
    });

    expect(result.current[0]).toEqual({ a: 2, b: 3 });
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify({ a: 2, b: 3 }));
  });

  it('should handle functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', { count: 0 }));
    
    act(() => {
      result.current[1](prev => ({ count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 1 });
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify({ count: 1 }));
  });
});
