<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import * as m from '../paraglide/messages.js'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
</script>

<template>
  <section class="py-12 bg-gray-50 sm:py-16">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="mx-auto text-center">
        <h1 class="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-6xl">{{ m.trust_and_security() }}</h1>
        <p class="mt-6 text-xl font-normal text-gray-600 font-pj">{{ m.trust_and_security_description() }}</p>
      </div>

      <div class="mt-16 space-y-16">
        <div class="p-8 bg-white shadow-xl rounded-3xl sm:p-12">
          <h2 class="text-3xl font-bold text-gray-900">{{ m.product_security() }}</h2>
          <ul class="mt-8 space-y-5 text-lg text-gray-600 list-disc list-inside">
            <li>{{ m.trust_soc2_certification() }}</li>
            <li>
              {{ m.source_code_protection_1() }}
              <a href="https://github.com/Cap-go/capgo" class="text-blue-500 underline underline-current" target="_blank">GitHub</a>.
              {{ m.source_code_protection_2() }}
              <a href="https://sonarcloud.io/summary/overall?id=Cap-go_capgo&branch=main" class="text-blue-500 underline underline-current" target="_blank">SonarCloud</a>
              {{ m.and() }}
              <a href="https://snyk.io/test/github/Cap-go/capgo" class="text-blue-500 underline underline-current" target="_blank">Snyk</a>
              {{ m.source_code_protection_3() }}
            </li>
            <li class="flex items-center gap-2">
              SonarCloud:
              <a href="https://sonarcloud.io/summary/new_code?id=Cap-go_capgo" target="_blank">
                <img src="https://sonarcloud.io/api/project_badges/measure?project=Cap-go_capgo&metric=security_rating" alt="Security Rating" />
              </a>
              <a href="https://sonarcloud.io/summary/new_code?id=Cap-go_capgo" target="_blank">
                <img src="https://sonarcloud.io/api/project_badges/measure?project=Cap-go_capgo&metric=vulnerabilities" alt="Vulnerabilities" />
              </a>
            </li>
            <li>{{ m.access_control() }}</li>
          </ul>
        </div>

        <div class="p-8 bg-white shadow-xl rounded-3xl sm:p-12">
          <h2 class="text-3xl font-bold text-gray-900">{{ m.data_security() }}</h2>
          <ul class="mt-8 space-y-5 text-lg text-gray-600 list-disc list-inside">
            <li>{{ m.encryption_communication() }}</li>
            <li>{{ m.source_code_encryption() }}</li>
          </ul>
        </div>

        <div class="p-8 bg-white shadow-xl rounded-3xl sm:p-12">
          <h2 class="text-3xl font-bold text-gray-900">{{ m.network_security() }}</h2>
          <ul class="mt-8 space-y-5 text-lg text-gray-600 list-disc list-inside">
            <li>{{ m.vulnerability_scanning() }}</li>
            <li>{{ m.architecture() }}</li>
          </ul>
        </div>

        <div class="p-8 bg-white shadow-xl rounded-3xl sm:p-12">
          <h2 class="text-3xl font-bold text-gray-900">{{ m.application_security() }}</h2>
          <ul class="mt-8 space-y-5 text-lg text-gray-600 list-disc list-inside">
            <li>{{ m.secure_coding() }}</li>
            <li>{{ m.site_reliability() }} <a href="https://status.capgo.app/" class="text-blue-500 underline underline-current" target="_blank">Uptime Monitoring</a>.</li>
            <!-- link to update monitoring: https://status.capgo.app/ -->
            <li>{{ m.application_penetration_testing() }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
