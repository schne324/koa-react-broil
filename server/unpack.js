const requireAll = require('require-all');

const methods = ['get', 'put', 'post', 'patch', 'delete'];

exports.middleware = (app) => {
  const mw = requireAll(`${__dirname}/middleware`);
  Object.keys(mw)
    .map((k) => mw[k])
    .sort((a, b) => a.priority - b.priority)
    .forEach((m) => m.handler(app));
};

exports.routes = (app, router) => {
  const routes = requireAll(`${__dirname}/routes`)
  Object.keys(routes)
    .map((k) => routes[k])
    .forEach((r) => {
      methods.forEach((method) => {
        const fn = r[method];
        if (fn) {
          router[method].apply(router, [r.route].concat(fn));
        }
      });
    })
};
