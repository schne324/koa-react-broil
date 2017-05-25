
exports.route = '/';

exports.get = (ctx) => {
  const someData = { fred: 'HELLO' }
  ctx.render('index', {
    initialData: JSON.stringify(someData)
  });
};
