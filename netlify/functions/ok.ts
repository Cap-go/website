import type { Handler } from '@netlify/functions'
import { sendRes } from './../services/utils'

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  return sendRes()
}
