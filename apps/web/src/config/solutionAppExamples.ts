import type { MessageKey } from '@/copy/messages'
import type { SolutionStoreAppId } from './solutionStoreApps'

export type SolutionAppExampleKey =
  | 'agencies'
  | 'beta-testing'
  | 'build-without-mac'
  | 'cordova-to-capacitor'
  | 'cordova-to-capacitor-ai'
  | 'direct-updates'
  | 'ecommerce'
  | 'enterprise'
  | 'fintech'
  | 'healthcare'
  | 'ionic-enterprise-plugins'
  | 'lovable-vibecoding-to-mobile'
  | 'pr-preview'
  | 'production-updates'
  | 'qsr'
  | 'set-and-forget'
  | 'solo-developers'
  | 'startups'
  | 'version-targeting'
  | 'white-label'

export interface SolutionAppReference {
  appId: SolutionStoreAppId
  noteKey: MessageKey
}

export interface SolutionAppExample {
  labelKey: MessageKey
  headlineKey: MessageKey
  useCaseKey: MessageKey
  apps: SolutionAppReference[]
  playKeys: MessageKey[]
}

export const solutionAppExamples = {
  agencies: {
    labelKey: 'solution_app_examples_agencies_label',
    headlineKey: 'solution_app_examples_agencies_headline',
    useCaseKey: 'solution_app_examples_agencies_use_case',
    apps: [
      { appId: 'com.freelancer.android.messenger', noteKey: 'solution_app_examples_agencies_app_1_note' },
      { appId: 'com.mushroomcloud.cars', noteKey: 'solution_app_examples_agencies_app_2_note' },
      { appId: 'com.kai.kaiticketing', noteKey: 'solution_app_examples_agencies_app_3_note' },
    ],
    playKeys: ['solution_app_examples_agencies_play_1', 'solution_app_examples_agencies_play_2', 'solution_app_examples_agencies_play_3'],
  },
  'beta-testing': {
    labelKey: 'solution_app_examples_beta_testing_label',
    headlineKey: 'solution_app_examples_beta_testing_headline',
    useCaseKey: 'solution_app_examples_beta_testing_use_case',
    apps: [
      { appId: 'org.lichess.mobileapp', noteKey: 'solution_app_examples_beta_testing_app_1_note' },
      { appId: 'com.studysmarter', noteKey: 'solution_app_examples_beta_testing_app_2_note' },
      { appId: 'com.windyty.android', noteKey: 'solution_app_examples_beta_testing_app_3_note' },
    ],
    playKeys: ['solution_app_examples_beta_testing_play_1', 'solution_app_examples_beta_testing_play_2', 'solution_app_examples_beta_testing_play_3'],
  },
  'build-without-mac': {
    labelKey: 'solution_app_examples_build_without_mac_label',
    headlineKey: 'solution_app_examples_build_without_mac_headline',
    useCaseKey: 'solution_app_examples_build_without_mac_use_case',
    apps: [
      { appId: 'uk.co.parentmail.parentmail', noteKey: 'solution_app_examples_build_without_mac_app_1_note' },
      { appId: 'com.kai.kaiticketing', noteKey: 'solution_app_examples_build_without_mac_app_2_note' },
      { appId: 'br.com.oi.tecnicovirtual', noteKey: 'solution_app_examples_build_without_mac_app_3_note' },
    ],
    playKeys: ['solution_app_examples_build_without_mac_play_1', 'solution_app_examples_build_without_mac_play_2', 'solution_app_examples_build_without_mac_play_3'],
  },
  'cordova-to-capacitor': {
    labelKey: 'solution_app_examples_cordova_to_capacitor_label',
    headlineKey: 'solution_app_examples_cordova_to_capacitor_headline',
    useCaseKey: 'solution_app_examples_cordova_to_capacitor_use_case',
    apps: [
      { appId: 'br.jus.tse.resultados', noteKey: 'solution_app_examples_cordova_to_capacitor_app_1_note' },
      { appId: 'com.windyty.android', noteKey: 'solution_app_examples_cordova_to_capacitor_app_2_note' },
      { appId: 'de.burgerking.kingfinder', noteKey: 'solution_app_examples_cordova_to_capacitor_app_3_note' },
    ],
    playKeys: ['solution_app_examples_cordova_to_capacitor_play_1', 'solution_app_examples_cordova_to_capacitor_play_2', 'solution_app_examples_cordova_to_capacitor_play_3'],
  },
  'cordova-to-capacitor-ai': {
    labelKey: 'solution_app_examples_cordova_to_capacitor_ai_label',
    headlineKey: 'solution_app_examples_cordova_to_capacitor_ai_headline',
    useCaseKey: 'solution_app_examples_cordova_to_capacitor_ai_use_case',
    apps: [
      { appId: 'com.mushroomcloud.cars', noteKey: 'solution_app_examples_cordova_to_capacitor_ai_app_1_note' },
      { appId: 'com.infrasoft.uboi', noteKey: 'solution_app_examples_cordova_to_capacitor_ai_app_2_note' },
      { appId: 'com.kai.kaiticketing', noteKey: 'solution_app_examples_cordova_to_capacitor_ai_app_3_note' },
    ],
    playKeys: [
      'solution_app_examples_cordova_to_capacitor_ai_play_1',
      'solution_app_examples_cordova_to_capacitor_ai_play_2',
      'solution_app_examples_cordova_to_capacitor_ai_play_3',
    ],
  },
  'direct-updates': {
    labelKey: 'solution_app_examples_direct_updates_label',
    headlineKey: 'solution_app_examples_direct_updates_headline',
    useCaseKey: 'solution_app_examples_direct_updates_use_case',
    apps: [
      { appId: 'gov.fema.mobile.android', noteKey: 'solution_app_examples_direct_updates_app_1_note' },
      { appId: 'br.gov.datasus.cnsdigital', noteKey: 'solution_app_examples_direct_updates_app_2_note' },
      { appId: 'br.jus.tse.eleitoral.etitulo', noteKey: 'solution_app_examples_direct_updates_app_3_note' },
    ],
    playKeys: ['solution_app_examples_direct_updates_play_1', 'solution_app_examples_direct_updates_play_2', 'solution_app_examples_direct_updates_play_3'],
  },
  ecommerce: {
    labelKey: 'solution_app_examples_ecommerce_label',
    headlineKey: 'solution_app_examples_ecommerce_headline',
    useCaseKey: 'solution_app_examples_ecommerce_use_case',
    apps: [
      { appId: 'com.morrisons.matchandmore.app', noteKey: 'solution_app_examples_ecommerce_app_1_note' },
      { appId: 'net.groceryshopping.SproutsFarmersMarket', noteKey: 'solution_app_examples_ecommerce_app_2_note' },
      { appId: 'com.wegmans.wegmansapp', noteKey: 'solution_app_examples_ecommerce_app_3_note' },
    ],
    playKeys: ['solution_app_examples_ecommerce_play_1', 'solution_app_examples_ecommerce_play_2', 'solution_app_examples_ecommerce_play_3'],
  },
  enterprise: {
    labelKey: 'solution_app_examples_enterprise_label',
    headlineKey: 'solution_app_examples_enterprise_headline',
    useCaseKey: 'solution_app_examples_enterprise_use_case',
    apps: [
      { appId: 'com.paylocity.paylocitymobile', noteKey: 'solution_app_examples_enterprise_app_1_note' },
      { appId: 'ua.vodafone.myvodafone', noteKey: 'solution_app_examples_enterprise_app_2_note' },
      { appId: 'com.orange.miorange', noteKey: 'solution_app_examples_enterprise_app_3_note' },
    ],
    playKeys: ['solution_app_examples_enterprise_play_1', 'solution_app_examples_enterprise_play_2', 'solution_app_examples_enterprise_play_3'],
  },
  fintech: {
    labelKey: 'solution_app_examples_fintech_label',
    headlineKey: 'solution_app_examples_fintech_headline',
    useCaseKey: 'solution_app_examples_fintech_use_case',
    apps: [
      { appId: 'com.infrasoft.uboi', noteKey: 'solution_app_examples_fintech_app_1_note' },
      { appId: 'com.IndianBank.IndOASIS', noteKey: 'solution_app_examples_fintech_app_2_note' },
      { appId: 'com.orange.mobile.orangemoney', noteKey: 'solution_app_examples_fintech_app_3_note' },
    ],
    playKeys: ['solution_app_examples_fintech_play_1', 'solution_app_examples_fintech_play_2', 'solution_app_examples_fintech_play_3'],
  },
  healthcare: {
    labelKey: 'solution_app_examples_healthcare_label',
    headlineKey: 'solution_app_examples_healthcare_headline',
    useCaseKey: 'solution_app_examples_healthcare_use_case',
    apps: [
      { appId: 'au.com.hotdoc.android.hotdoc', noteKey: 'solution_app_examples_healthcare_app_1_note' },
      { appId: 'br.gov.datasus.cnsdigital', noteKey: 'solution_app_examples_healthcare_app_2_note' },
      { appId: 'br.com.beneficiario.odontoprev', noteKey: 'solution_app_examples_healthcare_app_3_note' },
    ],
    playKeys: ['solution_app_examples_healthcare_play_1', 'solution_app_examples_healthcare_play_2', 'solution_app_examples_healthcare_play_3'],
  },
  'ionic-enterprise-plugins': {
    labelKey: 'solution_app_examples_ionic_enterprise_plugins_label',
    headlineKey: 'solution_app_examples_ionic_enterprise_plugins_headline',
    useCaseKey: 'solution_app_examples_ionic_enterprise_plugins_use_case',
    apps: [
      { appId: 'ua.vodafone.myvodafone', noteKey: 'solution_app_examples_ionic_enterprise_plugins_app_1_note' },
      { appId: 'com.swisscom.myswisscom', noteKey: 'solution_app_examples_ionic_enterprise_plugins_app_2_note' },
      { appId: 'com.orange.miorange', noteKey: 'solution_app_examples_ionic_enterprise_plugins_app_3_note' },
    ],
    playKeys: [
      'solution_app_examples_ionic_enterprise_plugins_play_1',
      'solution_app_examples_ionic_enterprise_plugins_play_2',
      'solution_app_examples_ionic_enterprise_plugins_play_3',
    ],
  },
  'lovable-vibecoding-to-mobile': {
    labelKey: 'solution_app_examples_lovable_vibecoding_to_mobile_label',
    headlineKey: 'solution_app_examples_lovable_vibecoding_to_mobile_headline',
    useCaseKey: 'solution_app_examples_lovable_vibecoding_to_mobile_use_case',
    apps: [
      { appId: 'com.greetingsisland.sam', noteKey: 'solution_app_examples_lovable_vibecoding_to_mobile_app_1_note' },
      { appId: 'com.jernung.infinite.jpn', noteKey: 'solution_app_examples_lovable_vibecoding_to_mobile_app_2_note' },
      { appId: 'com.studysmarter', noteKey: 'solution_app_examples_lovable_vibecoding_to_mobile_app_3_note' },
    ],
    playKeys: [
      'solution_app_examples_lovable_vibecoding_to_mobile_play_1',
      'solution_app_examples_lovable_vibecoding_to_mobile_play_2',
      'solution_app_examples_lovable_vibecoding_to_mobile_play_3',
    ],
  },
  'pr-preview': {
    labelKey: 'solution_app_examples_pr_preview_label',
    headlineKey: 'solution_app_examples_pr_preview_headline',
    useCaseKey: 'solution_app_examples_pr_preview_use_case',
    apps: [
      { appId: 'com.studysmarter', noteKey: 'solution_app_examples_pr_preview_app_1_note' },
      { appId: 'com.polleverywhere.mobile', noteKey: 'solution_app_examples_pr_preview_app_2_note' },
      { appId: 'org.lichess.mobileapp', noteKey: 'solution_app_examples_pr_preview_app_3_note' },
    ],
    playKeys: ['solution_app_examples_pr_preview_play_1', 'solution_app_examples_pr_preview_play_2', 'solution_app_examples_pr_preview_play_3'],
  },
  'production-updates': {
    labelKey: 'solution_app_examples_production_updates_label',
    headlineKey: 'solution_app_examples_production_updates_headline',
    useCaseKey: 'solution_app_examples_production_updates_use_case',
    apps: [
      { appId: 'com.windyty.android', noteKey: 'solution_app_examples_production_updates_app_1_note' },
      { appId: 'air.com.playtika.slotomania', noteKey: 'solution_app_examples_production_updates_app_2_note' },
      { appId: 'com.playtika.caesarscasino', noteKey: 'solution_app_examples_production_updates_app_3_note' },
    ],
    playKeys: ['solution_app_examples_production_updates_play_1', 'solution_app_examples_production_updates_play_2', 'solution_app_examples_production_updates_play_3'],
  },
  qsr: {
    labelKey: 'solution_app_examples_qsr_label',
    headlineKey: 'solution_app_examples_qsr_headline',
    useCaseKey: 'solution_app_examples_qsr_use_case',
    apps: [
      { appId: 'de.burgerking.kingfinder', noteKey: 'solution_app_examples_qsr_app_1_note' },
      { appId: 'com.jackintheboxinc.JackMobileApp', noteKey: 'solution_app_examples_qsr_app_2_note' },
      { appId: 'com.dennys.mobile', noteKey: 'solution_app_examples_qsr_app_3_note' },
    ],
    playKeys: ['solution_app_examples_qsr_play_1', 'solution_app_examples_qsr_play_2', 'solution_app_examples_qsr_play_3'],
  },
  'set-and-forget': {
    labelKey: 'solution_app_examples_set_and_forget_label',
    headlineKey: 'solution_app_examples_set_and_forget_headline',
    useCaseKey: 'solution_app_examples_set_and_forget_use_case',
    apps: [
      { appId: 'com.swisscom.myswisscom', noteKey: 'solution_app_examples_set_and_forget_app_1_note' },
      { appId: 'ua.vodafone.myvodafone', noteKey: 'solution_app_examples_set_and_forget_app_2_note' },
      { appId: 'br.com.oi.tecnicovirtual', noteKey: 'solution_app_examples_set_and_forget_app_3_note' },
    ],
    playKeys: ['solution_app_examples_set_and_forget_play_1', 'solution_app_examples_set_and_forget_play_2', 'solution_app_examples_set_and_forget_play_3'],
  },
  'solo-developers': {
    labelKey: 'solution_app_examples_solo_developers_label',
    headlineKey: 'solution_app_examples_solo_developers_headline',
    useCaseKey: 'solution_app_examples_solo_developers_use_case',
    apps: [
      { appId: 'com.jernung.infinite.jpn', noteKey: 'solution_app_examples_solo_developers_app_1_note' },
      { appId: 'org.lichess.mobileapp', noteKey: 'solution_app_examples_solo_developers_app_2_note' },
      { appId: 'com.greetingsisland.sam', noteKey: 'solution_app_examples_solo_developers_app_3_note' },
    ],
    playKeys: ['solution_app_examples_solo_developers_play_1', 'solution_app_examples_solo_developers_play_2', 'solution_app_examples_solo_developers_play_3'],
  },
  startups: {
    labelKey: 'solution_app_examples_startups_label',
    headlineKey: 'solution_app_examples_startups_headline',
    useCaseKey: 'solution_app_examples_startups_use_case',
    apps: [
      { appId: 'com.polleverywhere.mobile', noteKey: 'solution_app_examples_startups_app_1_note' },
      { appId: 'com.studysmarter', noteKey: 'solution_app_examples_startups_app_2_note' },
      { appId: 'net.bitburst.pollpay', noteKey: 'solution_app_examples_startups_app_3_note' },
    ],
    playKeys: ['solution_app_examples_startups_play_1', 'solution_app_examples_startups_play_2', 'solution_app_examples_startups_play_3'],
  },
  'version-targeting': {
    labelKey: 'solution_app_examples_version_targeting_label',
    headlineKey: 'solution_app_examples_version_targeting_headline',
    useCaseKey: 'solution_app_examples_version_targeting_use_case',
    apps: [
      { appId: 'br.jus.tse.eleitoral.etitulo', noteKey: 'solution_app_examples_version_targeting_app_1_note' },
      { appId: 'br.gov.datasus.cnsdigital', noteKey: 'solution_app_examples_version_targeting_app_2_note' },
      { appId: 'com.windyty.android', noteKey: 'solution_app_examples_version_targeting_app_3_note' },
    ],
    playKeys: ['solution_app_examples_version_targeting_play_1', 'solution_app_examples_version_targeting_play_2', 'solution_app_examples_version_targeting_play_3'],
  },
  'white-label': {
    labelKey: 'solution_app_examples_white_label_label',
    headlineKey: 'solution_app_examples_white_label_headline',
    useCaseKey: 'solution_app_examples_white_label_use_case',
    apps: [
      { appId: 'gt.com.tigosports', noteKey: 'solution_app_examples_white_label_app_1_note' },
      { appId: 'de.tvspielfilm', noteKey: 'solution_app_examples_white_label_app_2_note' },
      { appId: 'com.orange.miorange', noteKey: 'solution_app_examples_white_label_app_3_note' },
    ],
    playKeys: ['solution_app_examples_white_label_play_1', 'solution_app_examples_white_label_play_2', 'solution_app_examples_white_label_play_3'],
  },
} as const satisfies Record<SolutionAppExampleKey, SolutionAppExample>
