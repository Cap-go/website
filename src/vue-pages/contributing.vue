<script setup lang="ts">
// import { useRuntimeConfig } from '../config/app'

// const config = useRuntimeConfig()
// const brand = config.public.brand
// const title = `${brand} | Contributing`
// const description = 'How to contribute to Capgo open source'
// useHead({
//   title,
//   meta: [
//     { name: 'title', hid: 'title', content: title },
//     { name: 'og:title', hid: 'og:title', content: title },
//     { name: 'description', hid: 'description', content: description },
//     { name: 'og:description', hid: 'og:description', content: description },
//     { name: 'description', hid: 'description', content: 'Privacy Policy' },
//     { name: 'robots', content: 'noindex, nofollow' },
//   ],
// })
</script>

<template>
  <div class="prose prose-sm m-auto text-left px-3">
    <h1>We welcome and appreciate all contributions to Capgo.</h1>
    <p>This page serves as a helper to get you started on contributing.</p>
    <h2 id="projects">
      Projects
    </h2>
    <p>
      There are numerous repositories in the <a href="https://github.com/Cap-go"> <code>Capgo</code></a> organization that are part of the Capgo .
    </p>
    <p>Repositories have different scopes, use different programming languages and have varying level when it comes to contributions.</p>
    <p>
      To help you decide which repository might be the best to start contributing (and/or falls into your interest), here&#39;s a short comparison (<strong>languages in bold comprise most of the codebase</strong>):
    </p>
    <h3 id="-capacitor-updater-https-github-com-cap-go-capacitor-updater-">
      <a href="https://github.com/Cap-go/capacitor-updater"> <code>capacitor-updater</code></a>
    </h3>
    <p>This is the main repository that provides the <code>capacitor-updater</code> Plugin.</p>
    <p>If you want to fix a bug or add a new feature to <code>capacitor-updater</code> this is the repository you want to contribute to.</p>
    <p>Languages: <strong>Swift</strong>, <strong>JavaScript</strong>, <strong>Java</strong></p>
    <h3 id="-capgo-https-github-com-cap-go-capgo-">
      <a href="https://github.com/Cap-go/capgo"> <code>capgo</code></a>
    </h3>
    <p>The Webapp and serverless functions that make up the Capgo cloud platform.</p>
    <p>Thare where you want to contribute to fix the backend of Capgo.</p>
    <p>Languages: <strong>TypeScript</strong>.</p>
    <h3 id="-website-https-github-com-cap-go-website-">
      <a href="https://github.com/Cap-go/website"> <code>website</code></a>
    </h3>
    <p>Frontend for official Deno webpage: <a href="https://capgo.app/"> https://capgo.app/ </a></p>
    <p>Languages: <strong>TypeScript</strong>, HTML, CSS</p>
    <h3 id="-docs-https-github-com-cap-go-docs-">
      <a href="https://github.com/Cap-go/docs">
        <code>docs</code>
      </a>
    </h3>
    <p>Documentation in Markdown that powers <a href="https://doc.capgo.app/"> https://doc.capgo.app </a></p>
    <p>Languages: <strong>Markdown</strong></p>
    <h3 id="-capacitor-standard-version-https-github-com-cap-go-capacitor-standard-version-">
      <a href="https://github.com/Cap-go/capacitor-standard-version">
        <code>capacitor-standard-version</code>
      </a>
    </h3>
    <p>Version manager that power CI/CD to uppdate apps.</p>
    <p>Languages: <strong>JavaScript</strong></p>
    <ul>
      <li>
        <p>Read the <a href="https://deno.land/manual@v1.25.4/contributing/style_guide"> style guide.</a></p>
      </li>
      <li>
        <p>Ask for help in the <a href="https://discord.com/invite/VnYRvBfgA6"> community chat room. </a></p>
      </li>
      <li>
        <p>If you are going to work on an issue, mention so in the issue comments <em>before</em> you start working on the issue.</p>
      </li>
      <li>
        <p>
          If you are going to work on a new feature, create an issue and discuss with other contributors <em>before</em> you start working on the feature; we appreciate all
          contributions, but not all proposed features are getting accepted. We don&#39;t want you to spend hours working on a code that might not be accepted.
        </p>
      </li>
      <li>
        <p>
          Please be professional in the forums. We follow <a href="https://www.rust-lang.org/policies/code-of-conduct"> Rust&#39;s code of conduct</a> (CoC). Have a problem? Email
          <a href="mailto:ry@tinyclouds.org"> ry@tinyclouds.org.</a>
        </p>
      </li>
    </ul>
    <h2 id="submitting-a-pull-request">
      Submitting a pull request
    </h2>
    <p>Before submitting a PR to any of the repos, please make sure the following is done:</p>
    <ol>
      <li>Give the PR a descriptive title.</li>
    </ol>
    <p>Examples of good PR title:</p>
    <ul>
      <li>fix(std/http): Fix race condition in server</li>
      <li>docs(console): Update docstrings</li>
      <li>feat(doc): Handle nested re-exports</li>
    </ul>
    <p>Examples of bad PR title:</p>
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
    <h3 id="submitting-a-pr-to-capgo-https-github-com-cap-go-capgo-">
      Submitting a PR to
      <a href="https://github.com/Cap-go/capgo">
        <code>Capgo</code>
      </a>
    </h3>
    <p>Additionally to the above make sure that:</p>
    <ol>
      <li>
        <code>npm run lint</code> passes - this will check Rust and JavaScript code for common mistakes and errors using <code>Swiftlint</code> (for Swift) and
        <code>eslint</code> (for JavaScript and Java)
      </li>
    </ol>
    <h2 id="documenting-apis">
      Documenting APIs
    </h2>
    <p>It is important to document all public APIs and we want to do that inline with the code. This helps ensure that code and documentation are tightly coupled together.</p>
    <h3 id="javascript-and-typescript">
      JavaScript and TypeScript
    </h3>
    <p>
      All publicly exposed APIs and types, the <code>capacitor-updater</code> module should have JSDoc documentation. This documentation is parsed and available to the TypeScript
      compiler, and therefore easy to provide further downstream. JSDoc blocks come just prior to the statement they apply to and are denoted by a leading <code>/**</code> before
      terminating with a <code>*/</code>. For example:
    </p>
    <pre><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> FOO = <span class="hljs-string">"foo"</span>;
    </code></pre>
    <p>Find more at: <a href="https://jsdoc.app/"> https://jsdoc.app/ </a></p>
  </div>
</template>
