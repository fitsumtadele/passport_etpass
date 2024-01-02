var express = require('express');
var cors = require('cors');

var bodyParser = require('body-parser');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

global.appRoot = path.resolve(__dirname);
var applicant = require('./routes/applicant');
var passport = require('./routes/passport');
var upload = require('./routes/upload');
var upload_viditure = require('./routes/upload');

var dbs = require('./models');

dbs.sequelize.sync();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json({ extended: true }));

app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  next();
});

app.listen(8002, () => {
    console.log("Listening to Port 8002");
  });
app.use('/applicant', applicant);
app.use('/passport', passport);
app.use('/upload', upload);
app.use('/upload_viditure', upload_viditure);
module.exports = app;