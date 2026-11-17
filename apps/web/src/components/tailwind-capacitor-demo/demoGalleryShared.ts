import { ref, type VNode } from 'vue'
import {
  Segmented,
  SegmentedButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../tailwind-capacitor-snapshot/capacitor/index.js'
import type { GalleryContext } from './tailwindCapacitorDemoGallery'
import { openOverlayPhoneStage, overlayScreenFiller, overlayUnderlayTrigger } from './demoOverlayHelpers'

export type SlugStateDef = { id: string; label: string; render: (ctx: GalleryContext) => VNode }

export function platformLabel(ctx: GalleryContext): string {
  return ctx.platform.value === 'ios' ? 'iOS' : 'Material'
}

export function overlayClosedOpen(
  triggerLabel: string,
  screenTitle: string,
  overlay: (ctx: GalleryContext) => VNode,
  labels: { closed?: string; open?: string } = {},
): SlugStateDef[] {
  const openRef = ref(false)
  return [
    {
      id: 'closed',
      label: labels.closed ?? 'Closed',
      render: (c) => overlayUnderlayTrigger(c, triggerLabel, openRef),
    },
    {
      id: 'open',
      label: labels.open ?? 'Open',
      render: (c) => openOverlayPhoneStage(c, overlayScreenFiller(c, screenTitle), overlay(c)),
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
  const segmentedVNode = (firstActive: boolean, options: [string, string]) => (c: GalleryContext) => {
    const { h } = c
    return h(
      Segmented,
      { strong: true },
      {
        default: () => [
          h(SegmentedButton, { active: firstActive }, { default: () => options[0] }),
          h(SegmentedButton, { active: !firstActive }, { default: () => options[1] }),
        ],
      },
    )
  }
  return [
    { id: first.id, label: first.label, render: segmentedVNode(first.firstActive, first.options) },
    { id: second.id, label: second.label, render: segmentedVNode(second.firstActive, second.options) },
  ]
}