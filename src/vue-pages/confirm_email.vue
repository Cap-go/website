<script setup lang="ts">
import { getRemoteConfig, useSupabase } from '@/services/supabase'
import * as m from "../paraglide/messages.js"
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const isResending = ref(false)
getRemoteConfig()

async function handleResend() {
  const urlParams = new URLSearchParams(window.location.search)
  const email = urlParams.get('email')
  console.log('email', email)
  if (!email) {
    toast.error(m.email_is_required())
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
  <div class="flex items-center justify-center min-h-screen p-4 bg-slate-900">
    <div class="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-xl">
      <div class="p-6 text-center">
        <div class="flex items-center justify-center w-16 h-16 p-3 mx-auto mb-4 bg-green-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="mb-4 text-2xl font-bold text-black">{{ m.confirm_email() }}</h2>
        <p class="mb-4 text-gray-600">{{ m.please_open_your_mailbox_to_verify() }}</p>
        <p class="mb-6 text-gray-600">
          {{ m.didnt_receive_confirmation_email() }}
          <button @click="handleResend" :disabled="isResending" class="ml-1 font-semibold text-blue-600 focus:outline-none">
            {{ isResending ? m.resending() : m.resend() }}
          </button>
        </p>
        <a
          href="mailto:"
          class="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-600 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {{ m.open_mailbox() }}
        </a>
      </div>
      <div class="px-4 py-3 text-center bg-gray-50">
        <p class="font-semibold text-blue-600">{{ m.thank_you_for_choosing_capgo() }}</p>
      </div>
    </div>
  </div>
</template>
