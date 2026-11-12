// Mock form service and payment page for the flow checks. Served under
// /__mock/ next to dist-mock/, which `npm run build:mock` points at these
// URLs. Nothing here is part of the site.
//   POST /__mock/form/<name>     records the submission; 200 JSON, or 500 once after /__mock/fail
//   POST /__mock/fail            the next form POST fails with 500
//   GET  /__mock/submissions     every recorded submission as JSON
//   GET  /__mock/pay/<option>    a stand-in for the hosted payment page

export function createMock() {
  const submissions = [];
  let failNext = 0;

  const json = (res, code, body) => {
    res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
    res.end(JSON.stringify(body));
  };
  const readBody = (req) =>
    new Promise((resolve) => {
      let data = '';
      req.on('data', (d) => {
        data += d;
      });
      req.on('end', () => resolve(data));
    });

  const handler = async (req, res, rest) => {
    if (req.method === 'POST' && rest === 'fail') {
      failNext += 1;
      return json(res, 200, { failNext });
    }
    if (req.method === 'POST' && rest.startsWith('form/')) {
      const body = await readBody(req);
      const type = req.headers['content-type'] || '';
      const fields = type.includes('json') ? JSON.parse(body || '{}') : Object.fromEntries(new URLSearchParams(body));
      if (failNext > 0) {
        failNext -= 1;
        return json(res, 500, { error: 'mock failure' });
      }
      submissions.push({ form: rest.slice(5), accept: req.headers.accept || '', contentType: type, fields });
      return json(res, 200, { ok: true });
    }
    if (req.method === 'GET' && rest === 'submissions') return json(res, 200, submissions);
    if (req.method === 'GET' && rest.startsWith('pay/')) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      return res.end('<!doctype html><title>Mock payment</title><p>Mock payment page</p>');
    }
    return json(res, 404, { error: 'not found' });
  };

  return { handler, submissions };
}
