<script setup lang="ts">
import * as m from "../paraglide/messages.js"

</script>

<template>
  <div class="px-3 m-auto prose-sm prose text-left">
    <h1>{{ m.we_welcome_and_appreciate_all_contributions_to_capgo() }}</h1>
    <p>{{ m.this_page_serves_as_a_helper_to_get_you_started_on_contributing() }}</p>
    <h2 id="projects">{{ m.projects() }}</h2>
    <p
      v-html="
        m.there_are_numerous_repositories_in_the_capgo_organization_that_are_part_of_the_capgo().replace(
          'Capgo',
          `<a href='https://github.com/Cap-go'><code>Capgo</code></a>`,
        )
      "
    />
    <p>{{ m.repositories_have_different_scopes_use_different_programming_languages_and_have_varying_level_when_it_comes_to_contributions() }}</p>
    <p>{{ m.to_help_you_decide_which_repository_might_be_the_best_to_start_contributing_and_or_falls_into_your_interest_here_s_a_short_comparison_languages_in_bold_comprise_most_of_the_codebase() }} <a href="https://github.com/Cap-go"><code>Capgo</code></a></p>

    <h3 id="-capacitor-updater-https-github-com-cap-go-capacitor-updater-">
      <a href="https://github.com/Cap-go/capacitor-updater"><code>capacitor-updater</code></a>
    </h3>
    <p v-html="m.main_repository_that_provides_the_capacitor_updater_plugin()" />
    <p v-html="m.you_want_to_fix_a_bug_or_add_a_new_feature_to_capacitor_updater_this_is_the_repository_you_want_to_contribute_to()" />
    <p>Languages: <strong>Swift</strong>, <strong>JavaScript</strong>, <strong>Java</strong></p>
    <h3 id="-capgo-https-github-com-cap-go-capgo-">
      <a href="https://github.com/Cap-go/capgo"><code>capgo</code></a>
    </h3>
    <p>{{ m.the_webapp_and_serverless_functions_that_make_up_the_capgo_cloud_platform() }}</p>
    <p>{{ m.thare_where_you_want_to_contribute_to_fix_the_backend_of_capgo() }}</p>
    <p>Languages: <strong>TypeScript</strong>.</p>
    <h3 id="-website-https-github-com-cap-go-website-">
      <a href="https://github.com/Cap-go/website"><code>website</code></a>
    </h3>
    <p>{{ m.frontend_for_official_deno_webpage() }}: <a href="https://capgo.app/"> https://capgo.app/ </a></p>
    <p>Languages: <strong>TypeScript</strong>, HTML, CSS</p>
    <h3 id="-docs-https-github-com-cap-go-docs-">
      <a href="https://github.com/Cap-go/docs">
        <code>docs</code>
      </a>
    </h3>
    <p>{{ m.documentation_in_markdown_that_powers() }} <a href="https://doc.capgo.app/"> https://doc.capgo.app </a></p>
    <p>Languages: <strong>Markdown</strong></p>
    <h3 id="-capacitor-standard-version-https-github-com-cap-go-capacitor-standard-version-">
      <a href="https://github.com/Cap-go/capacitor-standard-version">
        <code>capacitor-standard-version</code>
      </a>
    </h3>
    <p>{{ m.version_manager_that_power_ci_cd_to_update_apps() }}</p>
    <p>Languages: <strong>JavaScript</strong></p>
    <ul>
      <li>
        <p v-html="m.read_the_style_guide()" />
      </li>
      <li>
        <p v-html="m.ask_for_help_in_the_community_chat_room()" />
      </li>
      <li>
        <p v-html="m.mention_issue_before_working()" />
      </li>
      <li>
        <p v-html="m.create_an_issue_and_discuss_before_working_on_a_new_feature()" />
      </li>
      <li>
        <p v-html="m.please_be_professional_in_the_forums()" />
      </li>
    </ul>
    <h2 id="submitting-a-pull-request">{{ m.submitting_a_pull_request() }}</h2>
    <p v-html="m.before_submitting_a_pr()" />
    <ol>
      <li>{{ m.give_pr_a_descriptive_title() }}</li>
    </ol>
    <p>{{ m.examples_of_good_pr_title() }}</p>
    <ul>
      <li>fix(std/http): Fix race condition in server</li>
      <li>docs(console): Update docstrings</li>
      <li>feat(doc): Handle nested re-exports</li>
    </ul>
    <p>{{ m.examples_of_bad_pr_title() }}</p>
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
    <h3 id="submitting-a-pr-to-capgo-https-github-com-cap-go-capgo-" v-html="m.submitting_a_pr_to_capgo()" />
    <p>{{ m.additionally_make_sure_that() }}</p>
    <ol>
      <li v-html="m.npm_run_lint_passes()" />
    </ol>
    <h2 id="documenting-apis">{{ m.documenting_apis() }}</h2>
    <p>{{ m.importance_of_documenting_apis() }}</p>
    <h3 id="javascript-and-typescript">{{ m.javascript_and_typescript() }}</h3>
    <p v-html="m.jsdoc_documentation()" />
    <pre><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> FOO = <span class="hljs-string">"foo"</span>;
    </code></pre>
    <p v-html="m.find_more_at()" />
  </div>
</template>
