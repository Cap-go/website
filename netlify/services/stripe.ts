import dayjs from 'dayjs'
import Stripe from 'stripe'

type EventHeaders = Record<string, string | undefined>
export const parseStripeEvent = (key: string, body: string, headers: EventHeaders, secret: string) => {
  const sig = headers['stripe-signature']
  const stripe = new Stripe(key, {
    apiVersion: '2020-08-27',
  })
  const event = stripe.webhooks.constructEvent(body, String(sig), secret)
  return event
}

export interface DataEvent {
  email: string | null
  status: 'created' | 'succeeded' | 'updated' | 'failed' | 'deleted' | 'canceled' | null
  customerId?: string | null
  subscriptionId?: string | null
  updatedAt: string
}

export const createPortal = async(key: string, subscriptionId: string, callbackUrl: string) => {
  const stripe = new Stripe(key, {
    apiVersion: '2020-08-27',
  })
  const link = await stripe.billingPortal.sessions.create({
    customer: subscriptionId,
    return_url: callbackUrl,
  })
  return link
}

export const deleteSub = async(key: string, subscriptionId: string) => {
  const stripe = new Stripe(key, {
    apiVersion: '2020-08-27',
  })
  try {
    const res = await stripe.subscriptions.del(subscriptionId)
    return res
  }
  catch (err) {
    return err
  }
}

export const extractDataEvent = (event: Stripe.Event): DataEvent => {
  const data: DataEvent = {
    email: null,
    subscriptionId: undefined,
    customerId: undefined,
    updatedAt: dayjs().toISOString(),
    status: null,
  }
  // eslint-disable-next-line no-console
  console.log('event', event)
  if (event && event.data && event.data.object) {
    const obj = event.data.object as Stripe.Charge | Stripe.Subscription
    data.customerId = String(obj.customer)
    if (data.customerId) {
      if (event.type === 'charge.succeeded') {
        data.status = 'succeeded'
        data.subscriptionId = obj.id
        data.customerId = String(obj.customer)
        data.updatedAt = dayjs().toISOString()
      }
      else if (event.type === 'customer.deleted') {
        data.status = 'deleted'
        data.subscriptionId = null
        data.customerId = null
        data.updatedAt = dayjs().toISOString()
      }
      else if (event.type === 'charge.failed' || event.type === 'customer.subscription.deleted') {
        data.status = event.type === 'charge.failed' ? 'failed' : 'canceled'
        data.subscriptionId = null
        data.updatedAt = dayjs().toISOString()
      }
      else {
        console.error('Other event', event)
      }
    }
  }
  return data
}
