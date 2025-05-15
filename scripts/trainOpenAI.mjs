import '@dotenvx/dotenvx/config'
import { Document } from 'langchain/document'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { FaissStore } from 'langchain/vectorstores/faiss'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { actions } from './action.mjs'

const appDir = process.cwd()

async function loadVectorStore() {
  const directory = join(appDir, 'loadedVectorStore')
  const docStoreJSON = join(appDir, 'loadedVectorStore', 'docstore.json')
  if (existsSync(docStoreJSON)) return await FaissStore.load(directory, new OpenAIEmbeddings())
  return await FaissStore.fromDocuments([new Document({ pageContent: 'Hey' })], new OpenAIEmbeddings())
}

async function saveVectorStore(vectorStore) {
  const directory = join(appDir, 'loadedVectorStore')
  await vectorStore.save(directory)
}

async function train(list) {
  try {
    const vectorStore = await loadVectorStore()
    const executeAsyncOperation = (element) => {
      return new Promise(async (resolve) => {
        const loader = new CheerioWebBaseLoader(element)
        const data = await loader.load()
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 3096,
          chunkOverlap: 128,
        })
        const tempSplitDocs = await textSplitter.splitDocuments(data)
        await vectorStore.addDocuments(tempSplitDocs)
        resolve()
      })
    }
    await Promise.all(list.map((element) => executeAsyncOperation(element)))
    await saveVectorStore(vectorStore)
  } catch (error) {
    console.log(error.message || error.toString())
  }
}

train(
  actions.map((i) => {
    const githubUrlParts = i.href.split('/')
    const githubOwner = githubUrlParts[3]
    const githubRepo = githubUrlParts[4]
    return `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/main/README.md`
  }),
)
