import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults();

const port = 5005;
server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.info(`JSON Server is running at http://localhost:${port}`);
});
