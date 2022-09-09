const { strategyAuthentication } = require("./src/auth/strategyAuthentication");
const app = require("./app");
const config = require('./config')
require('dotenv').config();

const port = 3000;

app.listen(port, () => {
  console.log(`Secret: ${process.env.SECRET_JWT}`);
  console.log(`servidor rodando na porta: ${port}`);
});

module.exports = app;