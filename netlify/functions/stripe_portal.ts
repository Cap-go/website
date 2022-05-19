import type { Handler } from '@netlify/functions'
import { createPortal } from 'netlify/services/stripe'
import { useSupabase } from '../services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'
import type { definitions } from '~/types/supabase'

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
  if (!process.env.STRIPE_SECRET_KEY || !authorization)
    return sendRes({ status: 'not authorize' }, 400)

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
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
    if (!user.customer_id)
      return sendRes({ status: 'no customer' }, 400)
    // eslint-disable-next-line no-console
    // console.log('user', user)
    const body = JSON.parse(event.body || '{}') as PortalData
    const link = await createPortal(transformEnvVar(findEnv(event.rawUrl), 'STRIPE_SECRET_KEY'), user.customer_id, body.callbackUrl || 'https://web.capgo.app/app/usage')
    return sendRes({ url: link.url })
  }
  catch (e) {
    return sendRes({ status: 'Cannot create stripe portal', error: e }, 500)
  }
}
