import { createApp } from 'vue'
import TailwindCapacitorDemoShell from '../components/tailwind-capacitor-demo/TailwindCapacitorDemoShell.vue'

const mount = document.getElementById('tc-demo-mount')
if (mount) {
  const params = new URLSearchParams(window.location.search)
  const platform = params.get('platform') === 'material' ? 'material' : 'ios'
  const dark = params.get('dark') === '1' || params.get('dark') === 'true'
  createApp(TailwindCapacitorDemoShell, { platform, dark }).mount(mount)
}
