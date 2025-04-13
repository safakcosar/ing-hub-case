import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import '/src/components/nav-menu/index.js';
import '/src/components/employee-list/index.js';
import '/src/components/employee-form/index.js';

class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Albert Sans', 'Jost', 'Roboto', sans-serif;
    }
    main {
      margin: 0;
      padding: 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', () => {
      this.requestUpdate();
      const outlet = this.shadowRoot.querySelector('#outlet');
      if (outlet && outlet.firstElementChild) {
        outlet.firstElementChild.requestUpdate?.();
      }
    });
  }

  disconnectedCallback() {
    window.removeEventListener('language-changed', () => {
      this.requestUpdate();
      const outlet = this.shadowRoot.querySelector('#outlet');
      if (outlet && outlet.firstElementChild) {
        outlet.firstElementChild.requestUpdate?.();
      }
    });
    super.disconnectedCallback();
  }

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector('#outlet');
    if (!outlet) {
      console.error('Router outlet not found');
      return;
    }
    const router = new Router(outlet);
    try {
      router.setRoutes([
        { path: '/', redirect: '/employees' },
        { path: '/employees', component: 'employee-list' },
        { path: '/employees/add', component: 'employee-form' },
        { path: '/employees/edit/:id', component: 'employee-form' },
        { path: '(.*)', redirect: '/employees' }
      ]);
      console.log('Routes set successfully');
    } catch (error) {
      console.error('Failed to set routes:', error);
    }
  }

  render() {
    console.log('AppRoot rendering');
    return html`
      <nav-menu></nav-menu>
      <main>
        <div id="outlet"></div>
      </main>
    `;
  }
}

customElements.define('app-root', AppRoot);