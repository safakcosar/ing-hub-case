import { css } from 'lit';

export const styles = css`
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 1rem;
    border: 1px solid #ddd;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .buttons {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  button {
    width: 100%;
    min-height: 28px;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
  }
  .confirm {
    background: #ff6200;
    color: white;
    border: none;
  }
  .cancel {
    background: white;
    border: 1px solid #ff6200;
    color: #ff6200;
  }
`;