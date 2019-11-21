const logger = require('./logger')

const requestLogger = (request, response, next) => {
  if(request.method === 'POST' || request.method === 'PUT'){
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('----')
  }else{
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('----')
  }
  next()
}

const unknownEndpoint = (request, response) =>{
  response.status(404).send({error: 'Unknown Endpoint'})
}

const errorHandler = (error, request, response, next)=>{
  logger.error(error.message)
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return response.status(400).send({
      error: `malformatted id`
    })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({
      error: error.message
    })
  } else if(error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'){
    return response.status(401).json({
      error: error.message
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) =>{  
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }else{
    request.token = null
  }
  next()
}


module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  tokenExtractor
}
