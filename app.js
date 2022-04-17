var createError = require('http-errors');
var express = require('express');
const port = process.env.PORT || 8000;
const morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
 require("dotenv").config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const products = require("./routes/products");
const order = require("./routes/order");


var app = express();


app.use("/image",express.static("images"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method==="OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT , POST, PATCH , GET, DELETE");
    return res.status(200).json({})
  }
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', products);
app.use('/orders', order);


//mongoose connection
mongoose.connect("mongodb://localhost:27017/API").then(() => {
  console.log("API DB connection done!");
}).catch(err => {
  console.log(err);
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not Found!!!!");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      msg: err.message
    }
  })
});

module.exports = app;
