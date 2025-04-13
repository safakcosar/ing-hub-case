import { css } from 'lit';
export const styles = css`
    .form-container {
      max-width: 600px;
      margin: 2rem auto;
      background: #ffffff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 24px;
      font-weight: 500;
      color: #f26c38;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .field {
      margin-bottom: 1.5rem;
      position: relative;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 0.5rem;
    }
    input,
    select {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 14px;
      border: 1px solid #e8ecef;
      border-radius: 6px;
      background: #fafafa;
      box-sizing: border-box;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    input:focus,
    select:focus {
      outline: none;
      border-color: #f26c38;
      box-shadow: 0 0 0 3px rgba(242, 108, 56, 0.2);
    }
    .error {
      color: #d32f2f;
      font-size: 12px;
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .error::before {
      content: '⚠';
      font-size: 12px;
    }
    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
    }
    button.submit {
      background: linear-gradient(135deg, #f26c38, #e55b00);
      color: #ffffff;
    }
    button.submit:hover {
      background: linear-gradient(135deg, #d95a2b, #c44f00);
      transform: translateY(-2px);
    }
    button.cancel {
      background: #6b7280;
      color: #ffffff;
    }
    button.cancel:hover {
      background: #4b5563;
      transform: translateY(-2px);
    }
    @media (max-width: 600px) {
      .form-container {
        margin: 1rem;
        padding: 1.5rem;
      }
      h1 {
        font-size: 20px;
      }
      .field {
        margin-bottom: 1rem;
      }
      label {
        font-size: 13px;
      }
      input,
      select {
        padding: 0.6rem;
        font-size: 13px;
      }
      button {
        padding: 0.6rem 1.2rem;
        font-size: 13px;
      }
      .error {
        font-size: 11px;
      }
    }
  `;