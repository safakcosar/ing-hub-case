# Employee Management Application

Welcome to the **Employee Management Application**, a modern web application built for the ING Hub Frontend Case Study. Developed using **LitElement (JavaScript)**, this application empowers HR staff to efficiently manage employee records with a responsive, localized, and thoroughly tested interface. The project showcases a clean, modular architecture designed for scalability and maintainability.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Localization](#localization)
- [Responsive Design](#responsive-design)
- [State Management](#state-management)
- [Routing](#routing)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Employee Management Application is a feature-rich solution that enables HR teams to list, add, edit, and delete employee records seamlessly. Built with **LitElement**, it delivers a reactive and performant user experience. The application supports **Turkish** and **English** localization, responsive design without external CSS frameworks, and achieves over **85% test coverage** through comprehensive unit tests.

As a senior developer, I prioritized code quality, user-centric design, and robust testing to meet all case study requirements while ensuring the application is production-ready. The result is a maintainable, well-documented codebase that balances functionality with elegance.

## Features
- **Employee Listing**:
  - Toggle between **table** and **list** views for flexible data presentation.
  - **Pagination** (10 employees per page) with intuitive navigation.
  - **Search** functionality to filter by first or last name.
  - **Edit** and **Delete** actions per record, with confirmation dialogs.

- **Add New Employee**:
  - Form to create records with fields: First Name, Last Name, Date of Employment, Date of Birth, Phone Number, Email Address, Department (Analytics, Tech), Position (Junior, Medior, Senior).
  - Client-side validation for required fields, format correctness, and email uniqueness.
  - Redirects to the employee list upon submission.

- **Edit Employee**:
  - Reusable form for editing, pre-filled with employee data.
  - Same validations as the add form.
  - Confirmation dialog before saving changes.
  - Redirects to the employee list after updates.

- **Delete Employee**:
  - Confirmation dialog to prevent accidental deletions.
  - Dynamically updates the list upon deletion.

- **Navigation**:
  - Responsive navigation menu for seamless page transitions.
  - Routes for Home, Employee List, Add Employee, and Edit Employee.

- **Localization**:
  - Supports **Turkish** and **English**, driven by the HTML `lang` attribute.
  - Dynamic translation of all UI text.

- **Responsive Design**:
  - Optimized for desktop and mobile without external frameworks.
  - Fluid layouts and touch-friendly controls.

- **Testing**:
  - Unit tests covering all components with over 85% coverage.
  - Validates rendering, interactions, and state management.

## Technologies
- **LitElement**: Lightweight, reactive web components.
- **Redux Toolkit**: Robust state management in browser memory.
- **Vaadin Router**: Client-side navigation.
- **Web Test Runner**: Unit testing with Playwright.
- **Sinon**: Mocking and spying for navigation and events.
- **Custom CSS**: Responsive, framework-free styling.
- **ES Modules**: Modern JavaScript for modularity.

## Project Structure
```
ing-hub-case/
├── src/
│   ├── components/
│   │   ├── confirmation-dialog/
│   │   ├── employee-form/
│   │   ├── employee-list/
│   │   ├── nav-menu/
│   ├── lib/
│   │   └── mock-data.js
│   ├── localization/
│   │   └── localization.js
│   ├── store/
│   │   ├── connect.js
│   │   ├── store.js
│   ├── utils/
│   │   ├── navigation.js
│   │   ├── validators.js
├── test/
│   ├── confirmation-dialog.test.js
│   ├── employee-form.test.js
│   ├── nav-menu.test.js
├── package.json
├── web-test-runner.config.js
├── README.md
```
- **components/**: Modular web components for UI.
- **lib/**: Mock data for development.
- **localization/**: Language support logic.
- **store/**: Redux-based state management.
- **utils/**: Navigation and validation helpers.
- **test/**: Unit tests for components.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/safakcosar/ing-hub-case.git
   cd ing-hub-case
   npm install
   npx playwright install
   ```

## Usage
1. Start the development server:
   ```bash
   npm start
   ```
   Launches the application at http://localhost:8000.
2. Direct Access.
   Launches the application at http://77.245.150.136:8000

## Testing
- Run unit tests:
   ```bash
   npm test
   ```
- Tests use **Web Test Runner** and **Playwright**.

## Localization
- Supports **English** (`lang="en"`) and **Turkish** (`lang="tr"`).
- Dynamically reads the HTML `lang` attribute to translate UI elements (labels, buttons, messages).
- Language selector allows runtime switching between languages.

## Responsive Design
- Fully responsive for desktop and mobile devices using custom CSS.
- No external frameworks (e.g., Bootstrap), ensuring a lightweight footprint.
- Features mobile-optimized layouts, stacked views, and touch-friendly controls.

## State Management
- **Redux Toolkit** manages application state (`employees`, `currentPage`, `searchTerm`, `view`).
- Persists data in browser memory for seamless interactions.
- Custom `connect` mixin integrates Lit components with the store for reactive updates.

## Routing
- **Vaadin Router** enables client-side navigation:
  - `/`: Redirects to `/employees`.
  - `/employees`: Displays the employee list.
  - `/employees/add`: Add employee form.
  - `/employees/edit/:id`: Edit employee form.
- Navigation menu provides intuitive access to all routes.