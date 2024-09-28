export const locales = ['fr', 'en']

export type Locales = 'fr' | 'en'

export const defaultLocale = 'en'

export const dynamicTranslations = (singleVariable: string) => ({
  launch_multiple_releases_per_week: {
    en: `With ${singleVariable}, you can launch multiple releases per week with an impressive 81% increase in efficiency. Don't miss out on this competitive advantage.`,
    fr: `Avec ${singleVariable}, vous pouvez lancer plusieurs mises à jour par semaine avec une augmentation impressionnante de 81% en efficacité. Ne manquez pas cette opportunité de gain de temps.`,
  },
  easily_combine_features_ci_cd: {
    en: `Easily combine ${singleVariable} features into your current CI/CD platform with our user-friendly CLI.`,
    fr: `Facilement combiner les fonctionnalités de ${singleVariable} dans votre plateforme CI/CD actuelle avec notre CLI conviviale.`,
  },
})

export const translations = {
  home: {
    fr: 'Accueil',
    en: 'Home',
  },
  pricing: {
    fr: 'Tarification',
    en: 'Pricing',
  },
  blog: {
    fr: 'Blogue',
    en: 'Blog',
  },
  documentation: {
    fr: 'Documentation',
    en: 'Documentation',
  },
  login: {
    fr: 'Se Connecter',
    en: 'Login',
  },
  register: {
    fr: "S'inscrire",
    en: 'Register',
  },
  solutions: {
    fr: 'Solutions',
    en: 'Solutions',
  },
  support: {
    fr: 'Soutien',
    en: 'Support',
  },
  making_world_better: {
    fr: 'Faire du monde un meilleur endroit en construisant des applications élégantes.',
    en: 'Making the world a better place through constructing elegant apps.',
  },
  carbon_removal: {
    fr: '5% de nos revenus vont à la rétention du carbone.',
    en: '5% of our revenue goes to carbon removal.',
  },
  open_source: {
    fr: '100% open-source',
    en: '100% open-source',
  },
  built_with_supabase: {
    fr: 'Construit avec Supabase',
    en: 'Built with Supabase',
  },
  build_in_public_on_twitter: {
    fr: 'Construire en public sur Twitter',
    en: 'Build in public on Twitter',
  },
  footer: {
    fr: 'Footer',
    en: 'Footer',
  },
  company: {
    fr: 'Entreprise',
    en: 'Company',
  },
  legal: {
    fr: 'Légal',
    en: 'Legal',
  },
  copyright: {
    fr: 'Tous droits réservés.',
    en: 'All rights reserved.',
  },
  app_mobile: {
    fr: 'Application mobile',
    en: 'App mobile',
  },
  plugins: {
    fr: 'Plugins',
    en: 'Plugins',
  },
  awesome_capacitor: {
    fr: 'Awesome Capacitor',
    en: 'Awesome Capacitor',
  },
  top_app_by_framework: {
    fr: 'Top App par Framework',
    en: 'Top App by Framework',
  },
  community: {
    fr: 'Communauté',
    en: 'Community',
  },
  guides: {
    fr: 'Guides',
    en: 'Guides',
  },
  status: {
    fr: 'Statut',
    en: 'Status',
  },
  chat: {
    fr: 'Chat',
    en: 'Chat',
  },
  sponsor: {
    fr: 'Sponsorisé',
    en: 'Sponsoring',
  },
  about: {
    fr: 'À propos',
    en: 'About',
  },
  imprint: {
    fr: 'Imprimé',
    en: 'Imprint',
  },
  jobs: {
    fr: 'Jobs',
    en: 'Jobs',
  },
  contributing: {
    fr: 'Contribueur',
    en: 'Contributing',
  },
  security: {
    fr: 'Sécurité',
    en: 'Security',
  },
  consulting: {
    fr: 'Consulting',
    en: 'Consulting',
  },
  affiliate: {
    fr: 'Affilié',
    en: 'Affiliate',
  },
  privacy: {
    fr: 'Confidentialité',
    en: 'Privacy',
  },
  support_policy: {
    fr: 'Politique de soutien',
    en: 'Support Policy',
  },
  sla: {
    fr: 'Contrat de niveau de service',
    en: 'Service Level Agreement',
  },
  aup: {
    fr: "Politique d'utilisation acceptable",
    en: 'Acceptable Use Policy',
  },
  terms: {
    fr: "Conditions d'utilisation",
    en: 'Terms of Service',
  },
  security_txt: {
    fr: 'Security.txt',
    en: 'Security.txt',
  },
  dp: {
    fr: 'Politique de données',
    en: 'Data Policy',
  },
  dpa: {
    fr: 'Contrat de protection des données',
    en: 'Data Protection Agreement',
  },
  instant_updates_for_capacitor: {
    fr: 'Mises à jour instantanées pour Capacitor',
    en: 'Instant updates for Capacitor',
  },
  ship_updates_fixes_changes_and_features: {
    fr: 'Livraison de mises à jour, de correctifs, de modifications et de fonctionnalités',
    en: 'Ship updates, fixes, changes, and features',
  },
  within_minutes: {
    fr: 'Dans les minutes',
    en: 'Within minutes',
  },
  no_credit_card_required: {
    fr: 'Aucun numéro de carte bancaire requis',
    en: 'No credit card required',
  },
  try_for_free: {
    fr: 'Essayer gratuitement',
    en: 'Try for free',
  },
  instant_updates: {
    fr: 'Mises à jour instantanées',
    en: 'Instant updates',
  },
  reach_users_now_not_weeks_later: {
    fr: 'Atteindre les utilisateurs maintenant, pas plus tard.',
    en: 'Reach users now, not weeks later.',
  },
  app_store_compliant: {
    fr: "Conforme à l'App Store",
    en: 'App Store compliant',
  },
  '100_compliant_with_apple_and_android_requirements': {
    fr: "100% conforme aux exigences d'Apple et d'Android",
    en: '100% compliant with Apple and Android requirements',
  },
  end_to_end_encryption: {
    fr: 'Chiffrement de bout en bout',
    en: 'End-to-end encryption',
  },
  only_your_users_can_decrypt_your_updates_no_one_else: {
    fr: "Seulement vos utilisateurs peuvent déchiffrer vos mises à jour, personne d'autre.",
    en: 'Only your users can decrypt your updates, no one else.',
  },
  no_more_wait: {
    fr: "Plus d'attente",
    en: 'No more wait',
  },
  for_apple_and_google_app_updates_distribution: {
    fr: 'Pour la distribution des mises à jour des applications Apple et Google',
    en: 'For Apple and Google app updates distribution',
  },
  youre_in_good_company: {
    fr: 'Vous êtes dans une bonne compagnie.',
    en: "You're in good company.",
  },
  capgo_enables_development_teams_at_some_of_the_most_innovative_companies: {
    fr: 'Capgo permet aux équipes de développement de certaines des plus grandes entreprises innovantes.',
    en: 'Capgo enables development teams at some of the most innovative companies.',
  },
  apps_with_20m_users: {
    fr: "Applications avec plus de 20M d'utilisateurs",
    en: 'Apps with 20M+ users',
  },
  use_capgo: {
    fr: 'Utiliser Capgo',
    en: 'Use Capgo',
  },
  our_numbers_are_shared_transparently_since_december_2021: {
    fr: 'Nos chiffres sont partagés de manière transparente depuis décembre 2021.',
    en: 'Our numbers are shared transparently since December 2021.',
  },
  last_update: {
    fr: 'Dernière mise à jour',
    en: 'Last update',
  },
  updates_delivered: {
    fr: 'Mises à jour livrées',
    en: 'Updates delivered',
  },
  all_around_the_globe: {
    fr: 'Partout dans le monde',
    en: 'All around the globe',
  },
  apps: {
    fr: 'Applications',
    en: 'Apps',
  },
  using_us_in_production: {
    fr: 'Utilisation dans la production',
    en: 'Using us in production',
  },
  stars_in_github: {
    fr: 'Étoiles dans GitHub',
    en: 'Stars in GitHub',
  },
  how_it_work: {
    fr: 'Comment ça marche ?',
    en: 'How it work?',
  },
  ship_your_first_update_in_less_than_15_minutes: {
    fr: 'Livrez votre première mise à jour en moins de 15 minutes !',
    en: 'Ship your first update in less than 15 minutes!',
  },
  install_the_plugin: {
    fr: 'Installez le plugin',
    en: 'Install the plugin',
  },
  send_your_first_update: {
    fr: 'Envoyez votre première mise à jour',
    en: 'Send your first update',
  },
  build_your_app_as_usual_then_send_with_the_cli: {
    fr: "Construisez votre application comme d'habitude, puis envoyez avec la CLI",
    en: 'Build your app as usual, then send with the CLI',
  },
  get_the_update: {
    fr: 'Obtenez la mise à jour',
    en: 'Get the update',
  },
  open_the_app_it_update_in_the_background: {
    fr: "Ouvrez l'application, elle se met à jour en arrière-plan",
    en: 'Open the app, it updates in the background',
  },
  start_now: {
    fr: 'Commencez maintenant',
    en: 'Start now',
  },
  faster_releases: {
    fr: 'Livraisons plus rapides',
    en: 'Faster releases',
  },
  integration: {
    fr: 'Intégration',
    en: 'Integration',
  },
  goodbye_bugs: {
    en: 'Instant Changes, Bug Fixes No need to wait for app re-downloads! With just one command, users can quickly see bug fixes in action. Say goodbye to frustrating delays.',
    fr: "Changements instantanés, corrections de bugs Plus besoin d'attendre la re-téléchargement de l'application ! Avec une seule commande, les utilisateurs peuvent rapidement voir les corrections de bugs en action. Dites adieu aux retards frustrants.",
  },
  manage_updates_effortlessly: {
    en: 'Manage Updates Effortlessly',
    fr: 'Gestion des mises à jour sans effort',
  },
  user_assignment: {
    en: 'User Assignment',
    fr: 'Affectation des utilisateurs',
  },
  easily_assign_users_and_send_the_latest_update_to_your_private_or_public_testers: {
    en: 'Easily assign users and send the latest update to your private or public testers.',
    fr: "Facile d'affectation des utilisateurs et de livraison de la dernière mise à jour à vos testeurs privés ou publics.",
  },
  seamless_deployment_process: {
    en: 'Seamless Deployment Process',
    fr: 'Processus de déploiement sans faille',
  },
  when_your_update_is_ready_deploy_it_seamlessly_to_all_your_users: {
    en: 'When your update is ready, deploy it seamlessly to all your users.',
    fr: 'Lorsque votre mise à jour est prête, déployez-la de manière transparente à tous vos utilisateurs.',
  },
  simple_configuration_management: {
    en: 'Simple Configuration Management',
    fr: 'Gestion simple de la configuration',
  },
  manage_all_your_configurations_conveniently_through_our_user_friendly_web_interface: {
    en: 'Manage all your configurations conveniently through our user-friendly web interface.',
    fr: 'Gérez toutes vos configurations de manière simple via notre interface web conviviale.',
  },
  try_risk_free_with_a_15_days_free_trial: {
    en: 'Try risk free with a 15 days free trial',
    fr: 'Essayez gratuitement pendant 15 jours',
  },
  get_started: {
    en: 'Get Started',
    fr: 'Commencer',
  },
  they_love_capgo: {
    en: 'They love Capgo.',
    fr: 'Ils aiment Capgo.',
  },
  flexible_organization_management_for_your_team: {
    en: 'Flexible Organization Management for Your Team',
    fr: "Gestion flexible de l'organisation pour votre équipe",
  },
  create_manage_organizations_with_ease: {
    en: 'Create and manage multiple organizations with ease, assigning specific rights to each user. Capgo provides powerful tools to keep your team organized and efficient.',
    fr: 'Créez et gérez plusieurs organisations facilement, en attribuant des droits spécifiques à chaque utilisateur. Capgo fournit des outils puissants pour garder votre équipe organisée et efficace.',
  },
  multiple_organizations: {
    en: 'Multiple Organizations',
    fr: 'Plusieurs organisations',
  },
  manage_various_teams: {
    en: 'Manage Various Teams',
    fr: 'Gérer diverses équipes',
  },
  create_oversee_organizations_from_single_account: {
    en: 'Create and oversee multiple organizations from a single account, streamlining your workflow and enhancing productivity.',
    fr: "Créez et gérez plusieurs organisations à partir d'un seul compte, en simplifiant votre workflow et en améliorant votre productivité.",
  },
  granular_permissions: {
    en: 'Granular Permissions',
    fr: 'Permissions granulaires',
  },
  control_access_levels: {
    en: 'Control Access Levels',
    fr: "Contrôler les niveaux d'accès",
  },
  assign_specific_rights_and_access_levels_to_each_user_within_your_organizations: {
    en: 'Assign specific rights and access levels to each user within your organizations, ensuring security and proper resource allocation.',
    fr: "Attribuez des droits et des niveaux d'accès spécifiques à chaque utilisateur dans vos organisations, en assurant la sécurité et le bon allo",
  },
  flexible_management: {
    en: 'Flexible Management',
    fr: 'Gestion flexible',
  },
  adapt_as_you_grow: {
    en: 'Adapt as You Grow',
    fr: "S'adapter à vos besoins",
  },
  easily_adjust_user_roles_and_permissions_as_your_team_and_projects_evolve_maintaining_optimal_organization_structure: {
    en: 'Easily adjust user roles and permissions as your team and projects evolve, maintaining optimal organization structure.',
    fr: "Facile d'ajustement des rôles et des permissions des utilisateurs à mesure que votre équipe et vos projets évoluent, en maintenant une structure organisationnelle optimale.",
  },
  effortless_ci_cd_solutions: {
    en: 'Effortless CI/CD Solutions',
    fr: 'Solutions CI/CD sans effort',
  },
  we_configure_your_ci_cd_pipeline_directly_in_your_preferred_platform_whether_its_github_actions_gitlab_ci_or_others_we_dont_host_ci_cd_or_charge_you_to_maintain_it: {
    en: "We configure your CI/CD pipeline directly in your preferred platform, whether it's GitHub Actions, GitLab CI, or others. We don't host CI/CD or charge you to maintain it.",
    fr: "Nous configurerons votre pipeline CI/CD directement dans votre plateforme préférée, que ce soit GitHub Actions, GitLab CI, ou d'autres. Nous ne hébergeons pas CI/CD et ne vous facturons pas pour le maintenir.",
  },
  seamless_integration: {
    en: 'Seamless Integration',
    fr: 'Intégration transparente',
  },
  we_set_up_your_ci_cd_workflow_to_work_seamlessly_with_your_current_development_process_no_need_to_switch_platforms_or_learn_new_tools: {
    en: 'We set up your CI/CD workflow to work seamlessly with your current development process. No need to switch platforms or learn new tools.',
    fr: "Nous configurerons votre pipeline CI/CD pour fonctionner de manière transparente avec votre processus de développement actuel. Pas besoin de changer de plateforme ou d'apprendre de nouveaux outils.",
  },
  tailored_configuration: {
    en: 'Tailored Configuration',
    fr: 'Configuration personnalisée',
  },
  our_team_customizes_the_ci_cd_setup_to_match_your_specific_project_requirements_ensuring_optimal_performance_and_efficiency: {
    en: 'Our team customizes the CI/CD setup to match your specific project requirements, ensuring optimal performance and efficiency.',
    fr: 'Notre équipe adapte la configuration de CI/CD pour répondre à vos besoins spécifiques, en garantissant des performances optimales et une efficacité maximale.',
  },
  platform_independence: {
    en: 'Platform Independence',
    fr: 'Indépendance de la plateforme',
  },
  whether_you_use_github_gitlab_or_another_version_control_system_we_adapt_our_configuration_to_fit_your_existing_infrastructure: {
    en: 'Whether you use GitHub, GitLab, or another version control system, we adapt our configuration to fit your existing infrastructure.',
    fr: 'Que vous utilisiez GitHub, GitLab, ou un autre système de contrôle de version, nous adaptons notre configuration à votre infrastructure existante.',
  },
  expert_guidance: {
    en: 'Expert Guidance',
    fr: 'Conseils expert',
  },
  benefit_from_our_deep_expertise_in_mobile_app_ci_cd_best_practices_without_the_need_to_build_and_maintain_a_complex_system_yourself: {
    en: 'Benefit from our deep expertise in mobile app CI/CD best practices, without the need to build and maintain a complex system yourself.',
    fr: 'Bénéficiez de notre expertise profonde en bonnes pratiques de CI/CD pour les applications mobiles, sans avoir à construire et à maintenir un système complexe vous-même.',
  },
  we_already_setup_ci_cd_for_50_apps: {
    en: 'We already setup CI/CD for 50+ apps.',
    fr: 'Nous avons déjà configuré CI/CD pour plus de 50 applications.',
  },
  running_your_ci_cd_costs_300: {
    en: 'Running your CI/CD costs ~$300/month',
    fr: "L'exécution de votre CI/CD coûte ~300$/mois",
  },
  appflow_6000_annually: {
    en: 'AppFlow $6,000 annually.',
    fr: 'AppFlow 6 000 $ par an.',
  },
  our_one_time_setup_fee_of_2600_combined_with_ci_cd_results_in_less_than_half_the_first_year_fee_of_appflow: {
    en: 'Our one-time setup fee of $2,600, combined with CI/CD, results in less than half the first year fee of AppFlow.',
    fr: 'Notre frais de configuration initial de 2 600 $ combiné à CI/CD, résulte en moins de la moitié du coût annuel de AppFlow.',
  },
  in_5_years_you_save_26100: {
    en: 'In 5 years you save $26,100.',
    fr: 'En 5 ans, vous économisez 26 100 $.',
  },
  setup_ci_cd_now: {
    en: 'Setup CI/CD now →',
    fr: 'Configurer CI/CD maintenant →',
  },
  push_updates_like_your_commits: {
    en: "Push <span class='font-bold'>updates</span> like your <span class='font-bold'>commits</span>",
    fr: "Envoyez des <span class='font-bold'>mises à jour</span> comme vos <span class='font-bold'>commits</span>",
  },
  its_compatible_with_azure_devops_gitlab_github_jenkins_cloudbees_travis_azure_devops_gitlab_github_circleci_and_many_more: {
    en: "It's compatible with Azure DevOps, GitLab, GitHub, Jenkins, Cloudbees, Travis, Azure DevOps, GitLab, GitHub, CircleCI, and many more.",
    fr: "Il est compatible avec Azure DevOps, GitLab, GitHub, Jenkins, Cloudbees, Travis, Azure DevOps, GitLab, GitHub, CircleCI, et bien d'autres.",
  },
}
