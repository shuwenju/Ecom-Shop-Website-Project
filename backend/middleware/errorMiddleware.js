const notFound = (req, res, next) => {
    const error = new Error(`Not Found- ${req.originalUrl}`)
    res.status(404)
    next(error)
  }

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode // sometimes we might get a 200 response, even though it's an error.
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, //also want to have the stack trace, but only if we're not in production.
    })
  }

  export {notFound, errorHandler}