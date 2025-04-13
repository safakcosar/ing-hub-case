import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/employee-form/index.js';
import { store } from '../src/store/store.js';
import { mockData } from '../src/lib/mock-data.js';

// Mock getText
const mockGetText = (key) => {
    const translations = {
        'employeeForm.addTitle': 'Add New Employee',
        'employeeForm.editTitle': 'Edit Employee',
        'employeeForm.firstName': 'First Name',
        'employeeForm.lastName': 'Last Name',
        'employeeForm.dateOfEmployment': 'Date of Employment',
        'employeeForm.dateOfBirth': 'Date of Birth',
        'employeeForm.phone': 'Phone',
        'employeeForm.email': 'Email',
        'employeeForm.department': 'Department',
        'employeeForm.position': 'Position',
        'updateConfirmation.message': 'Are you sure you want to update?',
        'updateConfirmation.proceed': 'Proceed',
        'updateConfirmation.cancel': 'Cancel',
    };
    return translations[key] || key;
};

describe('EmployeeForm', () => {
    let element;
    let originalGetText;

    beforeEach(async () => {
        store.dispatch({ type: 'employees/reset' });
        originalGetText = window.getText;
        window.getText = mockGetText;
        element = await fixture(html`<employee-form></employee-form>`);
        element.employees = [...mockData];
        await element.updateComplete;
    });

    afterEach(() => {
        window.getText = originalGetText;
    });



    it('renders form with add title when no id', async () => {
        const title = element.shadowRoot.querySelector('h1');
        expect(title).to.exist;
        expect(title.textContent).to.equal('Add New Employee');
    });

    it('validates required fields', async () => {
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new Event('submit', { cancelable: true }));
        await element.updateComplete;
        expect(Object.keys(element.errors).length).to.be.greaterThan(0);
        expect(element.errors.firstName).to.exist;
    });

    it('shows confirmation in edit mode', async () => {
        element.id = '1';
        const inputs = element.shadowRoot.querySelectorAll('input');
        inputs[0].value = 'John';
        inputs[0].dispatchEvent(new Event('input'));
        inputs[1].value = 'Doe';
        inputs[1].dispatchEvent(new Event('input'));
        inputs[2].value = '2023-01-01';
        inputs[2].dispatchEvent(new Event('input'));
        inputs[3].value = '1990-01-01';
        inputs[3].dispatchEvent(new Event('input'));
        inputs[4].value = '+905551234567';
        inputs[4].dispatchEvent(new Event('input'));
        inputs[5].value = 'john.doe@example.com';
        inputs[5].dispatchEvent(new Event('input'));
        const selects = element.shadowRoot.querySelectorAll('select');
        selects[0].value = 'Tech';
        selects[0].dispatchEvent(new Event('change'));
        selects[1].value = 'Senior';
        selects[1].dispatchEvent(new Event('change'));
        const form = element.shadowRoot.querySelector('form');
        form.dispatchEvent(new Event('submit', { cancelable: true }));
        await element.updateComplete;
        expect(element.showUpdateConfirmation).to.be.true;
        const dialog = element.shadowRoot.querySelector('confirmation-dialog');
        expect(dialog).to.exist;
    });

    it('prefills form in edit mode', async () => {
        const mockEmployee = {
            id: '1',
            firstName: 'Jane',
            lastName: 'Smith',
            dateOfEmployment: '2022-01-01',
            dateOfBirth: '1985-01-01',
            phone: '+905551234568',
            email: 'jane.smith@example.com',
            department: 'Tech',
            position: 'Senior',
        };
        element.employees = [mockEmployee];
        element.id = '1';
        await element.updateComplete;
        expect(element.firstName).to.equal('Jane');
        expect(element.lastName).to.equal('Smith');
        expect(element.dateOfEmployment).to.equal('2022-01-01');
        expect(element.dateOfBirth).to.equal('1985-01-01');
        expect(element.phone).to.equal('+905551234568');
        expect(element.email).to.equal('jane.smith@example.com');
        expect(element.department).to.equal('Tech');
        expect(element.position).to.equal('Senior');
        const title = element.shadowRoot.querySelector('h1');
        expect(title.textContent).to.equal('Edit Employee');
    });
});