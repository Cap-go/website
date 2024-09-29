export const locales = ['fr', 'en']

export type Locales = 'fr' | 'en'

export const defaultLocale = 'en'

export const dynamicTranslations = (singleVariable: string) => ({
  launch_multiple_releases_per_week: {
    en: `With ${singleVariable}, you can launch multiple releases per week with an impressive 81% increase in efficiency. Don't miss out on this competitive advantage.`,
    fr: `Avec ${singleVariable}, vous pouvez lancer plusieurs mises à jour par semaine avec une augmentation impressionnante de 81% en efficacité. Ne manquez pas cette opportunité de gain de temps.`,
  },
  easily_combine_features_ci_cd: {
    en: `Easily combine ${singleVariable} features into your current CI/CD platform with our user-friendly CLI.`,
    fr: `Facilement combiner les fonctionnalités de ${singleVariable} dans votre plateforme CI/CD actuelle avec notre CLI conviviale.`,
  },
})
