// Locale style guides for the website translation prompts.
// Small models translated developer jargon into formal or literal words nobody uses
// ("magasin" for store, "Éditeur natif" for Native Build, "agents AI" instead of "agents IA").
// Each guide lists the English terms native developers keep and the house style.
// Add a guide per target language when its translations need tuning; French is the reference.

const GENERIC_STYLE_GUIDE = [
  'Write the way a native developer in the target market talks and reads a product website today, not administrative or textbook language.',
  'Keep the English developer terms that native developers really use (build, bundle, webhook, dashboard, token, prompt, logs, pipeline, framework, onboarding) instead of inventing local equivalents.',
  'Never translate names: Capgo, Capacitor, Capgo Live Updates, Native Build, Observe, Capgo CLI, MCP, Ionic, Ionic Enterprise, Appflow, App Store, Play Store, Xcode, plugin names (Identity Vault, Native Audio, Privacy Screen, Social Login...), third-party product names (Firebase Analytics, Bitbucket Pipelines, Google Login...), package names and commands.',
  'upload and download are different actions: never translate upload with the local word for download.',
].join('\n')

const FRENCH_STYLE_GUIDE = `French (France) style guide:
- Audience: mobile and web developers, tech leads and founders in France. Not Québec French.
- Address the reader with "vous". Use sentence case for headings, buttons and navigation (capitalise only the first word and proper nouns), never English Title Case.
- Marketing headlines and CTAs may use the imperative ("Déployez en quelques minutes"); buttons, menu items and UI actions use the infinitive ("Parler à un humain").
- Get gender and agreement right. Use natural word order ("les 12 derniers mois").
- Typography: space before : ; ? ! ; French quotes « » ; decimal comma (4,2 Mo); prices as "0,05 $"; GB -> Go, GiB -> Gio, MB -> Mo.
Glossary (English -> French, mandatory):
- AI -> IA (agents IA, compétences IA); AI agent -> agent IA
- bundle -> bundle (le bundle, les bundles); JS bundle -> bundle JS
- build (noun) -> build (le build); cloud build -> build cloud; Native Build (Capgo product) stays Native Build; build time -> temps de build; to build an app -> compiler
- channel -> canal (pl. canaux). Never "chaîne".
- release (noun) -> release or version; never "mise à jour" when it means a version
- live update(s) -> live update(s) or "mise à jour OTA". Never "mise à jour en direct".
- update (generic) -> mise à jour
- rollout / staged rollout -> déploiement progressif; roll back / rollback -> rollback, revenir à la version précédente
- ship / deploy -> déployer, livrer, publier. Never "expédier".
- upload -> upload (noun) / envoyer (verb). Never "télécharger" or "téléverser". download -> télécharger.
- store / App Store / Play Store -> store, App Store, Play Store (les stores). Never "magasin" or "boutique". store submission / publishing -> publication sur les stores
- dashboard -> dashboard; onboarding -> onboarding; webhook -> webhook; checksum -> checksum; token -> token; prompt -> prompt; logs -> logs; skills -> skills; edge -> edge; pipeline -> pipeline; open source -> open source; add-on -> add-on
- device -> appareil; organization -> organisation; plan (billing) -> plan; pricing -> tarifs; API key -> clé API; email -> e-mail; push notification -> notification push
- provisioning profile -> profil de provisionnement; signing -> signature; support (help) -> support
- MAU / monthly active users -> utilisateurs actifs mensuels (MAU)`

const STYLE_GUIDES_BY_LANGUAGE: Record<string, string> = {
  French: FRENCH_STYLE_GUIDE,
}

export function translationStyleGuide(targetLanguage: string): string {
  const languageGuide = STYLE_GUIDES_BY_LANGUAGE[targetLanguage]
  return languageGuide ? `${GENERIC_STYLE_GUIDE}\n${languageGuide}` : GENERIC_STYLE_GUIDE
}
