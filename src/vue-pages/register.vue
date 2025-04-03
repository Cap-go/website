<script setup lang="ts">
import { type Locales } from '@/services/locale'
import { getRemoteConfig, useSupabase } from '@/services/supabase'
import * as m from "../paraglide/messages.js"
import { ref } from 'vue'
import { toast, Toaster } from 'vue-sonner'

const props = defineProps<{
  locale: Locales
  captchaKey: string
}>()

const CLOUDFLARE_TURNSTILE_SITE_KEY = props.captchaKey

const isLoading = ref(false)
const enableCaptcha = ref(!!CLOUDFLARE_TURNSTILE_SITE_KEY)
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')

function getCaptchaId() {
  if (!(window as any).turnstile) {
    return undefined
  }

  return (window as any).turnstile.getResponse() as string
}

getRemoteConfig()
const handleSubmit = async () => {
  console.log('Form submitted', { email: email.value, firstName: firstName.value, lastName: lastName.value })
  if (isLoading.value) return
  const supabase = useSupabase()

  const { data: deleted, error: errorDeleted } = await supabase.rpc('is_not_deleted', { email_check: email.value })
  if (errorDeleted) console.error(errorDeleted)
  if (!deleted) {
    toast.error('Account is in error, please contact support at support@capgo.app')
    return
  }

  isLoading.value = true
  const { data: user, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      captchaToken: getCaptchaId(),
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
        activation: {
          formFilled: true,
          enableNotifications: false,
          legal: false,
          optForNewsletters: false,
        },
      },
      emailRedirectTo: 'https://web.capgo.app/onboarding/verify_email',
    },
  })
  if (error) {
    console.error('Supabase signup error', error)
    toast.error(error.message)
    isLoading.value = false
    return
  }
  if (error || !user) {
    isLoading.value = false
    return
  }
  const session = await supabase.auth.getSession()
  if (session.error) {
    console.error('Supabase session error', session.error)
    toast.error(session.error.message)
    isLoading.value = false
    return
  }
  if ((window as any).datafast) {
    (window as any).datafast("signup", { email: email.value });
  }
  window.location.href = `https://web.capgo.app/login/?access_token=${session.data.session?.access_token}&refresh_token=${session.data.session?.refresh_token}`
}
</script>

<template>
  <section class="flex items-center justify-center min-h-screen p-4 overflow-hidden bg-slate-900">
    <div class="relative w-full max-w-4xl">
      <div class="absolute inset-0 transform -translate-x-4">
        <svg class="blur-3xl filter" style="filter: blur(64px)" width="100%" height="100%" viewBox="0 0 444 775" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.5"
            d="M48.1169 329.705C48.1169 139.089 -73.495 -1.98068e-05 69.9555 -7.266e-06C213.406 5.27484e-06 444 499.666 444 690.282C444 880.898 213.406 690.282 69.9554 690.282C-73.4951 690.282 48.1168 520.321 48.1169 329.705Z"
            fill="url(#elin)"
          />
          <defs>
            <linearGradient id="elin" x1="444" y1="775" x2="-60.7966" y2="733.139" gradientUnits="userSpaceOnUse">
              <stop offset="0%" style="stop-color: var(--color-cyan-500)" />
              <stop offset="100%" style="stop-color: var(--color-purple-500)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="relative z-10 grid overflow-hidden bg-white rounded-lg shadow-xl md:grid-cols-2">
        <div class="p-6 space-y-6">
          <div>
            <h2 class="text-4xl font-bold text-gray-900">{{ m.register_title() }}</h2>
            <p class="text-sm text-gray-500">
              {{ m.already_have_account() }}
              <a href="https://web.capgo.app/login/" target="_blank" class="text-blue-500 hover:underline">{{ m.sign_in() }}</a>
            </p>
          </div>
          <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">{{ m.email_label() }}</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                :placeholder="m.email_placeholder()"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">{{ m.first_name_label() }}</label>
                <input
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  required
                  class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  :placeholder="m.first_name_placeholder()"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">{{ m.last_name_label() }}</label>
                <input
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  required
                  class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  :placeholder="m.last_name_placeholder()"
                />
              </div>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">{{ m.password_label() }}</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                :placeholder="m.password_placeholder()"
              />
            </div>
            <div v-if="enableCaptcha">
              <label class="block text-sm font-medium text-gray-700">Captcha</label>
              <div class="cf-turnstile" :data-sitekey="CLOUDFLARE_TURNSTILE_SITE_KEY" data-size="flexible"></div>
            </div>
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :disabled="isLoading"
            >
              <template v-if="isLoading">
                <svg class="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </template>
              <template v-else> {{ m.sign_up_button() }} </template>
            </button>
          </form>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 text-gray-500 bg-white">{{ m.need_help() }}</span>
            </div>
          </div>
          <a
            href="mailto:support@capgo.app"
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            {{ m.open_support() }}
          </a>
        </div>
        <div class="flex items-center p-4 bg-slate-800">
          <blockquote class="text-white">
            <p class="mb-4 text-2xl font-bold">
              {{ m.testimonial_title() }}<br />
              After update,
              <span class="px-2 py-1 text-white bg-orange-500 rounded-full">{{ m.testimonial_highlight() }}</span>
            </p>
            <div class="flex items-center mb-4">
              <img src="/avatar-male-2.webp" alt="User" class="w-12 h-12 mr-4 rounded-full" />
              <div>
                <cite class="font-bold text-white">Jermaine</cite>
                <p class="text-gray-400">{{ m.testimonial_description() }}</p>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img class="object-cover object-top w-full h-full transform opacity-20" src="/background-pattern.webp" alt="" />
    </div>
    <Toaster rich-colors close-button position="top-right" />
  </section>
</template>
