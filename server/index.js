const express = require('express');
const morgan = require('morgan');

const db = require("./db");
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 9090;

app.use(morgan('tiny'));
app.use(express.json({ type: ["application/json"] }));

app.use('/', routes);

// error handlers for 40x and 50x errors
// finally the default 404 case
app.use((req, res, next) => {
  return res.status(404).json({
    message: 'Not found'
  })
})
// for things thrown from controllers
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }
  // user errors have a err.isClient field
  if (err.isClient) {
    let statusCode = 400;
    if (err.is403) {
      statusCode = 403;
    } else if (err.is404) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: err.message || `Bad request payload`,
    });
  } else {
    return res.status(500).json({
      message: `An internal error has occurred.`,
    });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server");
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
})
