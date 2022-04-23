import type { Handler } from '@netlify/functions'
import { createPortal } from 'netlify/services/stripe'
import { useSupabase } from '../services/supabase'
import { sendRes } from './../services/utils'

interface PortalData {
  callbackUrl: string
}
export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()
  const {
    authorization,
  } = event.headers
  if (!event.body || !process.env.STRIPE_SECRET_KEY || !authorization)
    return sendRes({ status: 'not authorize' }, 400)

  const supabase = useSupabase()
  try {
    const { user, error } = await supabase.auth.api.getUser(
      authorization,
    )
    if (error || !user)
      return sendRes({ status: 'not authorize' }, 400)
    const body = JSON.parse(event.body) as PortalData
    const link = await createPortal(process.env.STRIPE_SECRET_KEY, user.customer_id, body.callbackUrl || 'https://web.capgo.app/app/usage')
    return sendRes({ link })
  }
  catch (e) {
    return sendRes({ status: 'Cannot create stripe portal', error: e }, 500)
  }
}
