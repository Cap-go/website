---
slug: openapi-typescript
title: 'OpenAPI TypeScript: Generate Types, Clients, and Validation'
description: 'Learn how OpenAPI TypeScript generation works end to end. Generate types, wire clients, validate at runtime, and ship safely from CI.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-08-01T08:15:08.551Z
updated_at: 2026-08-01T08:17:39.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/2be4bf4e-fccd-428f-b932-429424ad81ae/openapi-typescript-presentation-slide.jpg'
head_image_alt: 'OpenAPI TypeScript: Generate Types, Clients, and Validation'
keywords: 'openapi typescript, type-safe api, openapi codegen, tsc validation, contract testing'
tag: 'Development, Mobile'
published: true
locale: en
next_blog: ''
---
You can usually spot the moment an API pipeline starts lying to the team. A schema changes, the generated types update without complaints, the PR goes green, and then somebody in the front end keeps reading the old response shape because the wrapper cast the error away. That's the OpenAPI TypeScript problem, not whether a generator can spit out interfaces.

The useful question is harder. What contract do you want between schema, transport, and validation, and which parts should fail fast in build time instead of leaking into runtime? Once you frame **OpenAPI TypeScript** as a pipeline choice, the trade-offs get a lot clearer, and the tools stop pretending to be the whole solution.

