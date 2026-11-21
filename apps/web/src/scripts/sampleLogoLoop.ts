// Both halves of a scrolling loop must contain the same sample in the same order.
export function sampleLogoLoop(containers: Element | Element[], groups: Element[][], slots: number) {
  const indices = groups[0].map((_, index) => index)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const previous = indices[i]
    indices[i] = indices[j]
    indices[j] = previous
  }
  const selected = indices.slice(0, slots)
  const copies = groups.map((group) => selected.map((index) => group[index]))
  if (Array.isArray(containers)) {
    containers.forEach((container, index) => container.replaceChildren(...copies[index]))
  } else {
    containers.replaceChildren(...copies.flat())
  }
}
