We welcome and appreciate all contributions to Capgo.

This page serves as a helper to get you started on contributing.

## Projects

There are numerous repositories in the [`Capgo`](https://github.com/Cap-go) organization that are part of the Capgo .

Repositories have different scopes, use different programming languages and have varying level when it comes to contributions.

To help you decide which repository might be the best to start contributing (and/or falls into your interest), here's a short comparison (**languages in bold comprise most of the codebase**):

### [`capacitor-updater`](https://github.com/Cap-go/capacitor-updater)

This is the main repository that provides the `capacitor-updater` Plugin.

If you want to fix a bug or add a new feature to `capacitor-updater` this is the repository you want to contribute to.

Languages: **Swift**, **JavaScript**, **Java**

### [`capgo`](https://github.com/Cap-go/capgo)

The Webapp and serverless functions that make up the Capgo cloud platform.

Thare where you want to contribute to fix the backend of Capgo.

Languages: **TypeScript**.

### [`website`](https://github.com/Cap-go/website)

Frontend for official Deno webpage: [https://capgo.app/](https://capgo.app/)

Languages: **TypeScript**, HTML, CSS

### [`docs`](https://github.com/Cap-go/docs)

Documentation in Markdown that powers [https://doc.capgo.app](https://doc.capgo.app/)

Languages: **Markdown**

### [`capacitor-standard-version`](https://github.com/Cap-go/capacitor-standard-version)

Version manager that power CI/CD to uppdate apps.

Languages: **JavaScript**

-   Read the [style guide](https://deno.land/manual@v1.25.4/contributing/style_guide).

-   Ask for help in the [community chat room](https://discord.com/invite/VnYRvBfgA6).

-   If you are going to work on an issue, mention so in the issue comments _before_ you start working on the issue.

-   If you are going to work on a new feature, create an issue and discuss with other contributors _before_ you start working on the feature; we appreciate all contributions, but not all proposed features are getting accepted. We don't want you to spend hours working on a code that might not be accepted.

-   Please be professional in the forums. We follow [Rust's code of conduct](https://www.rust-lang.org/policies/code-of-conduct) (CoC). Have a problem? Email [ry@tinyclouds.org](mailto:ry@tinyclouds.org).

## Submitting a pull request

Before submitting a PR to any of the repos, please make sure the following is done:

1.  Give the PR a descriptive title.

Examples of good PR title:

-   fix(std/http): Fix race condition in server
-   docs(console): Update docstrings
-   feat(doc): Handle nested re-exports

Examples of bad PR title:

-   fix #7123
-   update docs
-   fix bugs

1.  Ensure there is a related issue and it is referenced in the PR text.
2.  Ensure there are tests that cover the changes.

### Submitting a PR to [`Capgo`](https://github.com/Cap-go/capgo)

Additionally to the above make sure that:

1.  `npm run lint` passes - this will check Rust and JavaScript code for common mistakes and errors using `Swiftlint` (for Swift) and `eslint` (for JavaScript and Java)

## Documenting APIs

It is important to document all public APIs and we want to do that inline with the code. This helps ensure that code and documentation are tightly coupled together.

### JavaScript and TypeScript

All publicly exposed APIs and types, the `capacitor-updater` module should have JSDoc documentation. This documentation is parsed and available to the TypeScript compiler, and therefore easy to provide further downstream. JSDoc blocks come just prior to the statement they apply to and are denoted by a leading `/**` before terminating with a `*/`. For example:

```
export const FOO = "foo";
```

Find more at: [https://jsdoc.app/](https://jsdoc.app/)

