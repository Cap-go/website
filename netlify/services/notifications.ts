import dayjs from 'dayjs'
import { parseCronExpression } from 'cron-schedule'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase.types'
import { addEventPerson } from './crisp'

const sendNow = async (supabase: SupabaseClient<Database>, eventName: string, email: string, userId: string, color: string) => {
  // eslint-disable-next-line no-console
  console.log('send notif', eventName, email)
  await addEventPerson(email, {}, eventName, color)
  await supabase
    .from('notifications')
    .insert({
      id: eventName,
      user_id: userId,
      last_send_at: dayjs().toISOString(),
    })
}

const isSendable = (last: string, cron: string) => {
  const interval = parseCronExpression(cron)
  const last_send_at = new Date(last)
  const now = new Date()
  const nextDate = interval.getNextDate(last_send_at)
  // eslint-disable-next-line no-console
  console.log(`
  cron ${cron}
  last_send_at ${last_send_at}
  nextDate ${nextDate}
  now ${now}
`)

  return (dayjs(now).isAfter(nextDate))
}

export const sendNotif = async (supabase: SupabaseClient<Database>, eventName: string, userId: string, cron: string, color: string) => {
  const { data: user } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single()

  if (!user) {
    // eslint-disable-next-line no-console
    console.log('user not found', userId)
    return Promise.resolve()
  }
  if (!user.enableNotifications) {
    // eslint-disable-next-line no-console
    console.log('user disables notif', userId)
    return Promise.resolve()
  }
  // check if notif has already been send in notifications table
  const { data: notif } = await supabase
    .from('notifications')
    .select()
    .eq('user_id', userId)
    .eq('id', eventName)
    .single()
  if (!notif)
    return sendNow(supabase, eventName, user.email, userId, color)

  if (notif && !isSendable(notif.last_send_at, cron)) {
    // eslint-disable-next-line no-console
    console.log('notif already sent', eventName, userId)
    return Promise.resolve()
  }
  return sendNow(supabase, eventName, user.email, userId, color)
}
// dayjs substract one week
// const last_send_at = dayjs().subtract(1, 'week').toISOString()
// console.log(isSendable(last_send_at, '0 1 * * 0'))
