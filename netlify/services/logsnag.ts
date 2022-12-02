import { LogSnag } from 'logsnag'

const logsnag = process.env.LOGSNAG_TOKEN
  ? new LogSnag({
    token: process.env.LOGSNAG_TOKEN || '',
    project: process.env.LOGSNAG_PROJECT || '',
  })
  : { publish: () => Promise.resolve(true), insight: () => Promise.resolve(true), insights: () => Promise.resolve(true) }

const insights = async (data: { title: string; value: number; icon: string }[]) => {
  const all = []
  for (const d of data)
    all.push(logsnag.insight(d))

  await Promise.all(all)
}

// const logsnag = { publish: lsg.publish, insight, ...lsg }
export { logsnag, insights }
