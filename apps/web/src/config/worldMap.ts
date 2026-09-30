// Pin positions in /public/world-dots.svg coordinates (generated once with dotted-map, height 56, diagonal grid).
// The hero renders /public/world-dots.webp, a raster of that SVG, because painting thousands of SVG dots delayed LCP.
export const worldMapSize = { width: 112, height: 57 }
export const worldMapPins: { name: string; x: number; y: number }[] = [
  { name: 'San Francisco', x: 15, y: 19.9 },
  { name: 'New York', x: 31.5, y: 19.1 },
  { name: 'Mexico City', x: 23, y: 26.8 },
  { name: 'São Paulo', x: 40.5, y: 41.6 },
  { name: 'London', x: 55.5, y: 13.9 },
  { name: 'Paris', x: 56.5, y: 15.6 },
  { name: 'Lagos', x: 56.5, y: 31.2 },
  { name: 'Nairobi', x: 68, y: 33.8 },
  { name: 'Dubai', x: 74, y: 25.1 },
  { name: 'Mumbai', x: 79.5, y: 27.7 },
  { name: 'Singapore', x: 89.5, y: 32.9 },
  { name: 'Tokyo', x: 101.5, y: 20.8 },
  { name: 'Seoul', x: 97.5, y: 20.8 },
  { name: 'Sydney', x: 105, y: 45.9 },
]
