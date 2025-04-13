import { LitElement, html } from 'lit';
import { connect } from '../../store/connect.js';
import { deleteEmployee, setCurrentPage } from '../../store/store.js';
import { getText } from '../../localization/localization.js';
import { Router } from '@vaadin/router';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '../confirmation-dialog/index.js';
import { styles } from './styles.js';

class EmployeeList extends connect(LitElement) {
  static properties = {
    employees: { type: Array },
    _currentPage: { type: Number, state: true }, // Internal state
    pageSize: { type: Number },
    searchTerm: { type: String },
    view: { type: String },
    showDeleteConfirmation: { type: Boolean },
    employeeToDelete: { type: String },
  };

  static styles = styles;

  constructor() {
    super();
    this.pageSize = 10;
    this._currentPage = 1;
    this.view = 'table';
    this.showDeleteConfirmation = false;
    this.searchTerm = '';
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value) {
    if (this._currentPage !== value) {
      this._currentPage = value;
      console.log('Setting currentPage:', value);
      this.requestUpdate('currentPage', value);
    }
  }

  update(changedProperties) {
    super.update(changedProperties);
    console.log('EmployeeList updated, currentPage:', this.currentPage, 'employees:', this.employees?.length);
  }

  get filteredEmployees() {
    if (!this.employees) {
      console.log('Employees empty');
      return [];
    }
    console.log('Filtering employees, searchTerm:', this.searchTerm, 'total:', this.employees.length);
    return this.employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(this.searchTerm?.toLowerCase() || '') ||
        emp.lastName.toLowerCase().includes(this.searchTerm?.toLowerCase() || '')
    );
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    const batch = this.filteredEmployees.slice(start, end);
    console.log('Paginating, page:', this.currentPage, 'start:', start, 'end:', end, 'batch:', batch.length);
    return batch;
  }

  get totalPages() {
    const total = Math.ceil(this.filteredEmployees.length / this.pageSize);
    console.log('Total pages:', total);
    return total;
  }

  render() {
    console.log('Rendering EmployeeList, paginatedEmployees:', this.paginatedEmployees.length);
    return html`
      <div class="container">
        <h1>${getText('employeeList.title')}</h1>
        <table class="employee-table">
          <thead>
            <tr>
              <th><input type="checkbox"></th>
              <th>${getText('employeeList.firstName')}</th>
              <th>${getText('employeeList.lastName')}</th>
              <th>${getText('employeeList.dateOfEmployment')}</th>
              <th>${getText('employeeList.dateOfBirth')}</th>
              <th>${getText('employeeList.phone')}</th>
              <th>${getText('employeeList.email')}</th>
              <th>${getText('employeeList.department')}</th>
              <th>${getText('employeeList.position')}</th>
              <th>${getText('employeeList.actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.paginatedEmployees.length
        ? this.paginatedEmployees.map(
          (emp) => html`
                    <tr>
                      <td data-label=""><input type="checkbox"></td>
                      <td data-label="${getText('employeeList.firstName')}">${emp.firstName}</td>
                      <td data-label="${getText('employeeList.lastName')}">${emp.lastName}</td>
                      <td data-label="${getText('employeeList.dateOfEmployment')}">${emp.dateOfEmployment}</td>
                      <td data-label="${getText('employeeList.dateOfBirth')}">${emp.dateOfBirth}</td>
                      <td data-label="${getText('employeeList.phone')}">${emp.phone}</td>
                      <td data-label="${getText('employeeList.email')}">${emp.email}</td>
                      <td data-label="${getText('employeeList.department')}">${emp.department}</td>
                      <td data-label="${getText('employeeList.position')}">${emp.position}</td>
                      <td data-label="${getText('employeeList.actions')}" class="actions">
                        <iron-icon
                          icon="create"
                          title="${getText('employeeList.edit')}"
                          @click=${() => this.navigate(`/employees/edit/${emp.id}`)}
                        ></iron-icon>
                        <iron-icon
                          icon="delete"
                          title="${getText('employeeList.delete')}"
                          @click=${() => this.confirmDelete(emp.id)}
                        ></iron-icon>
                      </td>
                    </tr>
                  `
        )
        : html`<tr><td colspan="10">${getText('employeeList.noEmployees')}</td></tr>`}
          </tbody>
        </table>

        <div class="pagination">
          <button
            ?disabled=${this.currentPage === 1}
            @click=${() => this.dispatch(setCurrentPage(this.currentPage - 1))}
          >
            <iron-icon icon="chevron-left"></iron-icon>
          </button>
          ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === this.totalPages ||
            (page >= this.currentPage - 2 && page <= this.currentPage + 2)
          ) {
            return html`
                <span
                  class="${page === this.currentPage ? 'active' : ''}"
                  @click=${() => this.dispatch(setCurrentPage(page))}
                >
                  ${page}
                </span>
              `;
          } else if (
            (page === this.currentPage - 3 && page > 1) ||
            (page === this.currentPage + 3 && page < this.totalPages)
          ) {
            return html`<span class="dots">...</span>`;
          }
          return null;
        })}
          <button
            ?disabled=${this.currentPage === this.totalPages}
            @click=${() => this.dispatch(setCurrentPage(this.currentPage + 1))}
          >
            <iron-icon icon="chevron-right"></iron-icon>
          </button>
        </div>

        ${this.showDeleteConfirmation
        ? html`
              <confirmation-dialog
                message="${getText('deleteConfirmation.message', {
          name: this.employees.find((e) => e.id === this.employeeToDelete)?.firstName || '',
        })}"
                confirmText="${getText('deleteConfirmation.proceed')}"
                cancelText="${getText('deleteConfirmation.cancel')}"
                @confirm=${() => {
            this.dispatch(deleteEmployee(this.employeeToDelete));
            this.showDeleteConfirmation = false;
          }}
                @cancel=${() => (this.showDeleteConfirmation = false)}
              ></confirmation-dialog>
            `
        : ''}
      </div>
    `;
  }

  confirmDelete(id) {
    this.employeeToDelete = id;
    this.showDeleteConfirmation = true;
  }

  navigate(path) {
    Router.go(path);
  }
}

customElements.define('employee-list', EmployeeList);