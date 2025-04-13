import { LitElement, html } from 'lit';
import { styles } from './styles.js';

class ConfirmationDialog extends LitElement {
  static properties = {
    message: { type: String },
    confirmText: { type: String },
    cancelText: { type: String },
  };

  static styles = styles;

  render() {
    return html`
      <div class="modal">
        <p class="message">${this.message}</p>
        <div class="buttons">
          <button class="cancel" @click=${() => this.dispatchEvent(new CustomEvent('cancel'))}>
            ${this.cancelText}
          </button>
          <button class="confirm" @click=${() => this.dispatchEvent(new CustomEvent('confirm'))}>
            ${this.confirmText}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('confirmation-dialog', ConfirmationDialog);