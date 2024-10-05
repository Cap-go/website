<script setup lang="ts">
import { type Locales } from '@/services/locale'
import { getRemoteConfig, useSupabase } from '@/services/supabase'
import translations from '@/services/translations'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
  locale: Locales
}>()

const isResending = ref(false)
getRemoteConfig()

async function handleResend() {
  const urlParams = new URLSearchParams(window.location.search)
  const email = urlParams.get('email')
  console.log('email', email)
  if (!email) {
    toast.error(translations['email_is_required'][props.locale])
    return
  }
  const { error } = await useSupabase().auth.resend({
    type: 'signup',
    email: email,
  })
  if (error) toast.error(error.message)
  else toast.success('Email sent')
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="text-center p-6">
        <div class="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-4 text-black">{{ translations['confirm_email'][props.locale] }}</h2>
        <p class="text-gray-600 mb-4">{{ translations['please_open_your_mailbox_to_verify'][props.locale] }}</p>
        <p class="text-gray-600 mb-6">
          {{ translations['didnt_receive_confirmation_email'][props.locale] }}
          <button @click="handleResend" :disabled="isResending" class="text-blue-600 font-semibold ml-1 focus:outline-none">
            {{ isResending ? translations['resending'][props.locale] : translations['resend'][props.locale] }}
          </button>
        </p>
        <a
          href="mailto:"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {{ translations['open_mailbox'][props.locale] }}
        </a>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-center">
        <p class="text-blue-600 font-semibold">{{ translations['thank_you_for_choosing_capgo'][props.locale] }}</p>
      </div>
    </div>
  </div>
</template>
