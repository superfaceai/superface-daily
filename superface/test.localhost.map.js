const manifest = {
  profile: 'test@0.1.0',
  provider: 'test'
};

function Test({ input, parameters, services }) {
  __ffi.unstable.printDebug('Input:', input);
  __ffi.unstable.printDebug('Parameters:', parameters);
  __ffi.unstable.printDebug('Services:', services);

  const url = `${services.default}/${input.text}`;

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    security: 'basic_auth',
    query: {
      'foo': ['bar', 'baz'],
      'qux': ['2']
    }
  };

  try {
    const response = std.unstable.fetch(url, options).response();
    const body = response.bodyAuto() ?? {};

    if (response.status !== 200) {
      throw new std.unstable.MapError({
        title: 'Error response',
        detail: `${JSON.stringify(response)} - ${JSON.stringify(body)}`
      });
    }

    return {
      url: body.url,
      method: body.method,
      query: body.query,
      headers: body.headers,
    };
  } catch (err) {
    throw new std.unstable.MapError({
      title: err.name,
      detail: err.message,
    });
  }
}