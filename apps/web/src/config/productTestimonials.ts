export type ProductTestimonial = {
  quote: string
  name: string
  role: string
  avatar: string
  rating: number
}

const defaultAvatar = 'https://ik.imagekit.io/senja/tr:f-jpeg/Avatars/avatar_aOgsMJ-eZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657796891741'

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
}

const sikafanka: ProductTestimonial = {
  quote: 'Capgo Build helped us simplify our Capacitor app release process. We can build and ship iOS and Android apps from one clear workflow.',
  name: 'sikafanka',
  role: 'Design, radius 5',
  avatar: defaultAvatar,
  rating: 5,
}

const mikolaj: ProductTestimonial = {
  quote: 'We originally discovered Capgo through its plugins, and that turned out to be a great entry point into a much more efficient release process for our team.',
  name: 'Mikołaj Wilczek',
  role: 'Principal Mobile Platform Engineer, Tellent',
  avatar: 'https://senja-io.s3.us-west-1.amazonaws.com/public/avatar/cd659df9-70a5-43f5-bbfd-c11f5c6cec7e_avatar.png',
  rating: 5,
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
}

export const productTestimonials = {
  liveUpdate: [sergiu, kapil, nate],
  nativeBuild: [sikafanka, nate],
  cli: [nate, noTone, sikafanka],
  mobile: [luis, noTone, kapil],
  plugins: [mikolaj, michael, sergiu],
  ionicEnterprisePlugins: [mikolaj, sergiu],
} satisfies Record<string, ProductTestimonial[]>
