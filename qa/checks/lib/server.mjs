// Zero-dependency static server used by the checks and by `npm run serve`.
// Usage: node qa/checks/lib/server.mjs [dir] [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

/**
 * Serve directories under URL prefixes, for example
 * [['/__design/', 'design'], ['/', 'dist']]. The longest prefix wins.
 * A mount may be a function (req, res, rest) instead of a directory; the
 * checks use one for the mock form and payment services.
 */
export function startServer(mounts, port = 0) {
  const table = mounts
    .map(([prefix, dir]) => [prefix, typeof dir === 'function' ? dir : path.resolve(dir)])
    .sort((a, b) => b[0].length - a[0].length);

  const server = http.createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      return send(res, 400);
    }
    const mount = table.find(([prefix]) => pathname.startsWith(prefix));
    if (!mount) return send(res, 404);
    const [prefix, root] = mount;
    if (typeof root === 'function') return root(req, res, pathname.slice(prefix.length));
    let file = path.join(root, pathname.slice(prefix.length));
    if (file !== root && !file.startsWith(root + path.sep)) return send(res, 403);
    try {
      if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      const body = fs.readFileSync(file);
      res.writeHead(200, {
        'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-store',
      });
      res.end(body);
    } catch {
      send(res, 404);
    }
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, url: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

function send(res, code) {
  res.writeHead(code, { 'content-type': 'text/plain; charset=utf-8' });
  res.end(String(code));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [dir = 'dist', port = '4321'] = process.argv.slice(2);
  const { url } = await startServer([['/', dir]], Number(port));
  console.log(`Serving ${dir} at ${url}`);
}
