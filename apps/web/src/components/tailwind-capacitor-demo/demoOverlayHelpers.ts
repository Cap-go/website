import type { Ref, VNode } from 'vue'
import type { GalleryContext } from './tailwindCapacitorDemoGallery'

export const destructiveActionColors = {
  textIos: 'text-red-500',
  textMaterial: 'text-red-500',
  activeBgIos: 'active:bg-red-500/10',
  activeBgMaterial: 'active:bg-red-500/10',
}

/** Full phone viewport: dimmed app screen + overlay covering the frame (Ionic-style). */
export function openOverlayPhoneStage(ctx: GalleryContext, underlay: VNode, overlay: VNode): VNode {
  const { h } = ctx
  return h('div', { class: 'tc-demo-overlay-open-stage tc-demo-state-fill' }, [
    h('div', { class: 'tc-demo-underlay-screen' }, [underlay]),
    h('div', { class: 'tc-demo-overlay-layer' }, [overlay]),
  ])
}

export function overlayScreenFiller(ctx: GalleryContext, label = 'Settings'): VNode {
  const { h } = ctx
  return h('div', { class: 'tc-demo-screen-filler flex min-h-full flex-col' }, [
    h('div', { class: 'tc-demo-screen-filler-nav px-4 py-3 text-sm font-semibold' }, label),
    h(
      'div',
      { class: 'flex-1 space-y-2 p-3' },
      Array.from({ length: 4 }, (_, i) =>
        h(
          'div',
          {
            class: 'tc-demo-screen-filler-row flex h-11 items-center rounded-lg px-3 text-sm leading-none',
            key: i,
          },
          `Row ${i + 1}`,
        ),
      ),
    ),
  ])
}

export function overlayUnderlayTrigger(ctx: GalleryContext, label: string, openRef: Ref<boolean>, options?: { id?: string }): VNode {
  const { h } = ctx
  return h('div', { class: 'tc-demo-screen-filler flex min-h-full flex-col justify-center p-4' }, [
    ctx.overlayTrigger(label, openRef, options),
  ])
}