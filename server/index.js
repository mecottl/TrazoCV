const app = require('./app');
const config = require('./config');



app.get('/', (req, res) => {
    res.send('Hello World!');
  })


  app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${config.app.port}`);
  });