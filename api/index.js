const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getApiInfo } = require('./src/controllers/country')


conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    const loading = await getApiInfo();
    console.log(loading);
    console.log('%s listening at 3001'); 
  });
});
