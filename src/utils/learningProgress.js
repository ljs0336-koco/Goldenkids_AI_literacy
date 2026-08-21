export const LEARNING_STORAGE_KEYS = [
  'ai-literacy-lab:v1',
  'ai-literacy-lab:v2',
  'ai-literacy-lab:v3',
  'ai-literacy-lab:v4',
  'ai-literacy-lab:v5',
  'ai-literacy-lab-fairness:v5',
  'ai-literacy-lab-verification:v1',
  'ai-literacy-lab-role:v1',
  'ai-literacy-lab-role:v2',
  'ai-literacy-lab-agent:v1',
  'ai-literacy-lab-agent:v2'
];

export function resetAllLearningProgress(storage = window.localStorage) {
  LEARNING_STORAGE_KEYS.forEach(key => storage.removeItem(key));
}

export function goToLearningHome(location = window.location) {
  location.hash = '/';
}
