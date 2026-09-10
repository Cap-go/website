---
slug: what-is-a-micro-frontend
title: What Is a Micro Frontend and How It Works
description: 'Learn what is a micro frontend, compare core architecture patterns, understand tradeoffs, and see how to apply the approach in Capacitor and Electron apps.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-09-10T08:43:45.415Z
updated_at: 2026-09-10T08:46:28.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/9f23e109-42ba-4324-85b9-507ea19c7c2e/what-is-a-micro-frontend-micro-frontend.jpg'
head_image_alt: What Is a Micro Frontend and How It Works
keywords: 'micro frontend, frontend architecture, module federation, Capacitor, live updates'
tag: 'Mobile, Updates, Technology'
published: true
locale: en
next_blog: ''
---
A micro frontend is a user interface composed of independently owned and deployable frontend applications. The approach was formally highlighted by Thoughtworks in **2016**, and a **2024** survey reported that **23.6%** of respondents had used micro frontends in the previous year, compared with **75.4%** in **2022**. [State of Frontend data](https://www.visualjs.in/sd/micro-frontends)

You may be dealing with the problem already. Three product teams share one frontend repository and wait for the same release train, even when one team is changing checkout, another is updating profiles, and the third is adjusting marketing pages. A micro frontend architecture separates those product areas so teams can own, test, and release them independently while users still experience one application.

That distinction matters. Micro frontends aren't smaller folders, components, or bundles. Their central purpose is **organizational and release independence**, supported by technical boundaries that make ownership explicit. The architecture can remove a coordination bottleneck, but it also introduces runtime integration, dependency governance, testing, security, and performance responsibilities.

## Table of Contents
- [Understanding the Micro Frontend Concept](#understanding-the-micro-frontend-concept)
  - [From one frontend to several owned applications](#from-one-frontend-to-several-owned-applications)
  - [A composed store analogy](#a-composed-store-analogy)
- [How Micro Frontend Architecture Works](#how-micro-frontend-architecture-works)
  - [The shell and its fragments](#the-shell-and-its-fragments)
  - [Communication without recreating the monolith](#communication-without-recreating-the-monolith)
- [Comparing Core Micro Frontend Patterns](#comparing-core-micro-frontend-patterns)
  - [Iframes](#iframes)
  - [Web components](#web-components)
  - [Module Federation](#module-federation)
  - [single-spa](#single-spa)
- [Benefits Tradeoffs and Hidden Risks](#benefits-tradeoffs-and-hidden-risks)
  - [The performance bill](#the-performance-bill)
  - [Security at the seams](#security-at-the-seams)
- [Testing Deployment and Migration Practices](#testing-deployment-and-migration-practices)
  - [Build a layered test system](#build-a-layered-test-system)
  - [Control the release surface](#control-the-release-surface)
  - [Migrate one domain at a time](#migrate-one-domain-at-a-time)
- [Using Micro Frontends in Capacitor and Electron](#using-micro-frontends-in-capacitor-and-electron)
  - [Live updates and rollback](#live-updates-and-rollback)
  - [What changes in a native shell](#what-changes-in-a-native-shell)
- [When to Choose Micro Frontends](#when-to-choose-micro-frontends)

<a id="understanding-the-micro-frontend-concept"></a>
## Understanding the Micro Frontend Concept

<a id="from-one-frontend-to-several-owned-applications"></a>
### From one frontend to several owned applications

A traditional frontend often has one repository, one build, and one deployment boundary. Even if the code is divided into clean feature folders, the teams behind those folders may still depend on the same pipeline and release schedule. A small change in one area can trigger a full application build, shared regression testing, and coordination across every team.

A micro frontend divides the browser application around **business capabilities**. The checkout team owns checkout, the profile team owns account settings, and the marketing team owns promotional content. Each slice can have its own codebase, delivery process, and release cadence, then become part of a larger experience through a shell or composition layer.

Martin Fowler defines the pattern as **“an architectural style where independently deliverable frontend applications are composed into a greater whole”** in his foundational [micro frontends architecture guide](https://martinfowler.com/articles/micro-frontends.html). The phrase “independently deliverable” carries more weight than “frontend applications.” Without an independent deployment boundary, you may have a modular monolith rather than a micro frontend system.

![Stressed office workers sitting at desks holding papers representing different micro frontend development teams in an office.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/6d1db387-862b-43c4-ab50-06755ab71596/what-is-a-micro-frontend-team-stress.jpg)

<a id="a-composed-store-analogy"></a>
### A composed store analogy

Think of a department store. One crew manages the storefront, another operates the checkout counter, and another handles returns. The shopper sees one store, but each area has different processes, responsibilities, and staff. A micro frontend works similarly: the browser renders one product experience while several teams operate distinct interface areas behind the scenes.

The app shell usually owns the shared frame, navigation, authentication context, and route decisions. A micro frontend owns the page or capability inside that frame. Teams agree on the boundaries between them, but they don't need to share every implementation detail.

The term became associated with extending **microservices thinking to the browser** after Thoughtworks highlighted it in its November 2016 Technology Radar. Fowler later documented its progression from Assess to Trial and then Adopt, which describes the pattern's movement from an emerging technique toward a more established architectural option. For a broader practical overview of [scalable web development by Nerdify](https://getnerdify.com/blog/what-is-a-micro-frontend/), it helps to compare the pattern with adjacent approaches such as plugin architecture, which is discussed in this [plugin architecture guide](https://capgo.app/blog/what-is-plugin-architecture/).

The important lesson is that micro frontends aren't a default upgrade for every interface. They make sense when team boundaries and release boundaries are creating real pain. The cost is justified only when that independence is worth managing more contracts, assets, runtime failure modes, and operational tooling.

<a id="how-micro-frontend-architecture-works"></a>
## How Micro Frontend Architecture Works

<a id="the-shell-and-its-fragments"></a>
### The shell and its fragments

A working system usually starts with an **app shell**, also called a container or orchestrator. The shell renders the common layout, establishes routing, supplies authentication context, and provides shared interface elements such as navigation or notifications. It also decides which micro frontend to load and where that fragment should mount.

Each fragment is an independently maintained application. It may live in a separate repository, use its own CI pipeline, publish its own version, and expose a bundle, fragment, web component, or remote module. The shell composes those pieces in the browser, either when the page loads or when a route requires them.

![A diagram illustrating micro frontend architecture with an app shell connecting to shopping cart, user avatar, and megaphone components.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/d3f94835-6a76-4f90-aea1-50444d0034c4/what-is-a-micro-frontend-architecture-diagram.jpg)

A boundary isn't useful unless the teams can rely on it. The shell and each fragment need an explicit contract covering mount behavior, route ownership, loading states, error handling, design tokens, accessibility expectations, and supported dependency versions.

> **Practical rule:** Share contracts and visual primitives deliberately. Don't share runtime implementation details merely because two teams currently use the same framework.

<a id="communication-without-recreating-the-monolith"></a>
### Communication without recreating the monolith

Fragments sometimes need to communicate. A checkout slice may need to know that a user signed in, while a profile slice may need to publish an account-updated event. Teams can use custom browser events, a shared store, URL parameters, or injected services.

Every option creates a different coupling profile:

- **Custom events** keep ownership separate, but teams must document event names, payload shapes, and timing.
- **Shared stores** simplify coordinated state, yet they can recreate the central dependency graph that the architecture was meant to reduce.
- **URL parameters** work well for navigation and shareable state, although they aren't suitable for every interaction.
- **Injected services** provide controlled capabilities, but the shell must maintain those service contracts.

The shell should coordinate only what belongs to the whole application. If it becomes responsible for every fragment's state and business rule, it has become a distributed monolith with a more complicated deployment process.

The historical progression documented by Fowler explains why the pattern is often compared with microservices. Both approaches separate ownership and delivery, but micro frontends apply that independence to the browser interface. In current tooling, [Module Federation usage](https://www.visualjs.in/sd/micro-frontends) has become prominent, while single-spa remains an orchestration option for teams that want lifecycle-based application registration.

For example, the checkout team might release a payment-flow correction without rebuilding the catalog fragment. The catalog team can continue on a slower release cadence because the shell loads each approved slice according to its runtime configuration. That independent delivery boundary, not the visual appearance of separate components, is the architecture's main payoff.

A team evaluating the surrounding platform also needs to consider [application infrastructure for frontend systems](https://capgo.app/blog/app-infrastructure/), because repositories and frameworks alone won't provide reliable composition.

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/lKKsjpH09dU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="comparing-core-micro-frontend-patterns"></a>
## Comparing Core Micro Frontend Patterns

No single integration mechanism solves every micro frontend problem. Choose by comparing isolation, communication, dependency sharing, browser behavior, and operational ownership rather than selecting the most fashionable tool.

| Pattern | Isolation | Integration Model | Shared Dependencies | Performance | Best Fit |
|---|---|---|---|---|---|
| Iframes | Strong process and document isolation | Embedded document with cross-frame messaging | None by default | Can add loading and communication overhead | Untrusted, legacy, or highly isolated experiences |
| Web components | Encapsulated element and, where used, Shadow DOM styling | Custom elements mounted by the shell | Shared design tokens and browser APIs | Often predictable, but depends on component weight | Standards-oriented teams needing framework flexibility |
| Module Federation | Moderate runtime isolation | Remote modules loaded and mounted at runtime | Explicitly negotiated or bundled dependencies | Efficient when loading and deduplication are controlled | Closely integrated applications with independent releases |
| single-spa | Orchestration boundary rather than a complete isolation model | Applications registered through lifecycle hooks | Depends on the applications and root configuration | Depends on loading rules and framework composition | Multi-framework orchestration with route-based activation |

<a id="iframes"></a>
### Iframes

An iframe gives the strongest boundary in this comparison. The embedded application has its own document, styles, and JavaScript environment, so it won't accidentally mutate the host page's DOM. Cross-window messaging can create a controlled communication path.

That isolation makes iframes useful for legacy systems, partner experiences, or content that must remain separate. The cost appears in responsive layout, navigation, accessibility, focus management, and shared authentication. A checkout iframe can feel like a foreign surface if the host and embedded application don't coordinate carefully.

<a id="web-components"></a>
### Web components

Web components use browser standards rather than requiring every team to adopt the same framework. Custom elements define a stable mounting surface, and Shadow DOM can limit style leakage. The shell still needs to handle application routing, loading states, error boundaries, and shared design tokens.

This option works well when teams want framework flexibility without making the browser load entire application runtimes for every slice. It doesn't automatically solve dependency size, state communication, or governance. A custom element can still contain a large application with its own operational complexity.

<a id="module-federation"></a>
### Module Federation

Module Federation, introduced with Webpack 5 and supported by tools such as Vite and Rspack, loads compiled modules from remote entries at runtime. It offers tight integration, which makes shared components and coordinated navigation feel more natural than they often do with iframes.

That convenience creates responsibility. Teams need compatible exposed interfaces, rules for shared dependencies, remote version handling, and a recovery plan when a remote cannot load. [The difference between monolithic and microservice architecture](https://capgo.app/blog/monolithic-vs-microservice-architecture/) provides useful context for separating deployment independence from simple code decomposition.

<a id="single-spa"></a>
### single-spa

single-spa acts as a framework-agnostic orchestrator. Teams register applications and lifecycle hooks, then the root configuration activates them according to routes or other conditions. It can coordinate applications built with different frameworks, but it doesn't remove the need for contracts, dependency policies, performance budgets, or security controls.

Teams can combine these mechanisms. For example, a single-spa root might coordinate routes, Module Federation might provide remote modules, and web components might define the public mounting surface. That combination can be powerful, but every added layer increases the number of behaviors that developers must understand and test.

<a id="benefits-tradeoffs-and-hidden-risks"></a>
## Benefits Tradeoffs and Hidden Risks

Micro frontends move decisions across boundaries. They can reduce the blast radius of a release and give teams more control, but the system must then manage more artifacts, contracts, and runtime conditions.

| Dimension | Benefit | Tradeoff / Hidden Risk |
|---|---|---|
| Team autonomy | Teams own a business slice end to end | Teams must maintain separate pipelines, on-call ownership, and release discipline |
| Deployment | A fragment can ship without rebuilding the full interface | Releases become non-atomic, so incompatible versions may meet in production |
| Failure isolation | A failed remote can be contained with a fallback | Poor error boundaries can still leave navigation or critical journeys unusable |
| Performance | Lazy loading and smaller initial bundles can help common flows | More requests, duplicated framework code, and remote initialization can hurt runtime performance |
| Technology choice | Teams can use different frameworks where boundaries permit | Debugging, accessibility, design consistency, and hiring become harder across a mixed stack |
| Security | A boundary can limit direct implementation sharing | The shell may execute remote code that it hasn't adequately verified |
| Governance | Shared standards can preserve a coherent product | Design systems, dependency rules, contracts, and platform support require continuous coordination |

<a id="the-performance-bill"></a>
### The performance bill

Independent slices usually produce separately built assets. Without careful loading rules, the browser may request more files, initialize more code, or download duplicate framework dependencies. Performance guidance for micro frontends emphasizes on-demand loading, careful dependency sharing, module-level caching, and failure isolation.

A practical design starts with a baseline for the existing application. Measure route startup, bundle composition, remote loading, initialization, and user-visible failures. Then set budgets for the shell and each high-traffic slice. Lazy loading only helps if the application doesn't block the critical journey on a long chain of remote modules.

<a id="security-at-the-seams"></a>
### Security at the seams

A remote module isn't automatically safe because it has a separate repository. The shell may execute code it hasn't verified, and a frontend boundary doesn't replace authorization at APIs or token services. [Security-focused micro frontend analysis](https://sylvainleroy.com/2026/07/micro-frontends-on-aws-the-security-review-that-came-too-late/) highlights why trust, signing, integrity checks, and authorization need design attention before teams distribute runtime code.

Version skew creates another class of risk. A fragment may work alone but fail when it meets a different shell version, shared library, design token set, or event payload. [Nx's architecture guidance](https://nx.dev/docs/kb/micro-frontend-architecture) identifies coordination, environment configuration, application efficiency, and reusability as continuing challenges.

> **Architecture doesn't delete coordination. It changes coordination from release meetings into contracts, automation, observability, and governance.**

Teams also need clear ownership for shared dependencies, accessibility reviews, incident response, and rollback decisions. If nobody owns the platform layer, each product team will solve composition differently, and users will experience the resulting inconsistency as one broken application.

<a id="testing-deployment-and-migration-practices"></a>
## Testing Deployment and Migration Practices

Testing must reflect the way the application runs. A fragment that passes its own unit tests can still fail when the shell provides a changed route, an unexpected authentication state, or a different shared dependency.

<a id="build-a-layered-test-system"></a>
### Build a layered test system

Start with isolated tests for each fragment. These tests validate rendering, business rules, keyboard behavior, loading states, and local error handling without requiring the full shell.

Contract tests sit above them. They verify the interface between the shell and a fragment, including mount inputs, route patterns, emitted events, expected payloads, authentication assumptions, and fallback behavior. Contract tests should fail before production if one team changes an interface that another team consumes.

Shell integration tests then load real fragment artifacts in a representative composition. They should cover routing, authentication transitions, shared navigation, loading failures, and version combinations. End-to-end tests belong at the top because they validate complete journeys such as browsing a product, signing in, and completing checkout across several independently delivered slices.

![A diagram illustrating the micro frontend testing pyramid, featuring isolated fragment tests, contract tests, shell integration, and end-to-end journeys.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/5bde6744-3af9-4dbe-b90a-0704c7ee52e7/what-is-a-micro-frontend-testing-pyramid.jpg)

<a id="control-the-release-surface"></a>
### Control the release surface

Use versioned manifests so the shell can identify the exact fragment artifact it loads. A manifest also gives operators a place to pin a known-good version when a remote release causes errors.

Useful controls include:

- **Feature flags:** Activate a new fragment for an internal audience or selected route before broad exposure.
- **Canary delivery:** Direct a limited audience to the new artifact while monitoring browser errors, loading failures, and key business actions.
- **Observable bundles:** Add release identifiers to logs, traces, and client errors so the responsible team can identify the failing fragment.
- **Rollback paths:** Keep the previous compatible artifact available and make reversion an operational action, not a manual rebuild.

Teams should test the shell and fragment together in a production-like environment. A successful local run doesn't prove that a content delivery path, cache, authentication token, or remote manifest will behave correctly for users. [Deployment automation practices](https://capgo.app/blog/deployment-automation/) can support repeatable promotion and rollback workflows, but the architecture still needs clear ownership.

<a id="migrate-one-domain-at-a-time"></a>
### Migrate one domain at a time

A strangler migration routes one capability from the monolith to a new fragment while the rest remains unchanged. A feature toggle can support parallel runs, allowing the team to compare the new path with the existing implementation before making the new route the default.

Consider a commerce application with separate catalog, account, and checkout teams. The shell owns navigation and authentication, the catalog team owns product browsing, the account team owns profile settings, and the checkout team owns cart and payment flows. Each team publishes its own artifact, while contract tests protect route and event agreements.

Start with a low-risk domain, publish it behind a flag, and observe it through real journeys. Expand only after the team can deploy, diagnose, and roll back that slice without asking the entire organization to coordinate a release.

<a id="using-micro-frontends-in-capacitor-and-electron"></a>
## Using Micro Frontends in Capacitor and Electron

A Capacitor or Electron application adds another shell around the browser shell. Capacitor places web code inside a native mobile WebView, while Electron runs web code in a desktop renderer process. In both cases, the app can load a local shell that fetches selected frontend artifacts at runtime instead of embedding every interface change in the native binary.

That arrangement creates a useful release split. Native capabilities, permissions, and bridge code remain tied to the installed application, while web-owned surfaces such as account, help, catalog, or settings can follow a separate delivery path. The shell still needs to decide where fragments come from, which version is approved, and what the application should do if a fetch or verification step fails.

<a id="live-updates-and-rollback"></a>
### Live updates and rollback

A live-update system must treat frontend artifacts as releaseable software. It should deliver **signed bundles**, verify them before activation, support release channels for staged rollouts, apply updates on the next launch rather than interrupting an active session, and provide automatic rollback protection with atomic reversion.

Those controls map naturally to micro frontend delivery. A mobile or desktop shell can pin a manifest, fetch a compatible fragment, verify its signature, and activate it only when the complete bundle is available. If the next launch detects a failure, the updater can revert to the prior known-good state rather than leaving users with a partially updated interface.

Capgo is one option for this delivery model. Its live-update platform for CapacitorJS and Electron apps publishes signed web bundles, supports targeted channels, applies updates on next launch, and provides logs, version history, adoption and failure metrics, rollback protection, CI/CD integrations, and an API. Teams considering the native bridge should also understand [how Capacitor connects web and native code](https://capgo.app/blog/how-capacitor-bridges-web-and-native-code/).

![A diagram illustrating how to use micro frontends with Capacitor or Electron native app shells.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/b955fe4f-6d6e-4ce7-aa2e-23682fc31225/what-is-a-micro-frontend-micro-frontends-architecture.jpg)

<a id="what-changes-in-a-native-shell"></a>
### What changes in a native shell

The native wrapper introduces constraints that a browser-only application may not face:

- **Connectivity:** A fragment may be unavailable when the device is offline, so the shell needs cached artifacts or a local fallback.
- **Compatibility:** A web bundle may depend on native bridge behavior that the installed binary doesn't support.
- **Security:** Remote code must be authenticated, integrity-checked, and authorized for the application context.
- **Recovery:** The shell must be able to reject an invalid bundle and restore a working version without requiring immediate store distribution.
- **Session safety:** Updating during a payment or form flow can create inconsistent state, so next-launch activation is safer than interrupting active work.

This model strengthens rollback when the delivery platform offers atomic activation and detailed release metrics. It complicates the architecture when teams assume that web independence eliminates native compatibility planning. The native shell remains a contract boundary, and every fragment must respect it.

<a id="when-to-choose-micro-frontends"></a>
## When to Choose Micro Frontends

Choose micro frontends when **independent deployment is a real requirement**, several squads own clearly separated product surfaces, or legacy and new interfaces must coexist during a long migration. Technology diversity can also justify the pattern when teams need framework boundaries that a single build cannot accommodate cleanly.

Avoid it when a small team can comfortably own one frontend, when domains share extensive mutable state, or when your organization lacks reliable CI, observability, contract testing, and rollback procedures. A distributed interface without those foundations doesn't create autonomy. It creates more places for failures to hide.

Use a simple starting test:

- **Ownership:** Can one team make decisions for the proposed slice?
- **Boundary:** Can the shell and slice communicate through a stable contract?
- **Release need:** Does the team need to deploy independently?
- **Operational readiness:** Can you monitor, test, pin, and roll back the fragment?
- **User value:** Will the split improve delivery without damaging performance or consistency?

Begin with a low-risk area such as help content or settings. Define the mount contract, route ownership, events, design tokens, fallback behavior, and version policy. Ship behind a feature flag, measure the added bundle and loading cost, and document every new channel, manifest, dependency rule, and rollback path.

Micro frontends are a tool for organizational and release independence, not an automatic improvement to frontend quality. If the release problem is small, a modular monolith may be the better answer. If the coordination problem is large and persistent, a carefully governed micro frontend architecture can give teams the autonomy they need.

---

If you're evaluating micro frontends for a Capacitor or Electron product, [Capgo](https://capgo.app) can help you deliver signed web bundles through controlled channels, activate updates on the next launch, and recover through rollback protection. Visit Capgo to review its delivery, observability, and API options before you design your fragment release process.
