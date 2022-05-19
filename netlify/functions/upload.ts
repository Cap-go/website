import type { Handler } from '@netlify/functions'
import { v4 as uuidv4 } from 'uuid'
import { updateOrCreateChannel, updateOrCreateVersion, useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { definitions } from '~/types/supabase'

interface AppUpload {
  appid: string
  version: string
  app: string
  format?: string
  fileName?: string
  isMultipart?: boolean
  external?: string
  chunk?: number
  totalChunks?: number
  channel: string
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all', 'upload'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  try {
    const body = JSON.parse(event.body || '{}') as AppUpload
    if (await checkAppOwner(apikey.user_id, body.appid, supabase))
      return sendRes({ status: 'You can\'t upload this app' }, 400)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { app, ...newObject } = body
    // eslint-disable-next-line no-console
    console.log('body', newObject)
    const dataFormat: BufferEncoding = (body.format || 'base64') as BufferEncoding
    let fileName = uuidv4()
    let error
    if (body.isMultipart && body.fileName && !body.external) {
      fileName = body.fileName
      const { data, error: dnError } = await supabase
        .storage
        .from(`apps/${apikey.user_id}/${body.appid}/versions`)
        .download(fileName)
      if (dnError || !data)
        return sendRes({ status: 'Cannot download partial File to concat', error: JSON.stringify(dnError || { err: 'unknow error' }) }, 400)

      const arrayBuffer = await data?.arrayBuffer()
      const buffOld = Buffer.from(arrayBuffer)
      const buffNew = Buffer.from(body.app, dataFormat)
      const bufAll = Buffer.concat([buffOld, buffNew], buffOld.length + buffNew.length)
      const { error: upError } = await supabase
        .storage
        .from(`apps/${apikey.user_id}/${body.appid}/versions`)
        .update(fileName, bufAll, {
          contentType: 'application/zip',
          upsert: false,
        })
      error = upError
    }
    else if (!body.external) {
      const { error: upError } = await supabase.storage
        .from(`apps/${apikey.user_id}/${body.appid}/versions`)
        .upload(fileName, Buffer.from(body.app, (body.format || 'base64') as BufferEncoding), {
          contentType: 'application/zip',
        })
      error = upError
    }
    if (error)
      return sendRes({ status: 'Cannot Upload File', error: JSON.stringify(error) }, 400)

    if (body.external && !body.external.startsWith('https://'))
      return sendRes({ status: 'external refused', error: `it should start with "https://" current is "${body.external}"` }, 400)

    if (body.isMultipart) {
      // send filename to allow partial upload
      const isDone = (body.chunk || 0) === (body.totalChunks || 0) && body.fileName
      if (!isDone)
        return sendRes({ status: 'multipart', fileName })
    }
    const { data: version, error: dbError } = await updateOrCreateVersion(supabase, {
      bucket_id: body.external ? undefined : fileName,
      user_id: apikey.user_id,
      name: body.version,
      app_id: body.appid,
      external_url: body.external,
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
      const { error: dbError2 } = await updateOrCreateChannel(supabase, {
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
}
