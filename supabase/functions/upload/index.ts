import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Buffer } from 'http://deno.land/x/node_buffer/index.ts'
import { supabaseAdmin, updateOrCreateChannel, updateOrCreateVersion } from '../_utils/supabase.ts'
import type { definitions } from '../_utils/types_supabase.ts'
import { checkKey, sendRes } from '../_utils/utils.ts'

interface AppUpload {
  appid: string
  version: string
  app: string
  format?: string
  fileName?: string
  channel: string
}

serve(async(event: Request) => {
  const supabase = supabaseAdmin
  const authorization = event.headers.get('apikey')
  if (!authorization)
    return sendRes({ status: 'Cannot find authorization' }, 400)
  const apikey: definitions['apikeys'] | null = await checkKey(authorization, supabase, ['read'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)
  try {
    const body = (await event.json()) as AppUpload
    const { data: appData, error: dbError0 } = await supabase
      .from<definitions['apps']>('apps')
      .select()
      .eq('app_id', body.appid)
      .eq('user_id', apikey.user_id)
    if (!appData || dbError0)
      return sendRes({ status: `Cannot find app ${body.appid} in your account` }, 400)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { app, ...newObject } = body
    // eslint-disable-next-line no-console
    console.log('body', newObject)
    const fileName = v4.generate()
    const filePath = `apps/${apikey.user_id}/${body.appid}/versions`
    const buff = Buffer.from(app, body.format || 'base64')

    const { error: upError } = await supabase.storage
      .from(filePath)
      .upload(fileName, buff, {
        contentType: 'application/zip',
      })
    if (upError)
      return sendRes({ status: 'Cannot Upload File', error: JSON.stringify(upError) }, 400)
    const { data: version, error: dbError } = await updateOrCreateVersion({
      bucket_id: fileName,
      user_id: apikey.user_id,
      name: body.version,
      app_id: body.appid,
    })
    const { error: dbError2 } = await supabase
      .from<definitions['apps']>('apps')
      .update({
        last_version: body.version,
      }).eq('app_id', body.appid)
      .eq('user_id', apikey.user_id)
    if (dbError || dbError2 || !version || !version.length) {
      return sendRes({
        status: 'Cannot add version',
        err: JSON.stringify(dbError),
      }, 400)
    }
    try {
      const { error: dbError2 } = await updateOrCreateChannel({
        name: body.channel,
        app_id: body.appid,
        created_by: apikey.user_id,
        version: version[0].id,
      })
      if (dbError2) {
        return sendRes({
          status: 'Cannot update or add channel',
          error: JSON.stringify(dbError2),
        }, 400)
      }
    }
    catch (err) {
      return sendRes({
        status: 'Error channel',
        error: JSON.stringify(err),
      }, 400)
    }
    return sendRes()
  }
  catch (e) {
    return sendRes({
      status: 'Error unknow',
      error: JSON.stringify(e),
    }, 500)
  }
})
