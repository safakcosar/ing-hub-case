if (typeof window !== 'undefined') {
    window.process = { env: { NODE_ENV: 'development' } };
}
import './components/app-root.js';