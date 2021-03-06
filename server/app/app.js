  express  = require('express');
  ApiRoute = require('./routing/api.routes');
  connectMongoDB = require('./database/db.config');
  schedule = require('node-schedule');
  DeamonController = require('./controllers/deamon.controller');
  app = express();
  port = process.env.PORT || 5000;

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// api router endpoint
app.use('/api', ApiRoute);

// handling a daemon job
const date = new Date();
const rule = {hour: 16, minute: 5, dayOfMonth: 29, month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]};

// setInterval(() => {
//     DeamonController.autoGenerateInvoice();
//     DeamonController.cleanRecentInvoiceDB();
// }, 10000)

schedule.scheduleJob(rule, () => {
    DeamonController.autoGenerateInvoice();
});
const distDir = __dirname + '/dist/';
app.use(express.static(distDir));
app.listen(port, () => {
    connectMongoDB();
    console.log(`Listening at port :${port}`);
});
module.exports = app;
