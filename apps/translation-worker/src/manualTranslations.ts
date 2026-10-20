import fr from './manual-translations/fr'

/**
 * Reviewed translations keyed by the exact English HTML text segment.
 * The worker uses them before calling the model, so key pages read like native copy.
 * A segment whose English text changes no longer matches and falls back to the model.
 */
export const MANUAL_TRANSLATIONS: Partial<Record<string, Record<string, string>>> = { fr }
