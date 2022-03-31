import type { Handler } from '@netlify/functions'
import { extractDataEvent, parseStripeEvent } from 'netlify/services/stripe'
import { useSupabase } from '../services/supabase'
import { sendRes } from './../services/utils'
import type { definitions } from '~/types/supabase'

export const handler: Handler = async({ body, headers }) => {
  if (!body || !headers['stripe-signature'] || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 400,
      body: 'Webhook Error: No body found, no signature or no secret found',
    }
  }
  const supabase = useSupabase()

  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = extractDataEvent(parseStripeEvent(process.env.STRIPE_SECRET_KEY, body, headers, process.env.STRIPE_WEBHOOK_SECRET))
    if (stripeEvent.customer_id === '')
      return sendRes('no customer found', 500)

    const { error: dbError } = await supabase
      .from<definitions['stripe_info']>('stripe_info')
      .insert(stripeEvent)
      .eq('customer_id', stripeEvent.customer_id)
    // eslint-disable-next-line no-console
    console.log('stripeEvent', stripeEvent)
    if (dbError)
      return sendRes(dbError, 500)

    return sendRes({ received: true })
  }
  catch (err) {
    console.error(`Stripe webhook failed with ${err}`)
    return sendRes(`Webhook Error: ${(err as any).message}`, 400)
  }
}
