
import { css } from 'lit';
export const styles = css`
    .selector {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: rgb(81, 81, 82);
      font-size: 14px;
      font-weight: 200;
    }
    .options {
      display: flex;
      gap: 0.5rem;
    }
    .option {
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 2px;
    }
    .option:hover {
      color: #d95a2b;
    }
    .option.active {
      font-weight: 600;
      color: #f26c38;
    }
    iron-icon {
      width: 18px;
      height: 18px;
      color: rgb(81, 81, 82);
    }
    .selector:hover iron-icon {
      color: #d95a2b;
    }
  `;