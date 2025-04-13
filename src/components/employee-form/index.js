import { LitElement, html } from 'lit';
import { connect } from '../../store/connect.js';
import { addEmployee, updateEmployee } from '../../store/store.js';
import { getText } from '../../localization/localization.js';
import { validateEmployee } from '../../utils/validators.js';
import { navigate } from '../../utils/navigation.js';
import { styles } from './styles.js';

class EmployeeForm extends connect(LitElement) {
  static properties = {
    id: { type: String },
    employees: { type: Array },
    firstName: { type: String },
    lastName: { type: String },
    dateOfEmployment: { type: String },
    dateOfBirth: { type: String },
    phone: { type: String },
    email: { type: String },
    department: { type: String },
    position: { type: String },
    errors: { type: Object },
    showUpdateConfirmation: { type: Boolean },
  };

  static styles = styles;

  constructor() {
    super();
    this.resetForm();
    this.errors = {};
    this.showUpdateConfirmation = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.id) {
      const match = window.location.pathname.match(/\/employees\/edit\/([^/]+)/);
      if (match) this.id = match[1];
    }
  }

  firstUpdated() {
    this.loadEmployee();
  }

  updated(changedProps) {
    if (changedProps.has('id') || changedProps.has('employees')) {
      this.loadEmployee();
    }
  }

  loadEmployee() {
    if (this.id && this.employees) {
      const employee = this.employees.find((e) => e.id === String(this.id));
      if (employee) {
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.dateOfEmployment = employee.dateOfEmployment;
        this.dateOfBirth = employee.dateOfBirth;
        this.phone = employee.phone;
        this.email = employee.email;
        this.department = employee.department;
        this.position = employee.position;
      }
    }
  }

  render() {
    return html`
      <div class="form-container">
        <h1>${this.id ? getText('employeeForm.editTitle') : getText('employeeForm.addTitle')}</h1>
        <form @submit=${this.handleSubmit}>
          <div class="field">
            <label>${getText('employeeForm.firstName')}</label>
            <input type="text" .value=${this.firstName || ''} @input=${(e) => (this.firstName = e.target.value)} />
            ${this.errors.firstName ? html`<span class="error">${this.errors.firstName}</span>` : ''}
          </div>
          <div class="field">
            <label>${getText('employeeForm.lastName')}</label>
            <input type="text" .value=${this.lastName || ''} @input=${(e) => (this.lastName = e.target.value)} />
            ${this.errors.lastName ? html`<span class="error">${this.errors.lastName}</span>` : ''}
          </div>
          <div class="field">
            <label>${getText('employeeForm.dateOfEmployment')}</label>
            <input
              type="date"
              .value=${this.dateOfEmployment || ''}
              @input=${(e) => (this.dateOfEmployment = e.target.value)}
            />
            ${this.errors.dateOfEmployment ? html`<span class="error">${this.errors.dateOfEmployment}</span>` : ''}
          </div>
          <div class="field">
            <label>${getText('employeeForm.dateOfBirth')}</label>
            <input type="date" .value=${this.dateOfBirth || ''} @input=${(e) => (this.dateOfBirth = e.target.value)} />
            ${this.errors.dateOfBirth ? html`<span class="error">${this.errors.dateOfBirth}</span>` : ''}
          </div>
          <div class="field">
            <label>${getText('employeeForm.phone')}</label>
            <input type="tel" .value=${this.phone || ''} @input=${(e) => (this.phone = e.target.value)} />
            ${this.errors.phone ? html`<span class="error">${this.errors.phone}</span>` : ''}
          </div>
          <div class="field">
            <label>${getText('employeeForm.email')}</label>
            <input type="email" .value=${this.email || ''} @input=${(e) => (this.email = e.target.value)} />
            ${this.errors.email ? html`<span class="error">${this.errors.email}</span>` : ''}
          </div>
          <div class="field">
            <label>${getText('employeeForm.department')}</label>
            <select .value=${this.department || 'Analytics'} @change=${(e) => (this.department = e.target.value)}>
              <option value="Analytics">Analytics</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          <div class="field">
            <label>${getText('employeeForm.position')}</label>
            <select .value=${this.position || 'Junior'} @change=${(e) => (this.position = e.target.value)}>
              <option value="Junior">Junior</option>
              <option value="Medior">Medior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div class="button-group">
            <button type="submit" class="submit">
              ${this.id ? getText('employeeForm.update') : getText('employeeForm.add')}
            </button>
            <button type="button" class="cancel" @click=${() => navigate('/employees')}>
              ${getText('employeeForm.cancel')}
            </button>
          </div>
        </form>

        ${this.showUpdateConfirmation
        ? html`
              <confirmation-dialog
                message="${getText('updateConfirmation.message')}"
                confirmText="${getText('updateConfirmation.proceed')}"
                cancelText="${getText('updateConfirmation.cancel')}"
                @confirm=${this.confirmUpdate}
                @cancel=${() => (this.showUpdateConfirmation = false)}
              ></confirmation-dialog>
            `
        : ''}
      </div>
    `;
  }

  handleSubmit(e) {
    e.preventDefault();
    const employee = {
      id: this.id || Date.now().toString(),
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfEmployment: this.dateOfEmployment,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      department: this.department,
      position: this.position,
    };
    const { isValid, errors } = validateEmployee(employee, this.employees, this.id);
    if (isValid) {
      if (this.id) {
        this.showUpdateConfirmation = true;
      } else {
        this.dispatch(addEmployee(employee));
        navigate('/employees');
      }
    } else {
      this.errors = errors;
    }
  }

  confirmUpdate() {
    const employee = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfEmployment: this.dateOfEmployment,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      department: this.department,
      position: this.position,
    };
    this.dispatch(updateEmployee(employee));
    this.showUpdateConfirmation = false;
    navigate('/employees');
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = 'Analytics';
    this.position = 'Junior';
  }
}

customElements.define('employee-form', EmployeeForm);