<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales, defaultLocale } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{ locale: Locales }>()
const config = useRuntimeConfig()
const domain = config.public.baseUrl
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <span class="text-xs" v-if="props.locale !== defaultLocale">
      Note: This is an automatic translated page from it's English source. Only the English version should be used for legal actions, associated with only link to English source.
    </span>
    <h1>{{ translations['data_policy_title'][props.locale] }}</h1>
    <p>{{ translations['data_policy_last_updated'][props.locale] }}</p>
    <p>{{ translations['data_policy_intro'][props.locale] }}</p>
    <h2>{{ translations['data_policy_what_we_collect_title'][props.locale] }}</h2>
    <p>{{ translations['data_policy_no_tracking'][props.locale] }}</p>
    <p>{{ translations['data_policy_goal'][props.locale] }}</p>
    <p>{{ translations['data_policy_anonymous_measurement'][props.locale] }}</p>
    <h2>{{ translations['data_policy_unique_users_title'][props.locale] }}</h2>
    <p>{{ translations['data_policy_unique_users_intro'][props.locale] }}</p>
    <p>{{ translations['data_policy_no_persistent_identifier'][props.locale] }}</p>
    <p>{{ translations['data_policy_ip_user_agent'][props.locale] }}</p>
    <p>{{ translations['data_policy_ip_accuracy'][props.locale] }}</p>
    <p>{{ translations['data_policy_compliance_info'][props.locale] }}</p>
    <h2>{{ translations['data_policy_ownership_title'][props.locale] }}</h2>
    <p>{{ translations['data_policy_ownership_intro'][props.locale] }}</p>
    <p>{{ translations['data_policy_ownership_statement'][props.locale] }}</p>
    <p>{{ translations['data_policy_ownership_rights'][props.locale] }}</p>
    <ul>
      <li>{{ translations['data_policy_data_protection_1'][props.locale] }}</li>
      <li>{{ translations['data_policy_data_protection_2'][props.locale] }}</li>
      <li>{{ translations['data_policy_data_protection_3'][props.locale] }}</li>
      <li>{{ translations['data_policy_data_protection_4'][props.locale] }}</li>
    </ul>
    <p>{{ translations['data_policy_account_deletion'][props.locale] }}</p>
    <p>{{ translations['data_policy_permanent_deletion'][props.locale] }}</p>
    <h2>{{ translations['data_policy_trust_title'][props.locale] }}</h2>
    <p>
      <a :href="`${domain}/`" rel="external nofollow noopener" target="_blank">{{ translations['data_policy_trust_open_source'][props.locale] }}</a>
    </p>
    <p>{{ translations['data_policy_trust_transparency'][props.locale] }}</p>
    <p>{{ translations['data_policy_trust_importance'][props.locale] }}</p>
    <h2>{{ translations['data_policy_gdpr_title'][props.locale] }}</h2>
    <h3>{{ translations['data_policy_legal_basis_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_legal_basis_intro'][props.locale] }}</p>
    <ul>
      <li>
        <strong>{{ translations['data_policy_legal_basis_consent'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_legal_basis_contract'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_legal_basis_legal_obligations'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_legal_basis_vital_interests'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_legal_basis_public_interests'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_legal_basis_legitimate_interests'][props.locale] }}</strong>
      </li>
    </ul>
    <p>{{ translations['data_policy_legal_basis_clarification'][props.locale] }}</p>
    <h3>{{ translations['data_policy_gdpr_rights_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_gdpr_rights_intro'][props.locale] }}</p>
    <p>{{ translations['data_policy_gdpr_rights_list_intro'][props.locale] }}</p>
    <ul>
      <li>
        <strong>{{ translations['data_policy_gdpr_right_access'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_gdpr_right_correction'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_gdpr_right_object'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_gdpr_right_erasure'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_gdpr_right_transfer'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_gdpr_right_withdraw_consent'][props.locale] }}</strong>
      </li>
    </ul>
    <h3>{{ translations['data_policy_gdpr_exercising_rights_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_gdpr_exercising_rights_contact'][props.locale] }}</p>
    <p>{{ translations['data_policy_gdpr_complaint_right'][props.locale] }}</p>
    <h2>{{ translations['data_policy_ccpa_title'][props.locale] }}</h2>
    <p>{{ translations['data_policy_ccpa_intro'][props.locale] }}</p>
    <h3>{{ translations['data_policy_ccpa_categories_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_categories_intro'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_categories_note'][props.locale] }}</p>
    <ul>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_a'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_a_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_a_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_b'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_b_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_b_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_c'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_c_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_c_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_d'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_d_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_d_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_e'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_e_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_e_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_f'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_f_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_f_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_g'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_g_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_g_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_h'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_h_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_h_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_i'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_i_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_i_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_j'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_j_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_j_collected'][props.locale] }}</p>
      </li>
      <li>
        <p>
          <strong>{{ translations['data_policy_ccpa_category_k'][props.locale] }}</strong>
        </p>
        <p>{{ translations['data_policy_ccpa_category_k_examples'][props.locale] }}</p>
        <p>{{ translations['data_policy_ccpa_category_k_collected'][props.locale] }}</p>
      </li>
    </ul>
    <p>{{ translations['data_policy_ccpa_info_sources_title'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_info_sources_intro'][props.locale] }}</p>
    <ul>
      <li>{{ translations['data_policy_ccpa_info_source_1'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_info_source_2'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_info_source_3'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_info_source_4'][props.locale] }}</li>
    </ul>
    <h3>{{ translations['data_policy_ccpa_use_of_info_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_use_of_info_intro'][props.locale] }}</p>
    <ul>
      <li>{{ translations['data_policy_ccpa_use_of_info_1'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_use_of_info_2'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_use_of_info_3'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_use_of_info_4'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_use_of_info_5'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_use_of_info_6'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_use_of_info_7'][props.locale] }}</li>
    </ul>
    <h3>{{ translations['data_policy_ccpa_info_sharing_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_info_sharing_intro'][props.locale] }}</p>
    <ul>
      <li>{{ translations['data_policy_ccpa_info_sharing_1'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_info_sharing_2'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_info_sharing_3'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_info_sharing_4'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_info_sharing_5'][props.locale] }}</li>
    </ul>
    <h3>{{ translations['data_policy_ccpa_sale_of_info_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_sale_of_info_definition'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_sale_of_info_note'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_sale_of_info_statement'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_sale_of_info_categories'][props.locale] }}</p>
    <h3>{{ translations['data_policy_ccpa_share_of_info_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_share_of_info_statement'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_share_of_info_categories'][props.locale] }}</p>
    <h3>{{ translations['data_policy_ccpa_sale_of_minors_info_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_sale_of_minors_info_statement'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_sale_of_minors_info_policy'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_sale_of_minors_info_request'][props.locale] }}</p>
    <h3>{{ translations['data_policy_ccpa_your_rights_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_your_rights_intro'][props.locale] }}</p>
    <ul>
      <li>
        <strong>{{ translations['data_policy_ccpa_right_to_notice'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_ccpa_right_to_request'][props.locale] }}</strong>
        <ul>
          <li>{{ translations['data_policy_ccpa_right_to_request_1'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_request_2'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_request_3'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_request_4'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_request_5'][props.locale] }}</li>
          <li>
            {{ translations['data_policy_ccpa_right_to_request_6'][props.locale] }}
            <ul>
              <li>{{ translations['data_policy_ccpa_right_to_request_6_1'][props.locale] }}</li>
              <li>{{ translations['data_policy_ccpa_right_to_request_6_2'][props.locale] }}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <strong>{{ translations['data_policy_ccpa_right_to_opt_out'][props.locale] }}</strong>
      </li>
      <li>
        <strong>{{ translations['data_policy_ccpa_right_to_delete'][props.locale] }}</strong>
        <ul>
          <li>{{ translations['data_policy_ccpa_right_to_delete_1'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_2'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_3'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_4'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_5'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_6'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_7'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_8'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_delete_9'][props.locale] }}</li>
        </ul>
      </li>
      <li>
        <strong>{{ translations['data_policy_ccpa_right_to_non_discrimination'][props.locale] }}</strong>
        <ul>
          <li>{{ translations['data_policy_ccpa_right_to_non_discrimination_1'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_non_discrimination_2'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_non_discrimination_3'][props.locale] }}</li>
          <li>{{ translations['data_policy_ccpa_right_to_non_discrimination_4'][props.locale] }}</li>
        </ul>
      </li>
    </ul>
    <h3>{{ translations['data_policy_ccpa_exercising_rights_title'][props.locale] }}</h3>
    <p>{{ translations['data_policy_ccpa_exercising_rights_contact'][props.locale] }}</p>
    <ul>
      <li>
        {{ translations['data_policy_ccpa_exercising_rights_website'][props.locale].replace('$1', domain) }}
      </li>
    </ul>
    <p>{{ translations['data_policy_ccpa_exercising_rights_authorized_agent'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_exercising_rights_request_must'][props.locale] }}</p>
    <ul>
      <li>{{ translations['data_policy_ccpa_exercising_rights_request_must_1'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_exercising_rights_request_must_2'][props.locale] }}</li>
    </ul>
    <p>{{ translations['data_policy_ccpa_exercising_rights_cannot_respond'][props.locale] }}</p>
    <ul>
      <li>{{ translations['data_policy_ccpa_exercising_rights_cannot_respond_1'][props.locale] }}</li>
      <li>{{ translations['data_policy_ccpa_exercising_rights_cannot_respond_2'][props.locale] }}</li>
    </ul>
    <p>{{ translations['data_policy_ccpa_exercising_rights_disclosure'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_exercising_rights_disclosure_period'][props.locale] }}</p>
    <p>{{ translations['data_policy_ccpa_exercising_rights_data_portability'][props.locale] }}</p>
  </div>
</template>
