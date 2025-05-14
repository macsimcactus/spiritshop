import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Hello from Netlify Function!',
      path: event.path,
      httpMethod: event.httpMethod,
      timestamp: new Date().toISOString()
    })
  }
} 