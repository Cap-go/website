---
slug: api-in-typescript
title: API in TypeScript How to Build a Production Ready Typed API
description: 'Learn how to build an API in TypeScript from scaffolding to deployment with typed DTOs, validation, clients, and production best practices.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-09-20T07:50:42.664Z
updated_at: 2026-09-20T07:50:45.794Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/234040f0-f831-44ea-8c22-895ed1d3b424/api-in-typescript-title-slide.jpg'
head_image_alt: API in TypeScript How to Build a Production Ready Typed API
keywords: 'api in typescript, typescript api tutorial, typed api development, typescript backend guide, api validation typescript'
tag: 'Mobile, Tutorial, Guides'
published: true
locale: en
next_blog: ''
---
Your TypeScript API probably looked solid on release day. The routes compiled, the frontend imported shared types, and the editor gave everyone that clean green feeling that usually means “safe to ship.”

Then the backend changed one response field, one nullable value showed up where nobody expected it, or one mobile client kept calling an older payload shape. That's where most **API in TypeScript** work breaks. Not in syntax. In drift.

## Table of Contents
- [Why Typed APIs Fail After Launch and How to Prevent It](#why-typed-apis-fail-after-launch-and-how-to-prevent-it)
- [Scaffolding Your TypeScript API Project the Right Way](#scaffolding-your-typescript-api-project-the-right-way)
  - [Pick the framework that matches team shape](#pick-the-framework-that-matches-team-shape)
  - [Use a folder layout that protects boundaries](#use-a-folder-layout-that-protects-boundaries)
  - [Tighten the compiler before adding features](#tighten-the-compiler-before-adding-features)
- [Designing DTOs and Validating Input at the Boundary](#designing-dtos-and-validating-input-at-the-boundary)
  - [Public contracts and internal models should not be the same](#public-contracts-and-internal-models-should-not-be-the-same)
  - [Validate before business logic touches the data](#validate-before-business-logic-touches-the-data)
  - [Mapping code is not waste. It is where drift becomes visible](#mapping-code-is-not-waste-it-is-where-drift-becomes-visible)
  - [Shared types only help when the source of truth is explicit](#shared-types-only-help-when-the-source-of-truth-is-explicit)
  - [A maintainable boundary looks boring on purpose](#a-maintainable-boundary-looks-boring-on-purpose)
- [Generating and Consuming a Fully Typed API Client](#generating-and-consuming-a-fully-typed-api-client)
  - [Choosing your typed client strategy](#choosing-your-typed-client-strategy)
  - [Hand-rolled clients work for small surfaces](#hand-rolled-clients-work-for-small-surfaces)
  - [OpenAPI generation is the practical default](#openapi-generation-is-the-practical-default)
  - [Wrap generated clients before application code touches them](#wrap-generated-clients-before-application-code-touches-them)
  - [SDK-style clients make sense when the API is a product](#sdk-style-clients-make-sense-when-the-api-is-a-product)
- [Error Handling Testing and Observability That Actually Helps](#error-handling-testing-and-observability-that-actually-helps)
  - [Narrow errors before touching them](#narrow-errors-before-touching-them)
  - [Retry only when the error is transient](#retry-only-when-the-error-is-transient)
  - [Observability should explain failures, not just record them](#observability-should-explain-failures-not-just-record-them)
  - [Test the contract, not just the implementation](#test-the-contract-not-just-the-implementation)
- [Shipping to Production With Confidence and Control](#shipping-to-production-with-confidence-and-control)
  - [The release loop that holds up](#the-release-loop-that-holds-up)
  - [Control matters as much as correctness](#control-matters-as-much-as-correctness)

<a id="why-typed-apis-fail-after-launch-and-how-to-prevent-it"></a>
## Why Typed APIs Fail After Launch and How to Prevent It

A typed API usually breaks during an ordinary release. One team renames a response field. Another adds a nullable branch for a partial migration. An older client keeps sending the previous payload because mobile updates trail behind web. TypeScript still compiles in every repo that updated its local types. The contract in production is already false.

That failure has a name: contract drift.

![A diagram explaining three main reasons why typed APIs fail in production environments after their initial launch.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/dbc7f3d4-c916-4e88-b5e3-246a4bdb1e9d/api-in-typescript-api-failure.jpg)

TypeScript made API work more pleasant, but it also made weak contracts easier to overtrust. Shared interfaces, route generics, and a typed `fetch` wrapper help during development. They do not prove that the JSON crossing the network still matches those types after the second or tenth release.

The rule that holds up in production is simple.

> **If unvalidated JSON can flow straight into application logic, your TypeScript types describe intent, not reality.**

The fix is less about clever type gymnastics and more about where truth lives:

- **Validate at the boundary.** Parse request bodies, params, headers, and even downstream service responses before the rest of the code touches them.
- **Map DTOs to domain models.** Keep transport shapes separate from business objects so API churn does not leak through the whole codebase.
- **Generate types from a contract.** OpenAPI, JSON Schema, or a schema-first framework gives clients and servers a shared source of truth.
- **Treat breaking changes as public events.** If a field changes shape, version it deliberately and communicate it like any other external contract change.

DTO mapping is the piece teams skip most often. It feels redundant at first. After a few releases, it becomes the layer that saves you from spreading `string | null` and legacy field aliases through every service and frontend screen. A small translation step at the boundary is cheaper than a wide refactor later.

Typed APIs also fail because error contracts are usually an afterthought. Success payloads get attention. Failure payloads turn into whatever a thrown exception happened to serialize that day. Clients then build retry logic, user messaging, and monitoring on shapes that were never designed. The result is the same problem in a different form. Drift.

Versioning deserves the same discipline. Teams rarely break clients with one dramatic rewrite. They break them with a series of reasonable local changes that add up to incompatibility. A clear [API versioning strategy for evolving contracts](https://capgo.app/blog/api-versioning-strategy/) makes those changes visible before they hit consumers.

The goal is not to have TypeScript everywhere. The goal is to keep the contract truthful after launch, when multiple deploys, multiple clients, and real production data start pushing against the neat types you had on day one.

<a id="scaffolding-your-typescript-api-project-the-right-way"></a>
## Scaffolding Your TypeScript API Project the Right Way

A typed API usually looks clean on day one. Six months later, one route accepts unchecked input, another reads raw `process.env`, and a third returns a shape no client was coded against. The scaffold rarely breaks all at once. It creates enough room for contract drift to slip into normal feature work.

Start with a project shape that makes the contract hard to bypass.

![A developer typing code on a laptop screen showing a TypeScript error in an IDE terminal.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/aaeaeb7e-a69b-400d-872a-62743e0e37de/api-in-typescript-coding-workspace.jpg)

<a id="pick-the-framework-that-matches-team-shape"></a>
### Pick the framework that matches team shape

For an API in TypeScript, the first framework decision is less about syntax and more about where contract discipline will live.

- **Express** fits teams that want minimal abstraction and already know the middleware model. It stays out of the way, which is useful until every route invents its own validation, error shape, and response conventions.
- **Fastify** is a strong default for small and mid-sized backend teams. Its plugin system is clean, and it pushes schema work closer to the route layer, which helps keep runtime behavior aligned with the types.
- **Nest** works well for larger codebases with many contributors, shared modules, and explicit ownership boundaries. The cost is ceremony, and that cost is real if the service itself is small.

I usually avoid buying more framework than the team will use. A small service with Fastify, a validation library, and generated contract types often survives refactors better than a heavier stack with inconsistent conventions layered on top.

<a id="use-a-folder-layout-that-protects-boundaries"></a>
### Use a folder layout that protects boundaries

Folder names matter less than import pressure. If routes can reach into database models, or services can return ORM entities straight to clients, the scaffold is already inviting drift.

A layout that holds up in production usually separates transport concerns from application concerns:

- **`src/routes`** for HTTP wiring only
- **`src/schemas`** for request and response schemas
- **`src/dto`** for transport types and mapping code
- **`src/services`** for use cases and orchestration
- **`src/domain`** for business models that should outlive any single endpoint
- **`src/clients`** for downstream integrations
- **`src/errors`** for shared error types and narrowing helpers
- **`src/config`** for startup-time configuration parsing

That `src/dto` layer is not busywork. It gives the API a place to absorb external changes without leaking them into domain logic or back out through unrelated endpoints.

Configuration deserves the same treatment. Parse environment variables once at startup, fail fast on invalid values, and export a typed config object to the rest of the app. Teams that keep reading `process.env` inside handlers usually end up with branchy runtime behavior that TypeScript cannot help with. This guide on [environment configuration](https://capgo.app/blog/environment-configuration/) is a good reference if you need to standardize that pattern.

<a id="tighten-the-compiler-before-adding-features"></a>
### Tighten the compiler before adding features

A production API should make unsafe code annoying to write.

Useful defaults include:

- **`strict` enabled**
- **`useUnknownInCatchVariables` enabled**
- **`noUncheckedIndexedAccess` enabled if the team can handle the extra discipline**
- **No path aliases unless Node, tests, bundling, and tooling all resolve them the same way**
- **Separate `build`, `typecheck`, and lint scripts in CI**

A weak `tsconfig` lets drift accumulate unnoticed. A strict one turns mismatches into visible work before they become production behavior.

Lint rules help too, especially rules against `any`, floating promises, and accidental exports from public contract modules. None of that replaces runtime validation, but it reduces the number of places where contract mistakes can hide.

One more scaffolding choice matters early. Decide where your OpenAPI spec will come from and keep that decision close to the route layer. Some teams generate it from code-first schemas. Others generate server stubs and types from the spec first. Either approach can work. What fails is treating the spec as a side artifact that no one checks after the first release.

After the initial scaffold, it helps to compare how typed contracts behave outside plain request-response services. The [Streamkap Flink TypeScript guide](https://streamkap.com/resources-and-guides/apache-flink-typescript-support-with-streamkap) is useful for teams working with streams or event-heavy systems, where contract drift shows up across longer pipelines, not just in HTTP handlers.

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/H91aqUHn8sE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="designing-dtos-and-validating-input-at-the-boundary"></a>
## Designing DTOs and Validating Input at the Boundary

A typed API usually looks correct on day one. Six months later, the bugs show up at the boundary. A mobile client still sends an old field. A partner omits a property your frontend assumed was always present. A refactor exposes an internal ORM column in a public response. TypeScript did its job inside the codebase. The contract still drifted.

That is why DTO design matters. It is not about making request bodies look tidy. It is about keeping public types honest after the first release.

<a id="public-contracts-and-internal-models-should-not-be-the-same"></a>
### Public contracts and internal models should not be the same

A **DTO** describes what crosses the wire. A **domain model** describes what the application needs to do real work. Merging those concerns saves a few lines early and creates expensive coupling later.

![A diagram illustrating DTO design and validation processes for maintaining a secure system boundary and API contract.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/11c7133f-497f-428e-ad29-81a8b5e8aea1/api-in-typescript-dto-validation.jpg)

If your route receives this:

```ts
type CreateOrderRequestDto = {
  customerId: string
  items: Array<{ sku: string; quantity: number }>
  note?: string | null
}
```

your service layer should still accept something narrower and cleaner, such as an `OrderDraft` with normalized strings, validated quantities, and defaults applied in one place.

The boundary usually needs these steps:

1. Parse the inbound payload
2. Validate the shape and field-level constraints
3. Map the DTO to a domain object
4. Run business logic on the domain object
5. Map the result to a response DTO
6. Validate the outbound response before sending it

Step six gets skipped a lot. It is also the step that catches private fields, nullable values that leaked into a stable response, and accidental schema changes during refactors.

<a id="validate-before-business-logic-touches-the-data"></a>
### Validate before business logic touches the data

Compile-time types do not validate JSON from the network. They also do not protect you from another service returning a shape that still satisfies `unknown` and breaks your assumptions at runtime.

For API work in TypeScript, Zod is a common choice because it parses at runtime and infers types for the rest of the code. Valibot, io-ts, and similar libraries can work too. The library matters less than the rule. Untrusted data gets parsed before anything else uses it.

A pattern that survives refactors looks like this:

- **Inbound schemas** reject malformed request data
- **Dependency schemas** validate responses from third-party APIs and internal services
- **Outbound schemas** verify the response your API is about to publish

That middle layer is where many typed APIs fail after launch. Teams validate requests, skip validation on downstream responses, and then wonder why a vendor field rename turns into a production incident.

Here is the practical rule I use. Raw JSON stops at the route layer.

<a id="mapping-code-is-not-waste-it-is-where-drift-becomes-visible"></a>
### Mapping code is not waste. It is where drift becomes visible

Teams often resist DTO mapping because it feels repetitive. I have seen the opposite in production. A thin mapping layer is where contract changes become obvious, reviewable, and local.

For example:

- transport allows `note?: string | null`
- domain model may store `note: string` with `""` as the default
- response DTO may omit `note` entirely when it is empty

Those are three different truths for three different audiences. Treating them as one shared interface hides the difference until a client breaks.

A webhook makes this even clearer because consumers may keep your payload shape around for years. If your team is working through that problem, this [webhook payload design example](https://capgo.app/blog/web-hook-example/) is a useful companion.

<a id="shared-types-only-help-when-the-source-of-truth-is-explicit"></a>
### Shared types only help when the source of truth is explicit

Copying backend interfaces into the frontend is drift with a time delay. Shared packages can help, but only for types that are intentionally public.

A setup that holds up better in larger codebases looks like this:

- define public request and response schemas separately from persistence models
- generate OpenAPI from those public schemas, or generate server types from OpenAPI first
- keep generated contract types close to handlers and clients
- keep domain types and ORM models internal
- version public DTOs deliberately when compatibility matters

That separation is also consistent with the [TypeScript design guidelines from the Azure SDK team](https://azure.github.io/azure-sdk/typescript_design.html), which stress stable public surfaces and keeping internal implementation details out of the contract.

<a id="a-maintainable-boundary-looks-boring-on-purpose"></a>
### A maintainable boundary looks boring on purpose

The good version is less clever.

Before, the frontend trusts `fetch().json()` as if it were truth, the backend returns ORM objects directly, and one shared interface tries to represent every layer. After, each boundary parses data, DTOs stay narrow, domain models stay internal, generated types cover the public contract, and mapping code makes changes explicit.

It adds ceremony. It also gives you one place to review drift before callers find it for you.

<a id="generating-and-consuming-a-fully-typed-api-client"></a>
## Generating and Consuming a Fully Typed API Client

A typed client often looks finished on release day. Three months later, one endpoint starts returning a nullable field, another adds cursor pagination, and a mobile app pins an older version of the contract. The TypeScript types still compile. Callers still break.

That is the job of the client layer. It should keep the published contract truthful after the first release, not just make editor autocomplete look good.

<a id="choosing-your-typed-client-strategy"></a>
### Choosing your typed client strategy

The client shape should match the API's actual complexity, not the team's preference.

| Approach | Best For | Trade Off |
|---|---|---|
| Hand-rolled fetch wrapper | Small apps, unusual auth flows, fast iteration | Quick to start. Easy to fragment across callsites over time |
| OpenAPI code generation | Straightforward REST APIs with stable schemas | Strong baseline. Needs help for custom auth, streaming, or unusual pagination |
| SDK-style typed client | Multi-team platforms, public APIs, long-lived integrations | Highest maintenance cost. Best consumer experience when the API is a product |

<a id="hand-rolled-clients-work-for-small-surfaces"></a>
### Hand-rolled clients work for small surfaces

A custom `fetch` wrapper is a reasonable choice when the API is internal, the surface area is small, or transport behavior matters more than schema generation. I still use this approach for admin tools and early-stage services.

The failure mode is drift. One team adds a retry rule in the wrapper. Another bypasses it. A third copies a response type into the frontend and widens it to `any` after the first mismatch. You end up with "typed" calls that no longer represent what the server returns.

Use a hand-rolled client when these conditions are true:

- the API is small and internal
- the contract changes often enough that regenerating code becomes noise
- custom transport behavior dominates the work
- you are willing to keep runtime parsing in the client, not just TypeScript annotations

That last point matters. `response.json()` returns unknown data at runtime, even if the function signature says otherwise.

<a id="openapi-generation-is-the-practical-default"></a>
### OpenAPI generation is the practical default

For stable REST APIs, generated types give the best maintenance-to-safety ratio. They remove a lot of duplicate type writing and make contract changes visible in pull requests.

The pattern that survives refactors is simple. Generate from the public contract, keep the generated layer thin, and add a small wrapper where your consumers need better ergonomics. The [OpenAPI TypeScript generation workflow](https://capgo.app/blog/openapi-typescript/) fits that model well.

A useful split looks like this:

- generated code owns request and response shapes
- a thin SDK wrapper owns auth injection, retries, and pagination helpers
- runtime validation still happens at the server boundary and anywhere untrusted input re-enters the system
- DTO mapping stays explicit so internal model changes do not leak into the client contract

That hybrid approach keeps the generated code boring, which is good. Boring code is easier to regenerate, review, and replace.

<a id="wrap-generated-clients-before-application-code-touches-them"></a>
### Wrap generated clients before application code touches them

Generated functions are usually too raw for broad use across a codebase. They expose transport details that every caller then has to relearn.

A thin wrapper gives you one place to keep policy consistent:

- attach default headers and request IDs
- normalize error shapes
- expose pagination as an iterator or helper method
- support per-request auth overrides for multi-tenant cases
- preserve generated request and response types instead of rewriting them by hand

For example, application code should call `client.orders.listAll()` or `client.orders.list({ cursor })`, not manually assemble query strings and parse pagination metadata at every callsite.

<a id="sdk-style-clients-make-sense-when-the-api-is-a-product"></a>
### SDK-style clients make sense when the API is a product

Public APIs and shared platform services need more than generated endpoint functions. Consumers expect naming consistency, predictable errors, and transport details hidden behind methods that match the domain.

Good client ergonomics usually look like this:

- `client.orders.list()` returns a typed page or async iterator
- `client.files.stream()` handles streaming without leaking low-level fetch setup into every call
- auth can be set globally and overridden per request
- callers receive stable typed error objects instead of ad hoc thrown payloads

That adds maintenance cost. It also prevents each consuming team from rebuilding the same boundary rules slightly differently, which is how contract drift spreads.

A fully typed client is not the finish line. The finish line is a client whose types still match reality after the API evolves, because generation starts from the public contract, runtime validation protects the boundary, and DTO mapping keeps internal changes from leaking outward.

<a id="error-handling-testing-and-observability-that-actually-helps"></a>
## Error Handling Testing and Observability That Actually Helps

Most TypeScript API examples are overly calm. Requests succeed, JSON matches the interface, and failures become `throw new Error("something went wrong")`. Production never behaves that politely.

The first fix is mechanical. In TypeScript, **caught values should be treated as `unknown`**, then narrowed before reading `message`, `stack`, or response properties. Expert guidance also recommends custom error classes, preserving the original failure with `cause`, validating at boundaries, normalizing non-Error throws, and attaching request context for observability ([TypeScript error handling guidance](https://agentskb.com/kb/typescript_error_handling/)).

![An infographic detailing five best practices for writing resilient production code in a TypeScript environment.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/e57bb2ad-4437-44e6-856e-894189f87e44/api-in-typescript-production-resilience.jpg)

<a id="narrow-errors-before-touching-them"></a>
### Narrow errors before touching them

Unsafe catch blocks are still common:

```ts
try {
  await client.orders.create(input)
} catch (error) {
  logger.error(error.message)
}
```

That assumes too much. `error` might not be an `Error` at all.

A safer pattern:

```ts
try {
  await client.orders.create(input)
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error({ message: error.message, stack: error.stack })
    throw new OrderSyncError("Order sync failed", { cause: error })
  }

  logger.error({ error })
  throw new OrderSyncError("Order sync failed", { cause: new Error("Non-Error thrown") })
}
```

This looks slightly heavier. It survives far better when failures come from third-party SDKs, failed JSON parsing, or unexpected throws.

<a id="retry-only-when-the-error-is-transient"></a>
### Retry only when the error is transient

The second big improvement is error classification. Guidance for TypeScript SDK and API operations converges on a clean rule: **retry transient failures such as network errors or HTTP 429 and 503 responses, validate early, preserve error context, and avoid retries for business-rule failures**. The same guidance also recommends `Promise.all` for fail-fast parallel work and `Promise.allSettled` when partial success is acceptable ([SDK error handling patterns](https://sdk.pinecone.io/typescript/documents/typescript-features_error-handling.html)).

I like three buckets:

- **Validation errors** mean the request was wrong before it left your process.
- **Transient errors** may succeed on retry with backoff.
- **Permanent errors** reflect business rules, permissions, or missing resources and should surface directly.

That classification drives better code than a generic “retry on failure” helper ever will.

> **Field rule:** Retries belong to transport uncertainty, not to domain disagreement.

<a id="observability-should-explain-failures-not-just-record-them"></a>
### Observability should explain failures, not just record them

Logs without context aren't observability. For API in TypeScript, attach a correlation ID, route name, request metadata, and normalized error shape everywhere a request crosses a boundary.

A useful baseline:

- **Correlation IDs** tie one inbound request to downstream calls
- **Structured logs** store fields, not prose blobs
- **Boundary logs** capture parse failures separately from business exceptions
- **Alerting** keys off error class and route, not just status code volume

If your mobile or client applications consume these APIs, update observability matters too. One practical option in the release layer is **Capgo**, which provides typed APIs for shipping and tracking live updates in Capacitor and Electron environments. That's useful when a client-side contract fix needs controlled rollout and per-version visibility rather than another blind app-store wait. For teams tightening the full feedback loop, this guide on [app observability](https://capgo.app/blog/app-observability/) fits well alongside server-side logging.

<a id="test-the-contract-not-just-the-implementation"></a>
### Test the contract, not just the implementation

Unit tests alone won't catch drift. Add tests where drift happens.

- **Boundary validation tests:** Feed malformed input into schemas and assert failure shape.
- **Contract tests:** Confirm actual HTTP responses match the published contract.
- **Typed error assertions:** Verify transient and permanent failures normalize correctly.
- **Client integration tests:** Ensure generated or wrapped clients parse real responses.

A strong test suite for typed APIs doesn't just prove code paths. It proves your contract is still telling the truth.

<a id="shipping-to-production-with-confidence-and-control"></a>
## Shipping to Production With Confidence and Control

Release quality comes from a repeatable loop. Not heroics.

A reliable API in TypeScript pipeline usually has a few essentials: schema checks in CI, type checks on generated artifacts, contract diff review before merge, and a deployment path that can slow down or roll back when a client population isn't ready.

<a id="the-release-loop-that-holds-up"></a>
### The release loop that holds up

I like to keep the production checklist short enough that teams follow it:

- **Fail CI on contract drift:** If OpenAPI changes, generated types and clients must update in the same change.
- **Version shared contracts deliberately:** Public DTO packages need release discipline, not casual refactors.
- **Roll out by channel or cohort:** Don't expose every consumer to a breaking integration change at once.
- **Keep rollback simple:** Reverting the contract, client, or web bundle should be operationally boring.

For teams moving infrastructure and deployment workflows at the same time, this guide to [cloud migration for developers](https://uptimewebhosting.com.au/website-hosting/cloud-hosting-for-developers/) is a helpful planning reference because API reliability often degrades during platform transitions, not just during code changes.

<a id="control-matters-as-much-as-correctness"></a>
### Control matters as much as correctness

The final production habit is visibility by version. You need to know which client build is calling which contract, which releases adopted successfully, and where failures cluster after rollout. That's especially important for mobile and edge-distributed consumers that don't all update immediately.

If your stack includes Capacitor or Electron, live update tooling can reduce the lag between fixing a contract bug and getting the fix into users' hands. The important part isn't “faster updates” in the abstract. It's having **channel-based rollout, rollback protection, and version-level observability** so contract fixes stay controlled.

Typed APIs stay healthy when schema, runtime validation, client generation, and release operations all reinforce each other. Miss one layer and the others end up compensating badly.

---

Capgo gives teams shipping Capacitor and Electron apps a typed way to deliver web bundle fixes, control rollout channels, and monitor adoption and failures by version. If your API contract fixes also need to reach clients quickly without waiting on store review, visit [Capgo](https://capgo.app).
