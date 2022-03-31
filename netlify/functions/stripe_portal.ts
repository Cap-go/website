import type { Handler } from '@netlify/functions'
import { createPortal } from 'netlify/services/stripe'
import { sendRes } from './../services/utils'

interface PortalData {
  email: string
  customerId: string
  callbackUrl: string
}
export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()
  if (!event.body || !process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 400,
      body: 'Portal Error: No body found or no secret found',
    }
  }
  try {
    const body = JSON.parse(event.body) as PortalData
    const link = await createPortal(process.env.STRIPE_SECRET_KEY, body.customerId, body.callbackUrl)
    return sendRes({ link })
  }
  catch (e) {
    return sendRes({ status: 'Cannot create stripe portal', error: e }, 500)
  }
}
