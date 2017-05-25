const Koa = require('koa');
require('babel-polyfill');
const bodyParser = require('koa-bodyparser');
const krouter = require('koa-router');
const serve = require('koa-static');
const Pug = require('koa-pug');
const { routes, middleware } = require('./unpack');

const app = new Koa();
const router = krouter();
const PORT = 3000;

new Pug({
  viewPath: './views',
  debug: false,
  pretty: false,
  compileDebug: false,
  app: app // shortcut to pug.use(app) and app.use(pug.middleware)
});

app.use(bodyParser());
app.use(serve('public/'));

app
  .use(router.routes())
  .use(router.allowedMethods());

// unpack routes and middleware
middleware(app, router);
routes(app, router);

export default app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
