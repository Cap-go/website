export type ProductTestimonial = {
  quote: string
  name: string
  role: string
  avatar: string
  rating: number
  /** Company or app logo, shown when there is no portrait and next to the role. */
  logo?: string
}

export const DEFAULT_TESTIMONIAL_AVATAR = 'https://ik.imagekit.io/senja/tr:f-jpeg/Avatars/avatar_aOgsMJ-eZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657796891741'

const defaultAvatar = DEFAULT_TESTIMONIAL_AVATAR

export function hasRealAvatar(avatar: string | undefined): boolean {
  if (!avatar) return false
  return avatar !== DEFAULT_TESTIMONIAL_AVATAR && !avatar.includes('avatar_aOgsMJ-eZ')
}

const luis: ProductTestimonial = {
  quote: 'Since I started using Capgo everything is faster, and I can give my users the time they deserve without neglecting my daily life.',
  name: 'Luis Dominguez',
  role: 'El que paga, Anirol',
  avatar: 'https://senja-io.s3.us-west-1.amazonaws.com/public/avatar/6a0da579-d9e2-43a4-bc6b-26dddd689c1e_1000040166.png',
  rating: 5,
}

const nate: ProductTestimonial = {
  quote: 'Getting set up took less than a day. Channel-based rollouts let me test on my own device before anything hits production users.',
  name: 'Nate van Jole',
  role: 'CTO, Private',
  avatar: defaultAvatar,
  rating: 5,
}

const kapil: ProductTestimonial = {
  quote: 'Being able to push production OTA updates instantly without waiting for full App Store review cycles has been a massive operational advantage.',
  name: 'Kapil',
  role: 'Founder, NuTriQ',
  avatar: defaultAvatar,
  rating: 5,
}

const noTone: ProductTestimonial = {
  quote: "Being able to add Device ID's to certain groups and push the changes to only certain groups is a life saver.",
  name: 'no-tone @ Webincode',
  role: 'Developer, Webincode',
  avatar: defaultAvatar,
  rating: 5,
  logo: '/testimonial-logos/webincode.png',
}

const sikafanka: ProductTestimonial = {
  quote: 'Capgo Build helped us simplify our Capacitor app release process. We can build and ship iOS and Android apps from one clear workflow.',
  name: 'sikafanka',
  role: 'Design, radius 5',
  avatar: defaultAvatar,
  rating: 5,
  logo: '/testimonial-logos/radius5.png',
}

const mikolaj: ProductTestimonial = {
  quote: 'We originally discovered Capgo through its plugins, and that turned out to be a great entry point into a much more efficient release process for our team.',
  name: 'Mikołaj Wilczek',
  role: 'Principal Mobile Platform Engineer, Tellent',
  avatar: 'https://senja-io.s3.us-west-1.amazonaws.com/public/avatar/cd659df9-70a5-43f5-bbfd-c11f5c6cec7e_avatar.png',
  rating: 5,
  logo: '/testimonial-logos/tellent.png',
}

const michael: ProductTestimonial = {
  quote: 'Great job on the updater plugin. It works flawlessly for me, and live updates are a super accelerator for quick testing turnaround.',
  name: 'Michael Haberler',
  role: 'nethead emeritors',
  avatar: 'https://senja-io.s3.us-west-1.amazonaws.com/public/avatar/f79c80c6-8a49-4972-88b4-7ec68ea92822_avatar.png',
  rating: 5,
}

const sergiu: ProductTestimonial = {
  quote: 'The Capgo Capacitor Updater plugin completely transformed how we ship updates. What used to take days now takes just minutes.',
  name: 'Sergiu S',
  role: 'Lead Developer, drivolino GmbH',
  avatar: 'https://senja-io.s3.us-west-1.amazonaws.com/public/avatar/98496c09-8f14-45ec-a8fc-21c2f76bf2ca_photo_2024-04-28_17-25-58.jpg',
  rating: 5,
  logo: '/testimonial-logos/drivolino.png',
}

export const productTestimonials = {
  liveUpdate: [sergiu, kapil, nate],
  nativeBuild: [sikafanka, mikolaj],
  cli: [nate, noTone, sikafanka],
  mobile: [luis, noTone, kapil],
  plugins: [mikolaj, michael, sergiu],
  ionicEnterprisePlugins: [mikolaj, sergiu],
  observe: [noTone, nate, sergiu],
  notifications: [noTone, kapil, luis],
  skills: [nate, mikolaj, michael],
  ciCd: [sikafanka, nate, kapil],
  liveUpdateData: [sergiu, kapil, michael],
  nativeBuildData: [sikafanka, mikolaj],
} satisfies Record<string, ProductTestimonial[]>

/** Testimonials picked per solution page audience (keys match SolutionAppExampleKey). */
export const solutionTestimonials = {
  agencies: [noTone, sergiu, nate],
  'beta-testing': [nate, noTone, michael],
  'build-without-mac': [sikafanka, mikolaj],
  'cordova-to-capacitor': [mikolaj, sergiu, michael],
  'cordova-to-capacitor-ai': [mikolaj, michael, sergiu],
  'direct-updates': [kapil, sergiu, luis],
  ecommerce: [kapil, sergiu, noTone],
  fintech: [sergiu, noTone, kapil],
  healthcare: [sergiu, kapil, noTone],
  'ionic-enterprise-plugins': [mikolaj, sergiu],
  'lovable-vibecoding-to-mobile': [sikafanka, kapil, luis],
  'pr-preview': [nate, michael, noTone],
  'production-updates': [sergiu, kapil, michael],
  qsr: [kapil, sergiu, noTone],
  'set-and-forget': [noTone, sergiu, kapil],
  'solo-developers': [luis, kapil, nate],
  startups: [kapil, nate, sikafanka],
  'version-targeting': [noTone, nate, sergiu],
  'webapp-to-mobile': [sikafanka, kapil, luis],
  'white-label': [noTone, nate, sergiu],
} satisfies Record<string, ProductTestimonial[]>

export const allTestimonials = [luis, nate, kapil, noTone, sikafanka, mikolaj, michael, sergiu]

/** Average star rating across every published customer testimonial above. */
export const ratingSummary = {
  average: Number((allTestimonials.reduce((sum, item) => sum + item.rating, 0) / allTestimonials.length).toFixed(1)),
  count: allTestimonials.length,
}

/** Real customer quotes shown on product schema pages (pricing, enterprise). */
export const capgoReviews = [sergiu, mikolaj, luis]

export function toProductReviewLdJson(testimonials: ProductTestimonial[]) {
  return testimonials.map((item) => ({
    author: item.name,
    reviewBody: item.quote,
    ratingValue: item.rating,
  }))
}
