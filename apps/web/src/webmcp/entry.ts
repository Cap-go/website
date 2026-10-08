import { registerTools } from '@nekuda/webmcp-sdk'
import { SIGNUP_PREFILL_KEY, applySignupPrefill, askCapgo, openPage, searchPlugins, startSignup } from './tools'

const registration = registerTools([askCapgo, searchPlugins, startSignup, openPage], {
  tracking: { builtWith: 'webmcp-kit/implement@0.8.1' },
  telemetry: false,
})
addEventListener('pagehide', () => registration.unregister(), { once: true })

const pendingSignup = sessionStorage.getItem(SIGNUP_PREFILL_KEY)
if (pendingSignup && document.getElementById('registerForm')) {
  sessionStorage.removeItem(SIGNUP_PREFILL_KEY)
  applySignupPrefill(JSON.parse(pendingSignup))
}
