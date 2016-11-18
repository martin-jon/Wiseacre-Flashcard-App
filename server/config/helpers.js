module.exports = {

  errorLogger: function (error, req, res, next) {
    // log the error then send it to the middleware.js
    console.error(error.stack);
    next(error);
  },

  errorHandler: function (error, req, res, next) {
    // send error message to client
    res.send(500, {error: error.message});
  }
};


