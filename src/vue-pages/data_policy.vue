<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import * as m from '@/paraglide/messages'
import { type Locales, defaultLocale } from '@/services/locale'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const domain = config.public.baseUrl
</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ m.data_policy_title({}, { locale: props.locale }) }}</h1>
    <p>{{ m.data_policy_last_updated({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_intro({}, { locale: props.locale }) }}</p>
    <h2>{{ m.data_policy_what_we_collect_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.data_policy_no_tracking({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_goal({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_anonymous_measurement({}, { locale: props.locale }) }}</p>
    <h2>{{ m.data_policy_unique_users_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.data_policy_unique_users_intro({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_no_persistent_identifier({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ip_user_agent({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ip_accuracy({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_compliance_info({}, { locale: props.locale }) }}</p>
    <h2>{{ m.data_policy_ownership_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.data_policy_ownership_intro({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ownership_statement({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ownership_rights({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.data_policy_data_protection_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_data_protection_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_data_protection_3({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_data_protection_4({}, { locale: props.locale }) }}</li>
    </ul>
    <p>{{ m.data_policy_account_deletion({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_permanent_deletion({}, { locale: props.locale }) }}</p>
    <h2>{{ m.data_policy_trust_title({}, { locale: props.locale }) }}</h2>
    <p>
      <a :href="`${domain}/`" rel="external nofollow noopener" target="_blank">{{ m.data_policy_trust_open_source({}, { locale: props.locale }) }}</a>
    </p>
    <p>{{ m.data_policy_trust_transparency({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_trust_importance({}, { locale: props.locale }) }}</p>
    <h2>{{ m.data_policy_gdpr_title({}, { locale: props.locale }) }}</h2>
    <h3>{{ m.data_policy_legal_basis_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_legal_basis_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <strong>{{ m.data_policy_legal_basis_consent({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_contract({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_legal_obligations({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_vital_interests({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_public_interests({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_legal_basis_legitimate_interests({}, { locale: props.locale }) }}</strong>
      </li>
    </ul>
    <p>{{ m.data_policy_legal_basis_clarification({}, { locale: props.locale }) }}</p>
    <h3>{{ m.data_policy_gdpr_rights_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_gdpr_rights_intro({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_gdpr_rights_list_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <strong>{{ m.data_policy_gdpr_right_access({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_correction({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_object({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_erasure({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_transfer({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_gdpr_right_withdraw_consent({}, { locale: props.locale }) }}</strong>
      </li>
    </ul>
    <h3>{{ m.data_policy_gdpr_exercising_rights_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_gdpr_exercising_rights_contact({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_gdpr_complaint_right({}, { locale: props.locale }) }}</p>
    <h2>{{ m.data_policy_ccpa_title({}, { locale: props.locale }) }}</h2>
    <p>{{ m.data_policy_ccpa_intro({}, { locale: props.locale }) }}</p>
    <h3>{{ m.data_policy_ccpa_categories_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_categories_intro({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_categories_note({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_a({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_a_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_a_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_b({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_b_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_b_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_c({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_c_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_c_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_d({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_d_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_d_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_e({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_e_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_e_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_f({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_f_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_f_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_g({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_g_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_g_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_h({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_h_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_h_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_i({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_i_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_i_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_j({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_j_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_j_collected({}, { locale: props.locale }) }}</p>
      </li>
      <li>
        <p>
          <strong>{{ m.data_policy_ccpa_category_k({}, { locale: props.locale }) }}</strong>
        </p>
        <p>{{ m.data_policy_ccpa_category_k_examples({}, { locale: props.locale }) }}</p>
        <p>{{ m.data_policy_ccpa_category_k_collected({}, { locale: props.locale }) }}</p>
      </li>
    </ul>
    <p>{{ m.data_policy_ccpa_info_sources_title({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_info_sources_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_info_source_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_info_source_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_info_source_3({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_info_source_4({}, { locale: props.locale }) }}</li>
    </ul>
    <h3>{{ m.data_policy_ccpa_use_of_info_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_use_of_info_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_use_of_info_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_3({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_4({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_5({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_6({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_use_of_info_7({}, { locale: props.locale }) }}</li>
    </ul>
    <h3>{{ m.data_policy_ccpa_info_sharing_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_info_sharing_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_info_sharing_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_2({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_3({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_4({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_info_sharing_5({}, { locale: props.locale }) }}</li>
    </ul>
    <h3>{{ m.data_policy_ccpa_sale_of_info_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_sale_of_info_definition({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_info_note({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_info_statement({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_info_categories({}, { locale: props.locale }) }}</p>
    <h3>{{ m.data_policy_ccpa_share_of_info_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_share_of_info_statement({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_share_of_info_categories({}, { locale: props.locale }) }}</p>
    <h3>{{ m.data_policy_ccpa_sale_of_minors_info_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_sale_of_minors_info_statement({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_minors_info_policy({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_sale_of_minors_info_request({}, { locale: props.locale }) }}</p>
    <h3>{{ m.data_policy_ccpa_your_rights_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_your_rights_intro({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_notice({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_request({}, { locale: props.locale }) }}</strong>
        <ul>
          <li>{{ m.data_policy_ccpa_right_to_request_1({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_2({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_3({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_4({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_request_5({}, { locale: props.locale }) }}</li>
          <li>
            {{ m.data_policy_ccpa_right_to_request_6({}, { locale: props.locale }) }}
            <ul>
              <li>{{ m.data_policy_ccpa_right_to_request_6_1({}, { locale: props.locale }) }}</li>
              <li>{{ m.data_policy_ccpa_right_to_request_6_2({}, { locale: props.locale }) }}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_opt_out({}, { locale: props.locale }) }}</strong>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_delete({}, { locale: props.locale }) }}</strong>
        <ul>
          <li>{{ m.data_policy_ccpa_right_to_delete_1({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_2({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_3({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_4({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_5({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_6({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_7({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_8({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_delete_9({}, { locale: props.locale }) }}</li>
        </ul>
      </li>
      <li>
        <strong>{{ m.data_policy_ccpa_right_to_non_discrimination({}, { locale: props.locale }) }}</strong>
        <ul>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_1({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_2({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_3({}, { locale: props.locale }) }}</li>
          <li>{{ m.data_policy_ccpa_right_to_non_discrimination_4({}, { locale: props.locale }) }}</li>
        </ul>
      </li>
    </ul>
    <h3>{{ m.data_policy_ccpa_exercising_rights_title({}, { locale: props.locale }) }}</h3>
    <p>{{ m.data_policy_ccpa_exercising_rights_contact({}, { locale: props.locale }) }}</p>
    <ul>
      <li>
        {{ m.data_policy_ccpa_exercising_rights_website({}, { locale: props.locale }).replace('$1', domain) }}
      </li>
    </ul>
    <p>{{ m.data_policy_ccpa_exercising_rights_authorized_agent({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_exercising_rights_request_must({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_exercising_rights_request_must_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_exercising_rights_request_must_2({}, { locale: props.locale }) }}</li>
    </ul>
    <p>{{ m.data_policy_ccpa_exercising_rights_cannot_respond({}, { locale: props.locale }) }}</p>
    <ul>
      <li>{{ m.data_policy_ccpa_exercising_rights_cannot_respond_1({}, { locale: props.locale }) }}</li>
      <li>{{ m.data_policy_ccpa_exercising_rights_cannot_respond_2({}, { locale: props.locale }) }}</li>
    </ul>
    <p>{{ m.data_policy_ccpa_exercising_rights_disclosure({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_exercising_rights_disclosure_period({}, { locale: props.locale }) }}</p>
    <p>{{ m.data_policy_ccpa_exercising_rights_data_portability({}, { locale: props.locale }) }}</p>
  </div>
</template>
