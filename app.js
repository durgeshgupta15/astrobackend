var createError = require('http-errors');
const dotenv = require('dotenv');
var express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var app = express();
dotenv.config({ path: './config.env' });
const sequelize = require('./db/connection');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

const compression = require('compression');
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



var projectRoutes = require('./routes/userRoutes');
var courseRoutes = require('./routes/courseRoutes');
var pdfRouter = require('./routes/pdfRoutes');
var uploadRouter = require('./routes/uploadRoutes');
var youtubeVideoRouter = require('./routes/youtubeVideosRoutes')


app.use('/test', function (r, res) {
  res.send("helllo")
});
app.use('/user', projectRoutes);
app.use('/course', courseRoutes);
app.use('/pdfdetail', pdfRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload', uploadRouter);

app.use(function (req, res, next) {
  // next(createError(404));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.status(404).send({ 'status': 404, "message": "Np api Found" })
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;