import { LitElement, html } from 'lit';
import { getText } from '/src/localization/localization.js';
import { Router } from '@vaadin/router';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '/src/components/language-selector/index.js';
import { styles } from './styles';

class NavMenu extends LitElement {
  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  disconnectedCallback() {
    window.removeEventListener('language-changed', () => this.requestUpdate());
    super.disconnectedCallback();
  }

  navigate(path) {
    Router.go(path);
  }

  isActive(path) {
    return window.location.pathname === path;
  }

  render() {
    return html`
      <nav>
        <div class="logo-container">
          <a href="/"><img class="logo" src="/src/assets/images/ing-logo.png" alt="ING Logo"></a>
          <p>ING</p>
        </div>
        <div class="nav-links">
          <a
            href="/employees"
            class="${this.isActive('/employees') ? 'active' : ''}"
            @click=${(e) => {
        e.preventDefault();
        this.navigate('/employees');
      }}
          >
            <iron-icon icon="icons:supervisor-account"></iron-icon>
            ${getText('nav.employees')}
          </a>
          <a
            href="/employees/add"
            class="${this.isActive('/employees/add') ? 'active' : ''}"
            @click=${(e) => {
        e.preventDefault();
        this.navigate('/employees/add');
      }}
          >
            <iron-icon icon="add"></iron-icon>
            ${getText('nav.addNew')}
          </a>
          <language-selector></language-selector>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-menu', NavMenu);