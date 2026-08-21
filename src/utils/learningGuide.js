export const GUIDE_EVENT_NAME = 'ai-literacy:show-guide';

export function announceLearningGuide(message) {
  if (typeof window === 'undefined' || !message) return;
  window.dispatchEvent(new CustomEvent(GUIDE_EVENT_NAME, { detail: { message } }));
}
