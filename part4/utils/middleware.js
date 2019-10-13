const requestLogger = (request, response, next) => {
  if(request.method === 'POST' || request.method === 'PUT'){
    console.log(`
      Method: ${request.method}
      Path: ${request.path}
      Body: ${JSON.stringify(request.body)}
      ----------------------------
    `)
  }else{
    console.log(`
      Method: ${request.method}
      Path: ${request.path}
      ----------------------------
    `)
  }
  next()
}

const unknownEndpoint = (request, response) =>{
  response.status(404).send({error: 'Unknown Endpoint'})
}

const errorHandler = (error, request, response, next)=>{
  console.error(error.message)
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return response.status(400).send({error: `malformatted id`})
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }
  next(error)
}

module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint
}
