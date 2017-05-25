
exports.priority = 1;
exports.handler = (app) => {
  app.use((ctx, next) => {
    console.log('fred');
    return next();
  });
};
