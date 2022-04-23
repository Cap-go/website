import type { Handler } from '@netlify/functions'
import { useSupabase } from '../services/supabase'
import { checkKey, sendRes } from './../services/utils'
import type { definitions } from '~/types/supabase'

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase()
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  return sendRes()
}
