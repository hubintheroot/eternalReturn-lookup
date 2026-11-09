export async function onRequestGet({ request, env, params, waitUntil }) {
  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) return cached;

  const key = Array.isArray(params.path) ? params.path.join('/') : params.path;
  if (!key) {
    return new Response('Not Found', { status: 404 });
  }

  const object = await env.IMAGES.get(key);
  if (!object) {
    return new Response('Not Found', { status: 404 });
  }

  const headers = new Headers();
  headers.set('Content-Type', 'image/webp');
  headers.set('Cache-Control', 'public, max-age=31536000');
  headers.set('ETag', object.httpEtag);

  const response = new Response(object.body, { headers });
  waitUntil(cache.put(request, response.clone()));
  return response;
}
