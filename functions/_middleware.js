export async function onRequest(context) {
  const { env, next } = context;

  const IS_DEPRECATED = env.DEPRECATED !== 'false';

  if (IS_DEPRECATED) {
    return new Response(
      'This site has been deprecated. Please use main-site.',
      {
        status: 410,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  return await next();
}
