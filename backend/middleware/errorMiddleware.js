//to change default express error handler create middleware
//Middleware: They are just functions that executes during request response cycle when you make a requestS

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message,
        //stacktrace only if in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports =  {
    errorHandler,
}

