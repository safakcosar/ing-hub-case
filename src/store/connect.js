import { store } from './store.js';

export function connect(BaseClass) {
    return class extends BaseClass {
        connectedCallback() {
            super.connectedCallback();
            this.unsubscribe = store.subscribe(() => {
                this.updateFromState();
                this.requestUpdate();
            });
            this.updateFromState();
        }

        disconnectedCallback() {
            this.unsubscribe();
            super.disconnectedCallback();
        }

        updateFromState() {
            const state = store.getState();
            this.employees = state.employees;
            this.currentPage = state.currentPage;
            this.searchTerm = state.searchTerm;
            this.view = state.view;
        }

        dispatch(action) {
            store.dispatch(action);
        }
    };
}