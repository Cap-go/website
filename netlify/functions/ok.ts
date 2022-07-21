import type { Handler } from '@netlify/functions'
import { sendRes } from 'netlify/services/utils'

export const handler: Handler = async () => {
  return sendRes()
}
