import registryJson from '../../../shared/security/external-assets.json'

export type ExternalAsset = {
  id: string
  url: string
  integrity: string
  crossOrigin?: 'anonymous' | 'use-credentials'
}

export type ExternalAssetWithoutSri = {
  id: string
  url: string
  reason: string
}

type ExternalAssetRegistry = {
  assets: ExternalAsset[]
  sriNotSupported: ExternalAssetWithoutSri[]
}

const registry = registryJson as ExternalAssetRegistry
const assetsById = new Map(registry.assets.map((asset) => [asset.id, asset]))
const assetsWithoutSriById = new Map(registry.sriNotSupported.map((asset) => [asset.id, asset]))

export function getExternalAsset(id: string): ExternalAsset {
  const asset = assetsById.get(id)
  if (!asset) {
    throw new Error(`Unknown external asset id: ${id}`)
  }
  return asset
}

export function getExternalAssetWithoutSri(id: string): ExternalAssetWithoutSri {
  const asset = assetsWithoutSriById.get(id)
  if (!asset) {
    throw new Error(`Unknown external asset without SRI id: ${id}`)
  }
  return asset
}

export const externalAssetsWithoutSri: ExternalAssetWithoutSri[] = registry.sriNotSupported
