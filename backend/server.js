const express = require('express')
const viewengines = require('./src/configs/viewEngines');
const router = require('./src/routers/web');
const bodyParser = require('body-parser');
const APIRouter = require('./src/routers/API');
const conenction = require('./src/configs/ORMsequelize');
const app = express()
const dotenv = require('dotenv').config();
const port = dotenv.parsed.PORT || 8081;// port
viewengines(app);// enginnes and static file
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);
conenction();
APIRouter(app);
app.use(router);//router
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
