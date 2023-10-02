import http from 'node:http';
import { URL } from 'node:url';

function auth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Superface Daily"');
    res.end('Unauthorized');
    return false;
  }

  const encodedCredentials = authHeader.slice('Basic '.length);
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
  const [username, password] = decodedCredentials.split(':');

  if (username !== 'user' || password !== 'pass') {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Superface Daily"');
    res.end('Unauthorized');
    return false;
  }

  return true;
}

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
  switch (url.pathname) {
    case '/hello':
      if (!auth(req, res)) {
        return;
      }

      if (!url.searchParams.has('name')) {
        res.statusCode = 400;
        return res.end(JSON.stringify({
          title: 'Bad request',
          message: 'Missing `name` query parameter',
        }));
      }

      req.statusCode = 200;
      return res.end(JSON.stringify({
        greeting: `Hello, ${url.searchParams.get('name')}!`,
      }));
    default:
      res.statusCode = 404;
      return res.end(JSON.stringify({
        title: 'Not found',
      }));
  }
});

const PORT = process.env.PORT ?? 3000;
const HOSTNAME = process.env.HOSTNAME ?? '0.0.0.0';

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on http://${HOSTNAME}:${PORT}/`);
});

process.on('SIGINT', () => {
  console.log('Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit();
  });
});