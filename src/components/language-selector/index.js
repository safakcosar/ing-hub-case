// src/components/language-selector.js
import { LitElement, html } from 'lit';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import { styles } from './styles';

class LanguageSelector extends LitElement {
  static styles = styles;

  static properties = {
    currentLang: { type: String },
  };

  constructor() {
    super();
    this.currentLang = document.documentElement.lang || 'en';
  }

  changeLanguage(lang) {
    document.documentElement.lang = lang;
    this.currentLang = lang;
    window.dispatchEvent(new CustomEvent('language-changed', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="selector">
        <iron-icon icon="language"></iron-icon>
        <div class="options">
          <span
            class="option ${this.currentLang === 'en' ? 'active' : ''}"
            @click=${() => this.changeLanguage('en')}
          >
            EN
          </span>
          <span
            class="option ${this.currentLang === 'tr' ? 'active' : ''}"
            @click=${() => this.changeLanguage('tr')}
          >
            TR
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define('language-selector', LanguageSelector);