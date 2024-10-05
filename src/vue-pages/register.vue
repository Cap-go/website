<template>
  <section class="overflow-hidden bg-slate-900 min-h-screen flex items-center justify-center p-4">
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
      <div class="relative bg-white rounded-lg shadow-xl overflow-hidden grid md:grid-cols-2 z-10">
        <div class="p-6 space-y-6">
          <div>
            <h2 class="text-4xl font-bold text-gray-900">Sign up to Capgo</h2>
            <p class="text-sm text-gray-500">
              Already have an account?
              <a href="https://web.capgo.app/login/" target="_blank" class="text-blue-500 hover:underline">Sign in</a>
            </p>
          </div>
          <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
                <input
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
                <input
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="isLoading"
            >
              <template v-if="isLoading">
                <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </template>
              <template v-else> Sign up </template>
            </button>
          </form>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Need help?</span>
            </div>
          </div>
          <button
            @click="openMessenger"
            class="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            Open Support
          </button>
        </div>
        <div class="bg-slate-800 p-4 flex items-center">
          <blockquote class="text-white">
            <p class="text-2xl font-bold mb-4">
              We rolled out Capgo in production for our user base of +5000!<br />
              After update,
              <span class="bg-orange-500 text-white px-2 py-1 rounded-full">users are up to date within minutes</span>
            </p>
            <div class="flex items-center mb-4">
              <img src="/avatar-male-2.webp" alt="User" class="w-12 h-12 rounded-full mr-4" />
              <div>
                <cite class="font-bold text-white">Jermaine</cite>
                <p class="text-gray-400">Capgo User since 2023</p>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img class="object-cover object-top w-full h-full transform opacity-20" src="/background-pattern.webp" alt="" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { openMessenger } from '../services/bento'
import { toast } from 'vue-sonner'
import { useSupabase, getRemoteConfig } from '../services/supabase'
import { navigate } from 'astro:transitions/client'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()

const isLoading = ref(false)
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')

getRemoteConfig()
const handleSubmit = async () => {
  console.log('Form submitted', { email: email.value, firstName: firstName.value, lastName: lastName.value })
  if (isLoading.value) return
  const supabase = useSupabase()

  const { data: deleted, error: errorDeleted } = await supabase.rpc('is_not_deleted', { email_check: email.value })
  if (errorDeleted) console.error(errorDeleted)
  if (!deleted) {
    toast.error('Account is in error, please contact support')
    openMessenger()
    return
  }

  isLoading.value = true
  const { data: user, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
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
  try {
    await window.Reflio.signup(email.value)
  } catch (error) {
    console.error(error)
  }
  if (error || !user) {
    toast.error(error?.message || 'user not found')
    return
  }
  isLoading.value = false
  navigate(`/confirm_email?email=${encodeURI(email.value)}`)
}
</script>
