// for the default version
import algoliasearch from 'algoliasearch'

export const indexDocContent = async () => {
  const client = algoliasearch('I0XZYAJ1M3', '0aeaf8b5f490ad9ad9ec6e9eec37ba92')
  const index = client.initIndex('dev_capgo')
  const { data } = await useAsyncData('dev_capgo', () => queryContent('/doc').find())
  const docs = data.value.map((doc) => {
    return {
      objectID: doc._id,
      title: doc.title,
      body: doc.body,
      path: doc._path,
      description: doc.description,
    }
  })
  index
    .saveObjects(docs, { autoGenerateObjectIDIfNotExist: true })
    .wait()
}
