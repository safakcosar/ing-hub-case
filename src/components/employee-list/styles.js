
import { css } from 'lit-element';
export const styles = css`
    :host {
      display: block;
      background: #f5f5f5;
      min-height: 100vh;
      padding: 50px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      font-size: 24px;
      font-weight: 500;
      color: #f26c38;
      margin-bottom: 40px;
    }
    .employee-table {
      width: 100%;
      border-collapse: collapse;
      background: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    th,
    td {
      padding: 12px 15px;
      text-align: left;
      font-size: 11px;
      border-bottom: 1px solid #e8ecef;
    }
    th {
      color: #f26c38;
      background: #ffffff;
      font-weight: 600;
    }
    td {
      color: #333333;
    }
    tr:nth-child(even) {
      background: #f9fafb;
    }
    .actions {
      display: flex;
      gap: 10px;
    }
    .actions iron-icon {
      width: 16px;
      height: 16px;
      color: #f26c38;
      cursor: pointer;
    }
    .actions iron-icon:hover {
      color: #d95a2b;
    }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      gap: 10px;
    }
    .pagination button {
      background: none;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    .pagination iron-icon {
      width: 24px;
      height: 24px;
      color: #f26c38;
    }
    .pagination button:disabled iron-icon {
      color: #6b7280;
      cursor: not-allowed;
    }
    .pagination button:hover:not(:disabled) iron-icon {
      color: #d95a2b;
    }
    .pagination span {
      font-size: 16px;
      color: #6b7280;
      cursor: pointer;
      padding: 5px 10px;
    }
    .pagination span.active {
      color: #ffffff;
      font-weight: 600;
      background: #f26c38;
      border-radius: 50px;
      width: 10px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pagination span.dots {
      color: #6b7280;
    }
    input[type="checkbox"] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 1px solid #6b7280;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      vertical-align: middle;
    }
    input[type="checkbox"]:checked {
      background: #f26c38;
      border-color: #f26c38;
    }
    input[type="checkbox"]:checked::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 5px;
      width: 4px;
      height: 8px;
      border: solid #ffffff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    @media (max-width: 768px) {
      .employee-table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
      }
      thead,
      tbody,
      tr,
      th,
      td {
        display: block;
      }
      thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }
      tr {
        margin-bottom: 10px;
        border: 1px solid #e8ecef;
        border-radius: 4px;
        background: #ffffff;
      }
      td {
        border: none;
        border-bottom: 1px solid #e8ecef;
        position: relative;
        padding-left: 50%;
        text-align: right;
      }
      td:before {
        content: attr(data-label);
        position: absolute;
        left: 15px;
        width: 45%;
        padding-right: 10px;
        font-weight: 600;
        text-align: left;
        color: #f26c38;
        text-transform: uppercase;
      }
      .actions {
        justify-content: flex-end;
      }
    }
  `;