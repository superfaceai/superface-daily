import { createServer } from 'http';
import { OneClient, PerformError, UnexpectedError } from '@superfaceai/one-sdk/node/index.js';

async function startLocalhostServer() {
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      url: req.url,
      method: req.method,
      headers: req.headers,
    }));
  });

  await new Promise((resolve) => {
    server.listen(8000, resolve);
  });

  return server;
}

const server = await startLocalhostServer();

const client = new OneClient({
  assetsPath: '../superface',
  token: process.env.SUPERFACE_ONESDK_TOKEN
});
const profile = await client.getProfile('test');

try {
  const result = await profile
    .getUseCase('Test')
    .perform(
      {
        text: 'test'
      },
      {
        provider: 'localhost',
        parameters: { PARAM: 'parameter_value' },
        security: { basic_auth: { username: 'username', password: 'password' } }
      }
    );

  console.log('RESULT:', result);
  process.exit(0);
} catch (e) {
  if (e instanceof PerformError) {
    console.log('ERROR RESULT:', e.errorResult);
  } else if (e instanceof UnexpectedError) {
    console.error('ERROR:', e);
  } else {
    console.log('FAILED:', e);
    process.exit(1);
  }
} finally {
  server.close();
}
