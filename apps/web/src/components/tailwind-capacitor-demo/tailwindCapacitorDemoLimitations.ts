/** Demos that cannot fully replicate native Ionic behavior in a static iframe catalog. */
export const tailwindCapacitorDemoLimitations: { name: string; reason: string }[] = [
  {
    name: 'capacitor-infinite-scroll',
    reason: 'Needs a long scroll parent and bottom intersection; the catalog uses a short Page only.',
  },
  {
    name: 'capacitor-refresher',
    reason: 'Pull to refresh needs touch drag on the Page scroller, not available in this embed.',
  },
  {
    name: 'capacitor-datetime',
    reason: 'Registry row is presentational markup only; no native date time sheet is wired in the catalog.',
  },
  {
    name: 'capacitor-picker',
    reason: 'Shows column labels only; no wheel picker overlay in the static demo.',
  },
  {
    name: 'capacitor-item-sliding',
    reason: 'Swipe actions need pointer drag on the row; click only scrolls in the catalog.',
  },
  {
    name: 'capacitor-reorder',
    reason: 'Reorder handle drag is not simulated in the short list block.',
  },
  {
    name: 'capacitor-split-pane',
    reason: 'Split pane resizing needs a wide layout host; demo shows two columns at fixed width.',
  },
]
