import type { Handler } from '@netlify/functions'
import { createCheckout } from 'netlify/services/stripe'
import { useSupabase } from '../services/supabase'
import { sendRes } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface PortalData {
  priceId: string
  successUrl: string
  cancelUrl: string
}
export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()
  const {
    authorization,
  } = event.headers
  if (!process.env.STRIPE_SECRET_KEY || !authorization)
    return sendRes({ status: 'not authorize' }, 400)

  const supabase = useSupabase()
  try {
    const { user: auth, error } = await supabase.auth.api.getUser(
      authorization,
    )
    // eslint-disable-next-line no-console
    // console.log('auth', auth)
    if (error || !auth)
      return sendRes({ status: 'not authorize' }, 400)
    // get user from users
    const { data: users, error: dbError } = await supabase
      .from<definitions['users']>('users')
      .select()
      .eq('id', auth.id)
    if (dbError || !users || !users.length)
      return sendRes({ status: 'not authorize' }, 400)
    const user = users[0]
    // eslint-disable-next-line no-console
    // console.log('user', user)
    const body = JSON.parse(event.body || '{}') as PortalData
    // key: string, priceId: string, successUrl: string, cancelUrl: string
    const checkout = await createCheckout(process.env.STRIPE_SECRET_KEY, user.customer_id, body.priceId || ['price_1KkINoGH46eYKnWwwEi97h1B'], body.successUrl || 'https://web.capgo.app/app/succes', body.cancelUrl || 'https://web.capgo.app/app/cancel')
    return sendRes({ url: checkout.url })
  }
  catch (e) {
    return sendRes({ status: 'Cannot create stripe portal', error: e }, 500)
  }
}
