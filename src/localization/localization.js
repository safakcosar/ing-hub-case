import en from './en.js';
import tr from './tr.js';

const translations = { en, tr };

export function getText(key, params = {}) {
  const currentLang = document.documentElement.lang || 'en';
  let text = translations[currentLang][key] || key;
  for (const [param, value] of Object.entries(params)) {
    text = text.replace(`{${param}}`, value);
  }
  return text;
}