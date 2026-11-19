import { ref, type VNode } from 'vue'
import {
  Icon,
  Segmented,
  SegmentedButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'
import type { GalleryContext } from './tailwindCapacitorDemoGallery'
import { openOverlayRefStage, overlayScreenFiller, overlayUnderlayTrigger } from './demoOverlayHelpers'

export type SlugStateDef = { id: string; label: string; render: (ctx: GalleryContext) => VNode }

export function platformLabel(ctx: GalleryContext): string {
  return ctx.platform.value === 'ios' ? 'iOS' : 'Material'
}

const DEMO_ICON_PATHS: Record<string, string> = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  settings: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96a7.03 7.03 0 00-1.62-.94l-.36-2.54A.484.484 0 0014 2h-4a.49.49 0 00-.48.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 00-.59.22L2.74 8.87a.49.49 0 00.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.13.22.39.3.61.22l2.39-.96c.49.37 1.03.7 1.62.94l.36 2.54c.05.24.24.42.48.42h4c.24 0 .44-.18.48-.42l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.48 0 .61-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.03-1.58zM12 15.5A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z',
  share: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.27 3.27 0 000-.94l7.05-4.11A2.99 2.99 0 1015 5.5c0 .18-.02.36-.05.53L7.9 9.94a3 3 0 100 4.12l7.05 4.12c.03.17.05.35.05.53a3 3 0 103-2.97z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z',
  delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  notifications: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  bolt: 'M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.38.66-.19.34-.05.09-.07.12C15.52 14.06 13.58 17.46 11 21z',
  create: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z',
  image: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  extension: 'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z',
  today: 'M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5V8h14v11z',
  calendar_month: 'M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zm0-14H5V6h14v2z',
  explore: 'M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1 1.1-.49 1.1-1.1-.49-1.1-1.1-1.1zM2 4v2h2l6.6 13.1 1.4-2.6H20c1.1 0 2-.9 2-2s-.9-2-2-2h-7.4l-.5-.9H17V6H4.1L3.4 4H2zm6.6 6H22l-2.5 4.5-2.1-3.8L8.6 10z',
}

export function demoIconVnode(ctx: GalleryContext, name: keyof typeof DEMO_ICON_PATHS, extra: Record<string, unknown> = {}): VNode {
  const { h } = ctx
  const glyph = h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      class: 'size-[1em] shrink-0',
      'aria-hidden': 'true',
    },
    [h('path', { d: DEMO_ICON_PATHS[name] ?? DEMO_ICON_PATHS.home })],
  )
  return h(Icon, extra, { ios: () => glyph, material: () => glyph })
}

export function overlayClosedOpen(
  ctx: GalleryContext,
  triggerLabel: string,
  screenTitle: string,
  openRefKey: keyof GalleryContext,
  overlay: (ctx: GalleryContext) => VNode,
  labels: { closed?: string; open?: string } = {},
): SlugStateDef[] {
  const openRef = ctx[openRefKey] as import('vue').Ref<boolean>
  return [
    {
      id: 'closed',
      label: labels.closed ?? 'Closed',
      render: (c) => overlayUnderlayTrigger(c, triggerLabel, openRef),
    },
    {
      id: 'open',
      label: labels.open ?? 'Open',
      render: (c) => openOverlayRefStage(c, overlayScreenFiller(c, screenTitle), openRef),
    },
  ]
}

export function demoTableSample(ctx: GalleryContext): VNode {
  const { h } = ctx
  const headRow = h(
    TableRow,
    {},
    {
      default: () => [h(TableCell, { header: true }, { default: () => 'Name' }), h(TableCell, { header: true }, { default: () => 'Value' })],
    },
  )
  const bodyRow = h(
    TableRow,
    {},
    {
      default: () => [h(TableCell, {}, { default: () => 'Rows' }), h(TableCell, {}, { default: () => '2' })],
    },
  )
  return h(Table, {}, { default: () => [h(TableHead, {}, { default: () => headRow }), h(TableBody, {}, { default: () => bodyRow })] })
}

export function demoTableBodyRow(ctx: GalleryContext, label: string): VNode {
  const { h } = ctx
  return h(
    Table,
    {},
    {
      default: () =>
        h(TableBody, {}, {
          default: () => h(TableRow, {}, { default: () => h(TableCell, {}, { default: () => label }) }),
        }),
    },
  )
}

export function demoTableHeaderCell(ctx: GalleryContext, label: string): VNode {
  const { h } = ctx
  return h(
    Table,
    {},
    {
      default: () =>
        h(TableHead, {}, {
          default: () => h(TableRow, {}, { default: () => h(TableCell, { header: true }, { default: () => label }) }),
        }),
    },
  )
}

export function demoTableBodyCells(ctx: GalleryContext, ...labels: string[]): VNode {
  const { h } = ctx
  return h(
    Table,
    {},
    {
      default: () =>
        h(TableBody, {}, {
          default: () =>
            h(TableRow, {}, {
              default: () => labels.map((label) => h(TableCell, {}, { default: () => label })),
            }),
        }),
    },
  )
}

type SegmentedStateSpec = { id: string; label: string; firstActive: boolean; options: [string, string] }

export function buildTwoOptionSegmentedStates(ctx: GalleryContext, first: SegmentedStateSpec, second: SegmentedStateSpec): SlugStateDef[] {
  const segmentedVNode = (optionKeys: [string, string], labels: [string, string]) => (c: GalleryContext) => {
    const { h } = c
    return h(
      Segmented,
      { strong: true },
      {
        default: () => [
          h(
            SegmentedButton,
            {
              active: c.segmented.value === optionKeys[0],
              onClick: () => {
                c.segmented.value = optionKeys[0]
              },
            },
            { default: () => labels[0] },
          ),
          h(
            SegmentedButton,
            {
              active: c.segmented.value === optionKeys[1],
              onClick: () => {
                c.segmented.value = optionKeys[1]
              },
            },
            { default: () => labels[1] },
          ),
        ],
      },
    )
  }
  return [
    {
      id: first.id,
      label: first.label,
      render: (c) => {
        c.segmented.value = first.firstActive ? 'opt-0' : 'opt-1'
        return segmentedVNode(['opt-0', 'opt-1'], first.options)(c)
      },
    },
    {
      id: second.id,
      label: second.label,
      render: (c) => {
        c.segmented.value = second.firstActive ? 'opt-0' : 'opt-1'
        return segmentedVNode(['opt-0', 'opt-1'], second.options)(c)
      },
    },
  ]
}