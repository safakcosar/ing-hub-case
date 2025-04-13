import { fixture, html } from '@open-wc/testing';
import '../src/components/employee-list/index.js';

// Mock getText function for translations
const mockGetText = (key) => {
    const translations = {
        'employeeList.firstName': 'First Name',
        'employeeList.noEmployees': 'No employees found',
    };
    return translations[key] || key;
};

describe('EmployeeList', () => {
    let element;

    beforeEach(async () => {
        window.getText = mockGetText;
        element = await fixture(html`<employee-list></employee-list>`);
        await element.updateComplete;
    });

});