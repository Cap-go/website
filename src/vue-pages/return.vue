<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
const config = useRuntimeConfig()
const brand = config.public.brand
const domain = config.public.baseUrl
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <h1>{{ translations['return_policy_title'][props.locale] }}</h1>
    <p>{{ translations['last_updated'][props.locale] }}</p>
    <p>{{ translations['thank_you_for_shopping'][props.locale].replace('$1', brand) }}</p>
    <p>
      {{ translations['not_satisfied_policy'][props.locale] }}
      <a href="https://www.termsfeed.com/return-refund-policy-generator/" target="_blank">{{ translations['policy_generator'][props.locale] }}</a
      >.
    </p>
    <p>{{ translations['terms_applicable'][props.locale] }}</p>
    <h2>{{ translations['interpretation_and_definitions'][props.locale] }}</h2>
    <h3>{{ translations['interpretation'][props.locale] }}</h3>
    <p>{{ translations['interpretation_description'][props.locale] }}</p>
    <h3>{{ translations['definitions'][props.locale] }}</h3>
    <p>{{ translations['definitions_purpose_refund'][props.locale] }}</p>
    <ul>
      <li>
        <p><strong>Application</strong> {{ translations['application_definition_refund'][props.locale].replace('$1', brand) }}</p>
      </li>
      <li>
        <p><strong>Company</strong> {{ translations['company_definition'][props.locale] }}</p>
      </li>
      <li>
        <p><strong>Goods</strong> {{ translations['goods_definition'][props.locale] }}</p>
      </li>
      <li>
        <p><strong>Orders</strong> {{ translations['orders_definition'][props.locale] }}</p>
      </li>
      <li>
        <p><strong>Service</strong> {{ translations['service_definition'][props.locale] }}</p>
      </li>
      <li>
        <p><strong>You</strong> {{ translations['you_definition'][props.locale] }}</p>
      </li>
    </ul>
    <h2>{{ translations['order_cancellation_rights'][props.locale] }}</h2>
    <p>{{ translations['cancellation_period'][props.locale] }}</p>
    <p>{{ translations['cancellation_deadline'][props.locale] }}</p>
    <p>{{ translations['how_to_cancel'][props.locale] }}</p>
    <ul>
      <li>
        {{ translations['cancellation_link'][props.locale] }} <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
    <p>{{ translations['reimbursement_policy'][props.locale] }}</p>
    <h2>{{ translations['conditions_for_returns'][props.locale] }}</h2>
    <p>{{ translations['return_eligibility'][props.locale] }}</p>
    <ul>
      <li>{{ translations['purchase_timeframe'][props.locale] }}</li>
    </ul>
    <p>{{ translations['non_returnable_goods'][props.locale] }}</p>
    <ul>
      <li>{{ translations['custom_goods'][props.locale] }}</li>
      <li>{{ translations['perishable_goods'][props.locale] }}</li>
      <li>{{ translations['unsealed_goods'][props.locale] }}</li>
      <li>{{ translations['inseparable_goods'][props.locale] }}</li>
    </ul>
    <p>{{ translations['right_to_refuse'][props.locale] }}</p>
    <p>{{ translations['sale_items_policy'][props.locale] }}</p>
    <h2>{{ translations['returning_goods'][props.locale] }}</h2>
    <p>{{ translations['return_responsibility'][props.locale] }}</p>
    <p>{{ translations['return_address'][props.locale] }}</p>
    <p>{{ translations['return_shipping_disclaimer'][props.locale] }}</p>
    <h2>{{ translations['gifts'][props.locale] }}</h2>
    <p>{{ translations['gift_return_policy'][props.locale] }}</p>
    <p>{{ translations['non_gift_return_policy'][props.locale] }}</p>
    <h3>{{ translations['contact_us'][props.locale] }}</h3>
    <p>{{ translations['questions_about_policy'][props.locale] }}</p>
    <ul>
      <li>
        {{ translations['contact_link'][props.locale] }} <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
  </div>
</template>
