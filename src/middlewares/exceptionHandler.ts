import { NextFunction, Request, Response } from 'express'

import HttpException from '@libraries/HttpException'
import Logger from '@libraries/Logger'
import { env } from '@configs/app'

type ExceptionHandlerResponse = {
  status: number;
  message: string;
  likelyLocation?: string;
  stack?: string;
}

export default (error: HttpException, request: Request, response: Response, next: NextFunction): Response<ExceptionHandlerResponse> => {
  const { status = 500, message = 'Internal Server Error', stack } = error

  const logger = new Logger(request.id)

  logger.error(`HttpException ${status}, ${message}`)

  return response.status(status).json({
    status,
    message,
    ...(env === 'development' && {
      stack
    })
  })
}
