import type { Handler } from '@netlify/functions'
import { extractDataEvent, parseStripeEvent } from 'netlify/services/stripe'
// import { useSupabase } from '../services/supabase'
// import type { definitions } from '~/types/supabase'

export const handler: Handler = async({ body, headers }) => {
  if (!body || !headers['stripe-signature'] || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 400,
      body: 'Webhook Error: No body found, no signature or no secret found',
    }
  }
  // const supabase = useSupabase()

  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = extractDataEvent(parseStripeEvent(process.env.STRIPE_SECRET_KEY, body, headers, process.env.STRIPE_WEBHOOK_SECRET))
    // const { error: dbError } = await supabase
    //   .from<definitions['stripe_info']>('stripe_info')
    //   .insert(stripeEvent)
    //   .eq('email', stripeEvent.email)
    // eslint-disable-next-line no-console
    console.log('stripeEvent', stripeEvent)
    // if (dbError) {
    //   return {
    //     statusCode: 500,
    //     body: JSON.stringify(dbError),
    //   }
    // }
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  }
  catch (err) {
    console.error(`Stripe webhook failed with ${err}`)
    return {
      statusCode: 400,
      body: `Webhook Error: ${(err as any).message}`,
    }
  }
}
