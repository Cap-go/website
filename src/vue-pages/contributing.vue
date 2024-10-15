<script setup lang="ts">
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{ locale: Locales }>()
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <h1>{{ translations['we_welcome_and_appreciate_all_contributions_to_capgo'][props.locale] }}</h1>
    <p>{{ translations['this_page_serves_as_a_helper_to_get_you_started_on_contributing'][props.locale] }}</p>
    <h2 id="projects">{{ translations['projects'][props.locale] }}</h2>
    <p
      v-html="
        translations['there_are_numerous_repositories_in_the_capgo_organization_that_are_part_of_the_capgo'][props.locale].replace(
          'Capgo',
          `<a href='https://github.com/Cap-go'><code>Capgo</code></a>`,
        )
      "
    />
    <p>{{ translations['repositories_have_different_scopes_use_different_programming_languages_and_have_varying_level_when_it_comes_to_contributions'][props.locale] }}</p>
    <p
      v-html="
        translations[
          'to_help_you_decide_which_repository_might_be_the_best_to_start_contributing_and_or_falls_into_your_interest_here_s_a_short_comparison_languages_in_bold_comprise_most_of_the_codebase'
        ][props.locale].replace('Capgo', `<a href='https://github.com/Cap-go'><code>Capgo</code></a>`)
      "
    />
    <h3 id="-capacitor-updater-https-github-com-cap-go-capacitor-updater-">
      <a href="https://github.com/Cap-go/capacitor-updater"><code>capacitor-updater</code></a>
    </h3>
    <p v-html="translations['main_repository_that_provides_the_capacitor_updater_plugin'][props.locale]" />
    <p v-html="translations['you_want_to_fix_a_bug_or_add_a_new_feature_to_capacitor_updater_this_is_the_repository_you_want_to_contribute_to'][props.locale]" />
    <p>Languages: <strong>Swift</strong>, <strong>JavaScript</strong>, <strong>Java</strong></p>
    <h3 id="-capgo-https-github-com-cap-go-capgo-">
      <a href="https://github.com/Cap-go/capgo"><code>capgo</code></a>
    </h3>
    <p>{{ translations['the_webapp_and_serverless_functions_that_make_up_the_capgo_cloud_platform'][props.locale] }}</p>
    <p>{{ translations['thare_where_you_want_to_contribute_to_fix_the_backend_of_capgo'][props.locale] }}</p>
    <p>Languages: <strong>TypeScript</strong>.</p>
    <h3 id="-website-https-github-com-cap-go-website-">
      <a href="https://github.com/Cap-go/website"><code>website</code></a>
    </h3>
    <p>{{ translations['frontend_for_official_deno_webpage'][props.locale] }}: <a href="https://capgo.app/"> https://capgo.app/ </a></p>
    <p>Languages: <strong>TypeScript</strong>, HTML, CSS</p>
    <h3 id="-docs-https-github-com-cap-go-docs-">
      <a href="https://github.com/Cap-go/docs">
        <code>docs</code>
      </a>
    </h3>
    <p>{{ translations['documentation_in_markdown_that_powers'][props.locale] }} <a href="https://doc.capgo.app/"> https://doc.capgo.app </a></p>
    <p>Languages: <strong>Markdown</strong></p>
    <h3 id="-capacitor-standard-version-https-github-com-cap-go-capacitor-standard-version-">
      <a href="https://github.com/Cap-go/capacitor-standard-version">
        <code>capacitor-standard-version</code>
      </a>
    </h3>
    <p>{{ translations['version_manager_that_power_ci_cd_to_update_apps'][props.locale] }}</p>
    <p>Languages: <strong>JavaScript</strong></p>
    <ul>
      <li>
        <p v-html="translations['read_the_style_guide'][props.locale]" />
      </li>
      <li>
        <p v-html="translations['ask_for_help_in_the_community_chat_room'][props.locale]" />
      </li>
      <li>
        <p v-html="translations['mention_issue_before_working'][props.locale]" />
      </li>
      <li>
        <p v-html="translations['create_an_issue_and_discuss_before_working_on_a_new_feature'][props.locale]" />
      </li>
      <li>
        <p v-html="translations['please_be_professional_in_the_forums'][props.locale]" />
      </li>
    </ul>
    <h2 id="submitting-a-pull-request">{{ translations['submitting_a_pull_request'][props.locale] }}</h2>
    <p v-html="translations['before_submitting_a_pr'][props.locale]" />
    <ol>
      <li>{{ translations['give_pr_a_descriptive_title'][props.locale] }}</li>
    </ol>
    <p>{{ translations['examples_of_good_pr_title'][props.locale] }}</p>
    <ul>
      <li>fix(std/http): Fix race condition in server</li>
      <li>docs(console): Update docstrings</li>
      <li>feat(doc): Handle nested re-exports</li>
    </ul>
    <p>{{ translations['examples_of_bad_pr_title'][props.locale] }}</p>
    <ul>
      <li>fix #7123</li>
      <li>update docs</li>
      <li>
        <p>fix bugs</p>
      </li>
      <li>
        <p>Ensure there is a related issue and it is referenced in the PR text.</p>
      </li>
      <li>Ensure there are tests that cover the changes.</li>
    </ul>
    <h3 id="submitting-a-pr-to-capgo-https-github-com-cap-go-capgo-" v-html="translations['submitting_a_pr_to_capgo'][props.locale]" />
    <p>{{ translations['additionally_make_sure_that'][props.locale] }}</p>
    <ol>
      <li v-html="translations['npm_run_lint_passes'][props.locale]" />
    </ol>
    <h2 id="documenting-apis">{{ translations['documenting_apis'][props.locale] }}</h2>
    <p>{{ translations['importance_of_documenting_apis'][props.locale] }}</p>
    <h3 id="javascript-and-typescript">{{ translations['javascript_and_typescript'][props.locale] }}</h3>
    <p v-html="translations['jsdoc_documentation'][props.locale]" />
    <pre><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> FOO = <span class="hljs-string">"foo"</span>;
    </code></pre>
    <p v-html="translations['find_more_at'][props.locale]" />
  </div>
</template>
