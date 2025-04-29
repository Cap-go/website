<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import * as m from '../paraglide/messages.js'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const domain = config.public.baseUrl
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ m.data_policy_title() }}</h1>
    <p>{{ m.data_policy_last_updated() }}</p>
    <p>{{ m.data_policy_intro() }}</p>
    <h2>{{ m.data_policy_what_we_collect_title() }}</h2>
    <p>{{ m.data_policy_no_tracking() }}</p>
    <p>{{ m.data_policy_goal() }}</p>
    <p>{{ m.data_policy_anonymous_measurement() }}</p>
    <h2>{{ m.data_policy_unique_users_title() }}</h2>
    <p>{{ m.data_policy_unique_users_intro() }}</p>
    <p>{{ m.data_policy_no_persistent_identifier() }}</p>
    <p>{{ m.data_policy_ip_user_agent() }}</p>
    <p>{{ m.data_policy_ip_accuracy() }}</p>
    <p>{{ m.data_policy_compliance_info() }}</p>
    <h2>{{ m.data_policy_ownership_title() }}</h2>
    <p>{{ m.data_policy_ownership_intro() }}</p>
    <p>{{ m.data_policy_ownership_statement() }}</p>
    <p>{{ m.data_policy_ownership_rights() }}</p>
    <ul>
      <li>{{ m.data_policy_data_protection_1() }}</li>
      <li>{{ m.data_policy_data_protection_2() }}</li>
      <li>{{ m.data_policy_data_protection_3() }}</li>
      <li>{{ m.data_policy_data_protection_4() }}</li>
    </ul>
    <p>{{ m.data_policy_account_deletion() }}</p>
    <p>{{ m.data_policy_permanent_deletion() }}</p>
    <h2>{{ m.data_policy_trust_title() }}</h2>
    <p>
      <a :href="`${domain}/`" rel="external nofollow noopener" target="_blank">{{ m.data_policy_trust_open_source() }}</a>
    </p>
    <p>{{ m.data_policy_trust_transparency() }}</p>
    <p>{{ m.data_policy_trust_importance() }}</p>
    <h2>{{ m.data_policy_gdpr_title() }}</h2>
    <h3>{{ m.data_policy_legal_basis_title() }}</h3>
    <p>{{ m.data_policy_legal_basis_intro() }}</p>
    <ul>
      <li>
        <strong>{{ m.data_policy_legal_basis_consent() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_contract() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_legal_obligations() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_vital_interests() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_public_interests() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_legitimate_interests() }}</strong>
      </li>
    </ul>
    <p>{{ m.data_policy_legal_basis_clarification() }}</p>
    <h3>{{ m.data_policy_gdpr_rights_title() }}</h3>
    <p>{{ m.data_policy_gdpr_rights_intro() }}</p>
    <p>{{ m.data_policy_gdpr_rights_list_intro() }}</p>
    <ul>
      <li>
        <strong>{{ m.data_policy_gdpr_right_access() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_correction() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_object() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_erasure() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_transfer() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_withdraw_consent() }}</strong>
      </li>
    </ul>
    <h3>{{ m.data_policy_gdpr_exercising_rights_title() }}</h3>
    <p>{{ m.data_policy_gdpr_exercising_rights_contact() }}</p>
    <p>{{ m.data_policy_gdpr_complaint_right() }}</p>
    <h2>{{ m.data_policy_ccpa_title() }}</h2>
    <p>{{ m.data_policy_ccpa_intro() }}</p>
    <h3>{{ m.data_policy_ccpa_categories_title() }}</h3>
    <p>{{ m.data_policy_ccpa_categories_intro() }}</p>
    <p>{{ m.data_policy_ccpa_categories_note() }}</p>
    <ul>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_a() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_a_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_a_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_b() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_b_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_b_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_c() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_c_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_c_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_d() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_d_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_d_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_e() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_e_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_e_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_f() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_f_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_f_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_g() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_g_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_g_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_h() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_h_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_h_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_i() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_i_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_i_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_j() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_j_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_j_collected() }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_k() }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_k_examples() }}</p>
        <p>{{ m.data_policy_ccpa_category_k_collected() }}</p>
      </li>
    </ul>
    <p>{{ m.data_policy_ccpa_info_sources_title() }}</p>
    <p>{{ m.data_policy_ccpa_info_sources_intro() }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_info_source_1() }}</li>
      <li>{{ m.data_policy_ccpa_info_source_2() }}</li>
      <li>{{ m.data_policy_ccpa_info_source_3() }}</li>
      <li>{{ m.data_policy_ccpa_info_source_4() }}</li>
    </ul>
    <h3>{{ m.data_policy_ccpa_use_of_info_title() }}</h3>
    <p>{{ m.data_policy_ccpa_use_of_info_intro() }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_use_of_info_1() }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_2() }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_3() }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_4() }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_5() }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_6() }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_7() }}</li>
    </ul>
    <h3>{{ m.data_policy_ccpa_info_sharing_title() }}</h3>
    <p>{{ m.data_policy_ccpa_info_sharing_intro() }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_info_sharing_1() }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_2() }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_3() }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_4() }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_5() }}</li>
    </ul>
    <h3>{{ m.data_policy_ccpa_sale_of_info_title() }}</h3>
    <p>{{ m.data_policy_ccpa_sale_of_info_definition() }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_info_note() }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_info_statement() }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_info_categories() }}</p>
    <h3>{{ m.data_policy_ccpa_share_of_info_title() }}</h3>
    <p>{{ m.data_policy_ccpa_share_of_info_statement() }}</p>
    <p>{{ m.data_policy_ccpa_share_of_info_categories() }}</p>
    <h3>{{ m.data_policy_ccpa_sale_of_minors_info_title() }}</h3>
    <p>{{ m.data_policy_ccpa_sale_of_minors_info_statement() }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_minors_info_policy() }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_minors_info_request() }}</p>
    <h3>{{ m.data_policy_ccpa_your_rights_title() }}</h3>
    <p>{{ m.data_policy_ccpa_your_rights_intro() }}</p>
    <ul>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_notice() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_request() }}</strong>
        <ul>
          <li>{{ m.data_policy_ccpa_right_to_request_1() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_2() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_3() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_4() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_5() }}</li>
          <li>
            {{ m.data_policy_ccpa_right_to_request_6() }}
            <ul>
              <li>{{ m.data_policy_ccpa_right_to_request_6_1() }}</li>
              <li>{{ m.data_policy_ccpa_right_to_request_6_2() }}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_opt_out() }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_delete() }}</strong>
        <ul>
          <li>{{ m.data_policy_ccpa_right_to_delete_1() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_2() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_3() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_4() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_5() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_6() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_7() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_8() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_9() }}</li>
        </ul>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_non_discrimination() }}</strong>
        <ul>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_1() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_2() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_3() }}</li>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_4() }}</li>
        </ul>
      </li>
    </ul>
    <h3>{{ m.data_policy_ccpa_exercising_rights_title() }}</h3>
    <p>{{ m.data_policy_ccpa_exercising_rights_contact() }}</p>
    <ul>
      <li>
        {{ m.data_policy_ccpa_exercising_rights_website().replace('$1', domain) }}
      </li>
    </ul>
    <p>{{ m.data_policy_ccpa_exercising_rights_authorized_agent() }}</p>
    <p>{{ m.data_policy_ccpa_exercising_rights_request_must() }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_exercising_rights_request_must_1() }}</li>
      <li>{{ m.data_policy_ccpa_exercising_rights_request_must_2() }}</li>
    </ul>
    <p>{{ m.data_policy_ccpa_exercising_rights_cannot_respond() }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_exercising_rights_cannot_respond_1() }}</li>
      <li>{{ m.data_policy_ccpa_exercising_rights_cannot_respond_2() }}</li>
    </ul>
    <p>{{ m.data_policy_ccpa_exercising_rights_disclosure() }}</p>
    <p>{{ m.data_policy_ccpa_exercising_rights_disclosure_period() }}</p>
    <p>{{ m.data_policy_ccpa_exercising_rights_data_portability() }}</p>
  </div>
</template>
