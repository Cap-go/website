<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import * as m from '../paraglide/messages.js'
import type { Locales } from '@/services/locale'

const config = useRuntimeConfig()
const domain = config.public.baseUrl

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <h1>{{ m.return_policy_title({}, { locale: props.locale }) }}</h1>
    <p>{{ m.last_updated({}, { locale: props.locale }) }}</p>
    <p>{{ m.thank_you_for_shopping({}, { locale: props.locale }) }}</p>
    <p>
      {{ m.not_satisfied_policy({}, { locale: props.locale }) }}
      <a href="https://www.termsfeed.com/return-refund-policy-generator/" target="_blank">{{ m.policy_generator({}, { locale: props.locale }) }}</a
      >.
    </p>
    <p>{{ m.terms_applicable({}, { locale: props.locale }) }}</p>
    <h2>{{ m.interpretation_and_definitions({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.interpretation({}, { locale: props.locale }) }}</h3>
    <p>{{ m.interpretation_description({}, { locale: props.locale }) }}</p>
    <h3>{{ m.definitions({}, { locale: props.locale }) }}</h3>
    <p>{{ m.definitions_purpose_refund({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <p><strong>Application</strong> {{ m.application_definition_refund({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p><strong>Company</strong> {{ m.company_definition({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p><strong>Goods</strong> {{ m.goods_definition({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p><strong>Orders</strong> {{ m.orders_definition({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p><strong>Service</strong> {{ m.service_definition({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p><strong>You</strong> {{ m.you_definition({}, { locale: props.locale }) }}</p>
      </li>
    </ul>
    <h2>{{ m.order_cancellation_rights({}, { locale: props.locale }) }}</h2>
    <p>{{ m.cancellation_period({}, { locale: props.locale }) }}</p>
    <p>{{ m.cancellation_deadline({}, { locale: props.locale }) }}</p>
    <p>{{ m.how_to_cancel({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        {{ m.cancellation_link({}, { locale: props.locale }) }} <a href="mailto:support@capgo.app" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
    <p>{{ m.reimbursement_policy({}, { locale: props.locale }) }}</p>
    <h2>{{ m.conditions_for_returns({}, { locale: props.locale }) }}</h2>
    <p>{{ m.return_eligibility({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.purchase_timeframe({}, { locale: props.locale }) }}</li>
    </ul>
    <p>{{ m.non_returnable_goods({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.custom_goods({}, { locale: props.locale }) }}</li>
      <li>{{ m.perishable_goods({}, { locale: props.locale }) }}</li>
      <li>{{ m.unsealed_goods({}, { locale: props.locale }) }}</li>
      <li>{{ m.inseparable_goods({}, { locale: props.locale }) }}</li>
    </ul>
    <p>{{ m.right_to_refuse({}, { locale: props.locale }) }}</p>
    <p>{{ m.sale_items_policy({}, { locale: props.locale }) }}</p>
    <h2>{{ m.returning_goods({}, { locale: props.locale }) }}</h2>
    <p>{{ m.return_responsibility({}, { locale: props.locale }) }}</p>
    <p>{{ m.return_address({}, { locale: props.locale }) }}</p>
    <p>{{ m.return_shipping_disclaimer({}, { locale: props.locale }) }}</p>
    <h2>{{ m.gifts({}, { locale: props.locale }) }}</h2>
    <p>{{ m.gift_return_policy({}, { locale: props.locale }) }}</p>
    <p>{{ m.non_gift_return_policy({}, { locale: props.locale }) }}</p>
    <h3>{{ m.contact_us({}, { locale: props.locale }) }}</h3>
    <p>{{ m.questions_about_policy({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        {{ m.contact_link({}, { locale: props.locale }) }} <a href="mailto:support@capgo.app" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
  </div>
</template>
