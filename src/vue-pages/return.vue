<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import * as m from "../paraglide/messages.js"

const config = useRuntimeConfig()
const domain = config.public.baseUrl
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <h1>{{ m.return_policy_title()}}</h1>
    <p>{{ m.last_updated()}}</p>
    <p>{{ m.thank_you_for_shopping()}}</p>
    <p>
      {{ m.not_satisfied_policy()}}
      <a href="https://www.termsfeed.com/return-refund-policy-generator/" target="_blank">{{ m.policy_generator()}}</a>.
    </p>
    <p>{{ m.terms_applicable()}}</p>
    <h2>{{ m.interpretation_and_definitions()}}</h2>
    <h3>{{ m.interpretation()}}</h3>
    <p>{{ m.interpretation_description()}}</p>
    <h3>{{ m.definitions()}}</h3>
    <p>{{ m.definitions_purpose_refund()}}</p>
    <ul>
      <li>
        <p><strong>Application</strong> {{ m.application_definition_refund()}}</p>
      </li>
      <li>
        <p><strong>Company</strong> {{ m.company_definition()}}</p>
      </li>
      <li>
        <p><strong>Goods</strong> {{ m.goods_definition()}}</p>
      </li>
      <li>
        <p><strong>Orders</strong> {{ m.orders_definition()}}</p>
      </li>
      <li>
        <p><strong>Service</strong> {{ m.service_definition()}}</p>
      </li>
      <li>
        <p><strong>You</strong> {{ m.you_definition()}}</p>
      </li>
    </ul>
    <h2>{{ m.order_cancellation_rights()}}</h2>
    <p>{{ m.cancellation_period()}}</p>
    <p>{{ m.cancellation_deadline()}}</p>
    <p>{{ m.how_to_cancel()}}</p>
    <ul>
      <li>
        {{ m.cancellation_link() }} <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
    <p>{{ m.reimbursement_policy()}}</p>
    <h2>{{ m.conditions_for_returns()}}</h2>
    <p>{{ m.return_eligibility()}}</p>
    <ul>
      <li>{{ m.purchase_timeframe()}}</li>
    </ul>
    <p>{{ m.non_returnable_goods()}}</p>
    <ul>
      <li>{{ m.custom_goods()}}</li>
      <li>{{ m.perishable_goods()}}</li>
      <li>{{ m.unsealed_goods()}}</li>
      <li>{{ m.inseparable_goods()}}</li>
    </ul>
    <p>{{ m.right_to_refuse()}}</p>
    <p>{{ m.sale_items_policy()}}</p>
    <h2>{{ m.returning_goods()}}</h2>
    <p>{{ m.return_responsibility()}}</p>
    <p>{{ m.return_address()}}</p>
    <p>{{ m.return_shipping_disclaimer()}}</p>
    <h2>{{ m.gifts()}}</h2>
    <p>{{ m.gift_return_policy()}}</p>
    <p>{{ m.non_gift_return_policy()}}</p>
    <h3>{{ m.contact_us()}} </h3>
    <p>{{ m.questions_about_policy()}}</p>
    <ul>
      <li>
          {{ m.contact_link() }} <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
  </div>
</template>
