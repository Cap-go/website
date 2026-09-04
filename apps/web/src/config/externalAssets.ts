import registry from '../../../shared/security/external-assets.json'

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

const assetsById = new Map(registry.assets.map((asset) => [asset.id, asset]))

export function getExternalAsset(id: string): ExternalAsset {
  const asset = assetsById.get(id)
  if (!asset) {
    throw new Error(`Unknown external asset id: ${id}`)
  }
  return asset
}

export const externalAssetsWithoutSri: ExternalAssetWithoutSri[] = registry.sriNotSupported
