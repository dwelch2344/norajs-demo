const nora = require('norajs')


function handle404(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function handleError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  this.logger.warn(`[AppServ] error processing request at ${req.originalUrl} \n`, err)
  res.json({
    message: err.message
  })
}

class AppServer extends nora.Server{

  constructor(){
    super({
      basePath: __dirname,
      nora: { autoscan: true },
      tracer: {
        // level: 'trace'
      }
    })
  }

  postConfigureExpress(app){
    app.use(handle404.bind(this));
    app.use(handleError.bind(this));
  }
}

module.exports = AppServer