## Table of Contents
- [Why Generated Types Are Not the Same as a Safe API](#why-generated-types-are-not-the-same-as-a-safe-api)
  - [Where the failures hide](#where-the-failures-hide)
- [Generating TypeScript Types from an OpenAPI Spec](#generating-typescript-types-from-an-openapi-spec)
  - [The flags that actually matter](#the-flags-that-actually-matter)
- [Choosing Between Pure Types, Full Clients, and No Codegen](#choosing-between-pure-types-full-clients-and-no-codegen)
  - [Pure types favor control](#pure-types-favor-control)
  - [Full clients favor handoff speed](#full-clients-favor-handoff-speed)
  - [No codegen favors local refactors](#no-codegen-favors-local-refactors)
- [Wiring a Thin Typed Client Around Fetch or Axios](#wiring-a-thin-typed-client-around-fetch-or-axios)
- [Adding Runtime Validation with zod, ajv, or io-ts](#adding-runtime-validation-with-zod-ajv-or-io-ts)
  - [Validate where the data enters](#validate-where-the-data-enters)
- [Putting Generation, Validation, and Contract Tests in CI](#putting-generation-validation-and-contract-tests-in-ci)
  - [A simple GitHub Actions shape](#a-simple-github-actions-shape)
- [Maintainable Pipelines, Performance, and a Final Checklist](#maintainable-pipelines-performance-and-a-final-checklist)
  - [A few performance levers actually matter](#a-few-performance-levers-actually-matter)

<a id="why-generated-types-are-not-the-same-as-a-safe-api"></a>
## Why Generated Types Are Not the Same as a Safe API

A teammate merges a PR that adds an optional response field. The generated file updates cleanly, the diff looks boring, and everyone moves on. Then the front end keeps reading an older shape through a handwritten wrapper that was “temporarily” cast with `as any`, and production starts behaving like the contract never changed.

That's the trap with generated types. **TypeScript can only protect the code that consumes the generated types**, and only if the transport layer doesn't erase the contract again. The OpenAPI side gives you a schema, not a guarantee that every caller respects it. The [discussion around understanding API connections](https://wearearch.com/blog/what-is-api-integration) is useful here because it pushes the conversation away from a single tool and toward how systems connect.

<a id="where-the-failures-hide"></a>
### Where the failures hide

The most common breakpoints are boring, not exotic. **Schema drift** happens when the OpenAPI spec and the deployed service stop matching. **Partial coverage** shows up when a spec only models the happy path, while the app depends on undocumented edge cases. **Handwritten wrappers** are often where types get weakened, especially when someone wants to “move fast” and uses `any` or a loose response cast.

> **Practical rule:** if the wrapper can lie, the generator can't save you.

There's also a runtime gap. TypeScript types disappear after compilation, so they can't reject malformed JSON coming over the wire. The network does not care what your editor inferred, and that's why a generated client is only one layer in a safer API pipeline.

The broader operational question is security and contract discipline, not just developer convenience. If you want a structured view of how API contracts fit into a larger app lifecycle, this internal guide on [API security standards for app store compliance](https://capgo.app/blog/top-api-security-standards-for-app-store-compliance/) is a useful companion.

The mature way to think about **openapi typescript** is this. It gives you a strict schema-to-types bridge, which is excellent, but it doesn't validate requests, enforce runtime payload shape, or stop a sloppy wrapper from undermining everything. The generator is the easy 20 percent. The rest is pipeline design, and that's where teams either gain trust or accumulate false confidence.

<a id="generating-typescript-types-from-an-openapi-spec"></a>
## Generating TypeScript Types from an OpenAPI Spec

![Screenshot from https://openapi-ts.dev](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/screenshots/00044b04-b8c6-433e-b489-ee20708430f3/openapi-typescript-documentation.jpg)

The lightest useful setup is usually the one that survives real repo churn. Keep the OpenAPI spec in the same repository, generate a committed type file, and make drift visible in CI instead of relying on someone to remember a refresh step. A command like `npx openapi-typescript ./openapi.yaml -o ./src/types/api.d.ts` gives you a deterministic output file that reviewers can inspect like any other source change.

<a id="the-flags-that-actually-matter"></a>
### The flags that actually matter

The `-o` output flag matters because it makes the generated artifact explicit. `--immutable` is useful when you want the generated types to preserve readonly intent in the output, and `--alphabetize` keeps diffs stable when schema order changes without semantic meaning. `--enum` matters when your team prefers enums in the generated surface instead of unions.

The project's own documentation is clear about the scope, it is a **type generator**, not a client runtime or request layer, and that limitation helps when you want a lightweight, type-first setup. Its repository also shows the maintenance model behind the tool, which is part of why open source tooling can hold up in production when the docs and releases stay active, as discussed in [the case for open source maintenance](https://capgo.app/blog/open-source-advantages/). A practical read on that posture is the project's [GitHub repository and CLI documentation](https://github.com/mitchell-merry/openapi-typescript).

Wire generation into `package.json` so the command lives beside the rest of the build scripts, then run it whenever the spec changes. In CI, regenerate the file and fail if `git diff` shows drift. That turns contract changes into visible review work instead of silent runtime risk.

The schema side matters just as much as the command line. The project recommends `compilerOptions.noUncheckedIndexedAccess` so `additionalProperties` become `T | undefined`, which forces safer indexing at call sites. It also recommends using `oneOf` by itself rather than mixing it with extra composition, and keeping `$defs` at the root when placement is ambiguous, because misplaced definitions can disappear from generated output. One more detail saves time later, `openapi-typescript` will never produce `any`, so missing schema detail gets surfaced early instead of hidden under permissive types.

> Keep the spec explicit, or the generator will faithfully expose the ambiguity back to you.

The workflow that lasts is straightforward. Put the spec under version control, regenerate on build, commit the generated file, and let the type checker complain before anyone merges a mismatch. That gives you a stable contract boundary for the rest of the pipeline.

<a id="choosing-between-pure-types-full-clients-and-no-codegen"></a>
## Choosing Between Pure Types, Full Clients, and No Codegen

| Pattern | Build time | Output files | Bundle weight | Best fit |
|---|---:|---:|---:|---|
| Pure types with a thin wrapper | Fast | Few | Low | Teams that want control and small runtime surface |
| Full-client codegen | Slower | Many | Higher | Teams that want quick handoff and autogenerated operations |
| No codegen request builders | Fast | None or minimal | Low | Single-codebase apps that prefer hand-written transport logic |

The choice isn't really “which tool wins”. It's which pipeline shape fits your repo, your team, and how much churn the API sees. In a 2025 benchmark around a large OpenAPI spec of about **75,000 lines, 2 MB, and roughly 1,200 operations**, `openapi-typescript` generated output in about **1.5 seconds** on average, compared with about **8.0 seconds** for `@hey-api/openapi-ts`, **5.5 seconds** for `Orval`, and **18.1 seconds** for `Kubb`, while also producing a single output file versus **16** for `hey-api`, **2,719** for `Orval`, and **3,877** for `Kubb` ([benchmark details](https://dev.to/nyaomaru/which-openapi-codegen-should-you-choose-openapi-typescript-vs-hey-api-vs-orval-vs-kubb-100p)).

<a id="pure-types-favor-control"></a>
### Pure types favor control

A pure-types setup pairs well with a handwritten request layer because you can keep the runtime tiny and the API surface boring. That matters in bundler-sensitive front ends and in apps where one team owns both the spec and the consumer. If you need a reminder that developer experience is not just syntax sugar, the [developer experience angle](https://capgo.app/blog/developer-experience/) is easier to judge when your client code is short, obvious, and reviewable.

<a id="full-clients-favor-handoff-speed"></a>
### Full clients favor handoff speed

`openapi-generator`, `hey-api`, `Orval`, and `Kubb` all try to do more than types. That can be helpful when you want request methods, models, and plumbing generated together, especially in a large handoff between backend and frontend teams. The cost is obvious in the benchmark above, more generated files, more runtime surface, and more room for build friction as the spec grows.

<a id="no-codegen-favors-local-refactors"></a>
### No codegen favors local refactors

Typed request builders and `fetch` wrappers work well when one codebase owns both ends of the shape and the API changes are tightly coordinated. The downside is maintenance discipline. The more teams and repositories sit between producer and consumer, the more likely a hand-written request layer drifts unless you enforce contract tests aggressively.

The core decision point is not ideological. If your bundle budget is tight, pure types are attractive. If your team wants maximum scaffolding and can absorb the output, full clients reduce setup time. If you want minimal moving parts and can keep the contract close, no-codegen request builders can be the right internal trade.

<a id="wiring-a-thin-typed-client-around-fetch-or-axios"></a>
## Wiring a Thin Typed Client Around Fetch or Axios

![A diagram illustrating a Typed Client Wrapper process using generated TypeScript API definitions for web requests.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/8a10b186-00e2-49d8-9109-a21af273e2a6/openapi-typescript-typed-client.jpg)

A thin wrapper is where the generator stops and your application code starts. The wrapper should expose one function per operation, accept typed params and query objects, and forward the call to `fetch` or an injected `axios` instance without trying to be clever. In most production setups, that layer stays around **30–60 lines** because the generated types already carry most of the shape.

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/QmW6_lLaxwU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Here's the mental model that holds up:

- **Path params stay typed** so `/users/{id}` can't be called without an `id`.
- **Query objects stay typed** so optional filters don't turn into string soup.
- **Response bodies stay typed** so parsing code can trust the narrow shape it expects.

A wrapper like that is intentionally boring. It should not invent retries, transforms, or auth policy if those belong somewhere else. It should move the request from a typed operation into the transport layer and then hand the typed result back up.

> Keep the wrapper boring and dependency-light, or every future codegen change will ripple through your app.

The common failure is to patch over mismatches with `as any` when the generated types don't line up with the old wrapper signature. That buys a green build and a fragile app. It also hides the very contract breakage you wanted the generator to reveal.

For teams that prefer Axios, the pattern is the same, only the transport implementation changes. For teams that want simpler browser-side code, `fetch` is often enough. The important part is that the request function accepts the generated path type and returns a typed response, not a loosely shaped object that gets massaged later.

If you use this seam well, **openapi typescript** gives you a clean division of labor. Schema lives in the spec, transport lives in the wrapper, and the app sees typed operations instead of ad hoc request code.

<a id="adding-runtime-validation-with-zod-ajv-or-io-ts"></a>
## Adding Runtime Validation with zod, ajv, or io-ts

TypeScript types disappear at runtime, and the network doesn't care about your editor's confidence. That's why the safe pattern is not “generate types and hope”, it's “generate types, then validate at the edge where untrusted data enters the app”. The generated schema remains the source of truth, and validation libraries like `zod`, `ajv`, and `io-ts` handle the boundary checks that compile-time types can't.

<a id="validate-where-the-data-enters"></a>
### Validate where the data enters

For React apps, the edge is usually right after the request resolves and before the payload enters state. For servers, it's before the payload is written into a database or handed to a business rule. The rule is simple, keep validation close to the boundary and don't scatter manual checks through feature code.

A `zod` shape can mirror the generated response shape without replacing it:

```ts
import { z } from "zod";

const WeatherForecastSchema = z.object({
  date: z.string(),
  temperatureC: z.number(),
  summary: z.string().nullable(),
  temperatureF: z.number().optional(),
});
```

That example validates the fields the schema marked optional, and it keeps the runtime check aligned with what the generator produced. `ajv` is a strong choice when you want high-throughput JSON Schema validation on the server, while `io-ts` still fits teams that already live in the `fp-ts` style of composition.

The big mistake is validating too late. If the payload crosses into your app first, the type system has already been bypassed and the bug has a place to hide. A short guide on [unit tests for JavaScript](https://capgo.app/blog/unit-tests-javascript/) pairs well with this mindset, because both unit tests and boundary validation work best when they catch bad assumptions early.

The clean layering is predictable. **OpenAPI TypeScript** generates the contract, the validator checks the runtime payload, and your app code only sees data that survived both steps. That's a much better boundary than trusting a static type to police an untrusted response.

<a id="putting-generation-validation-and-contract-tests-in-ci"></a>
## Putting Generation, Validation, and Contract Tests in CI

![Screenshot from https://github.com](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/screenshots/09174c7a-2169-482c-967b-010d0d5d1bdf/openapi-typescript-github-homepage.jpg)

A pipeline that lasts turns the contract into a gate, not a suggestion. Regenerate types, fail on drift, run `tsc --noEmit`, and exercise the API shape against a mock or contract tool before merge. If you pin the generator version in `package.json`, two engineers can't accidentally produce different outputs from the same spec.

<a id="a-simple-github-actions-shape"></a>
### A simple GitHub Actions shape

A practical workflow looks like this:

1. Pull the spec from the repo or generated source.
2. Regenerate the types.
3. Fail the job if `git diff` shows changes.
4. Run `tsc --noEmit`.
5. Execute a contract test against a mock server such as Prism or a Spectral-backed check.

The key difference between contract tests and snapshot tests is scope. Snapshots often tell you the file changed. Contract tests tell you whether the shape still behaves like the spec says it should.

A mock server is especially useful when backend and frontend work are separated by time or team boundaries. It gives consumer code a predictable API surface while still checking the actual contract rather than a hard-coded fixture. The [continuous integration setup guide](https://capgo.app/blog/continuous-integration-setup/) is a useful reference if your team still needs a clean, repeatable CI baseline.

Pinning the generator version avoids one of the nastiest failures in codegen pipelines, invisible output skew. If one developer upgrades the generator locally and another doesn't, the generated file can become a source of random noise instead of signal. CI should make that impossible.

The result is a pipeline where schema changes, type generation, compiler checks, and contract tests all reinforce one another. That's what makes the workflow honest.

<a id="maintainable-pipelines-performance-and-a-final-checklist"></a>
## Maintainable Pipelines, Performance, and a Final Checklist

![A checklist showing four key steps for maintaining an OpenAPI TypeScript pipeline for software development projects.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/f6220d17-0289-4953-b4f1-2a7e0341dcd7/openapi-typescript-pipeline-checklist.jpg)

The pipelines that survive are the ones with boring governance. Version the spec, review schema changes like code, pin the generator, and document how breaking changes get approved. If the process is fuzzy, people will route around it, and then the generated types become decoration instead of enforcement.

<a id="a-few-performance-levers-actually-matter"></a>
### A few performance levers actually matter

Incremental generation helps in monorepos where the spec changes often but only one package consumes it. `tsc --incremental` can trim repeated compiler work, and disabling output flags you don't need in production builds keeps the generated surface smaller. In practice, the biggest win is still social, not technical, because a predictable pipeline gets run more often than a clever one.

The checklist below is the one worth keeping close:

- **Version pinning:** Lock the `openapi-typescript` version in `package.json` so output doesn't drift across machines.
- **Schema review:** Treat spec changes as reviewable contract changes, not housekeeping.
- **Drift detection:** Regenerate in CI and fail on diff.
- **Edge validation:** Parse untrusted payloads before they reach app state or persistence.
- **Contract testing:** Run a mock-backed check that proves consumer code still matches the schema.
- **Breaking-change policy:** Write down who approves shape changes and how clients are notified.

A pipeline that includes those gates doesn't just generate types, it makes the contract visible. That visibility is what keeps teams from trusting a file that only looks safe.

If you're shipping Capacitor or Electron apps and you want your update pipeline to behave with the same discipline, Capgo gives you a practical way to move JavaScript, CSS, copy, config, and asset fixes quickly without waiting on app store review. Visit [Capgo](https://capgo.app) to see how its signed bundles, rollback protection, and release controls fit into a release process that needs speed without losing control.
