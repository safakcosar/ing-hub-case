import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  nodeResolve: {
    exportConditions: ['browser', 'production'],
  },
  files: ['test/**/*.test.js'],
  browsers: [playwrightLauncher({ browser: 'chromium' })],
  rootDir: '.',
  plugins: [
    {
      name: 'polyfill-process',
      transform(context) {
        if (context.path.endsWith('.js') || context.path.endsWith('.mjs')) {
          const polyfill = `
            if (typeof process === 'undefined') {
              globalThis.process = { env: { NODE_ENV: 'test' } };
            }
          `;
          return {
            body: `${polyfill}\n${context.body}`,
          };
        }
      },
    },
  ],
  testFramework: {
    config: {
      timeout: '10000',
    },
  },
};