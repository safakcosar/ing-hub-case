import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/confirmation-dialog/index.js';

describe('ConfirmationDialog', () => {
    let element;

    beforeEach(async () => {
        element = await fixture(html`<confirmation-dialog message="Are you sure?"></confirmation-dialog>`);
        await element.updateComplete;
    });

    it('renders confirmation message', async () => {
        const message = element.shadowRoot.querySelector('p');
        expect(message).to.exist;
        expect(message.textContent).to.equal('Are you sure?');
    });

    it('emits confirm event when confirm button is clicked', async () => {
        let confirmed = false;
        element.addEventListener('confirm', () => (confirmed = true));
        const confirmButton = element.shadowRoot.querySelector('.confirm');
        expect(confirmButton).to.exist;
        confirmButton.click();
        await element.updateComplete;
        expect(confirmed).to.be.true;
    });

    it('emits cancel event when cancel button is clicked', async () => {
        let canceled = false;
        element.addEventListener('cancel', () => (canceled = true));
        const cancelButton = element.shadowRoot.querySelector('.cancel');
        expect(cancelButton).to.exist;
        cancelButton.click();
        await element.updateComplete;
        expect(canceled).to.be.true;
    });
});