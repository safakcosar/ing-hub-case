
import { css } from 'lit';
export const styles = css`
nav {
  background: #fff;
  padding: 0.8rem;
  margin: 1rem;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
}
.nav-links a {
  color: #f26c38;
  text-decoration: none;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.nav-links a:hover {
  color: #d95a2b;
}
.nav-links a.active {
  font-weight: 600;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo {
  width: 22px;
  height: auto;
}
.logo-container p {
  margin: 0;
  padding: 0;
  font-weight: 600;
  color: rgb(81, 81, 82);
}
.nav-links {
  display: flex;
  font-weight: 200;
  align-items: center;
  gap: 0.5rem;
}
iron-icon {
  width: 24px;
  height: 24px;
  color: #f26c38;
}
a:hover iron-icon {
  color: #d95a2b;
}
a.active iron-icon {
  color: #f26c38;
}
  @media (max-width: 768px) {
nav {
flex-direction: column;
align-items: center;
padding: 0.5rem;
}
.nav-links {
flex-direction: column;
align-items: center;
gap: 0.5rem;
margin-top: 0.5rem;
}
.nav-links a {
margin-right: 0;
}
}
`;