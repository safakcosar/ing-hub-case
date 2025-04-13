import { getText } from '../localization/localization.js';

export function validateEmployee(employee, existingEmployees, employeeId) {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\s?\d{6,14}$/; // Made the space optional with \s?

    if (!employee.firstName) errors.firstName = getText('errors.firstNameRequired');
    if (!employee.lastName) errors.lastName = getText('errors.lastNameRequired');
    if (!employee.dateOfEmployment) errors.dateOfEmployment = getText('errors.dateOfEmploymentRequired');
    if (!employee.dateOfBirth) errors.dateOfBirth = getText('errors.dateOfBirthRequired');
    if (!employee.phone || !phoneRegex.test(employee.phone)) errors.phone = getText('errors.phoneInvalid');
    if (!employee.email || !emailRegex.test(employee.email)) errors.email = getText('errors.emailInvalid');
    if (existingEmployees.some((e) => e.email === employee.email && e.id !== employeeId)) {
        errors.email = getText('errors.emailTaken');
    }

    return { isValid: Object.keys(errors).length === 0, errors };
}