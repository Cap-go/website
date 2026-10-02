---
slug: public-api-list
title: 'Capgo Public API List: Complete Developer Reference'
description: 'Access the complete Capgo public API list with endpoint details, authentication methods, request examples, and integration guides for CapacitorJS live updates.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-10-02T08:59:43.850Z
updated_at: 2026-10-02T08:59:45.292Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/22d99b55-30c3-4cac-af1d-78930e67b10e/public-api-list-api-reference.jpg'
head_image_alt: 'Capgo Public API List: Complete Developer Reference'
keywords: 'Capgo, public api list, Capacitor, mobile api, live updates'
tag: 'Mobile, Updates, Capacitor'
published: true
locale: en
next_blog: ''
---
You're probably looking at a deployment pipeline that works manually but becomes fragile as soon as the team needs repeatable releases. A developer creates a bundle, uploads it from a laptop, checks a dashboard, moves a channel, and then waits for adoption data. That process might survive a small project, but it creates avoidable risk when several apps, environments, and deployment jobs share the same infrastructure.

A useful public API list should answer more than “which endpoints exist?” It should show how authentication, resource identifiers, release state, quotas, headers, retries, and batch workflows fit together. This guide approaches the Capgo API from that operational perspective, with patterns that apply to Capacitor teams building CI/CD automation rather than isolated test requests.

## Table of Contents
- [Understanding Capgo API Authentication](#understanding-capgo-api-authentication)
  - [Separate identity from authorization](#separate-identity-from-authorization)
- [Generating Your API Credentials](#generating-your-api-credentials)
  - [Create a key with a purpose](#create-a-key-with-a-purpose)
  - [Rotate without creating an outage](#rotate-without-creating-an-outage)
- [Core Endpoints for App Management](#core-endpoints-for-app-management)
  - [Build an identifier-first workflow](#build-an-identifier-first-workflow)
- [Creating and Managing Releases](#creating-and-managing-releases)
  - [Prepare the release payload](#prepare-the-release-payload)
  - [Make retries safe](#make-retries-safe)
- [Channel Strategy and Rollout Patterns](#channel-strategy-and-rollout-patterns)
- [Monitoring and Diagnostics Endpoints](#monitoring-and-diagnostics-endpoints)
  - [Query narrowly before aggregating](#query-narrowly-before-aggregating)
  - [Connect diagnostics to automation](#connect-diagnostics-to-automation)
- [Rate Limiting and Security Headers](#rate-limiting-and-security-headers)
  - [Protect the management surface](#protect-the-management-surface)
- [Troubleshooting Common API Errors](#troubleshooting-common-api-errors)
  - [Authentication failures](#authentication-failures)
  - [Invalid request bodies](#invalid-request-bodies)
  - [Throttling and ambiguous mutations](#throttling-and-ambiguous-mutations)

<a id="understanding-capgo-api-authentication"></a>
## Understanding Capgo API Authentication

The most common first integration mistake is sending a valid request with the wrong credential format. A key copied from a dashboard isn't automatically a bearer token, and a bearer token isn't useful if the request omits the `Authorization` header or sends it under the wrong scheme. The server then returns an authentication failure before it evaluates the endpoint, payload, or app identifier.

Start by identifying what the current Capgo API documentation calls the credential, then reproduce its example request exactly. In a typical bearer-token request, the authorization header follows this pattern:

`Authorization: Bearer YOUR_TOKEN`

Keep the credential in an environment variable while testing locally. In CI/CD, inject it through the platform's secret store rather than committing it to a repository, placing it in a mobile bundle, or adding it to a query string. A mobile application must not contain a management credential, because anything shipped to a device can eventually be inspected.

![A person typing on a mechanical keyboard while working on a laptop at a white desk.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/d11fefc8-d5c6-4982-904f-fa8860419f2b/public-api-list-keyboard-typing.jpg)

<a id="separate-identity-from-authorization"></a>
### Separate identity from authorization

Authentication answers who is making the request. Authorization answers what that identity can change. Treat those as separate checks when you design a deployment service.

A personal key can be convenient for exploration, but it couples production automation to one person's account. A team-managed key is more appropriate for a shared pipeline, provided the organization can revoke and replace it without interrupting unrelated jobs. Use separate credentials for development, staging, and production workflows where the dashboard and permission model support that separation.

Before calling a release endpoint, test a low-risk read operation. Confirm that:

- **The host is correct:** Use the API base URL documented for the active environment.
- **The header is complete:** Include the required authorization scheme and an `Accept` header for JSON responses.
- **The body is encoded correctly:** Send `Content-Type: application/json` only when the request contains JSON.
- **The scope is sufficient:** A credential that can read app metadata may not be allowed to create or distribute a release.
- **The response is logged safely:** Record status codes and request identifiers, but redact keys, tokens, bundle contents, and sensitive device data.

Public API catalogs have grown from simple directories into operational discovery tools. [ProgrammableWeb's historical account](https://medium.com/@programmableweb/research-shows-interest-in-providing-apis-still-high-c9cb5c680c09) describes a directory that passed **19,000 APIs in January 2018**, after **2,294 new APIs were added in 2017** and an average of more than **2,000 additions per year** since January 2014. That history explains why a modern public API list must help engineers assess integration behavior, not merely find a URL.

For related client-side access-control considerations, see [Capgo app authorization patterns](https://capgo.app/blog/app-authorization/). The same discipline applies here: keep management credentials on trusted servers, define permissions deliberately, and make failed authorization easy to diagnose.

<a id="generating-your-api-credentials"></a>
## Generating Your API Credentials

Credential creation should be treated as an access-management change, not as a casual setup step. The exact dashboard labels may change, so use the current Capgo interface and documentation as the authority, but the workflow remains consistent.

<a id="create-a-key-with-a-purpose"></a>
### Create a key with a purpose

Open the organization or account settings area, locate the API or developer-credentials screen, and choose the action for creating a key. Give the key a name that identifies its job, such as a staging deployment pipeline or a production release worker. Avoid names based only on a person's identity, because ownership becomes unclear when the team changes.

Select the narrowest permissions available for that workflow. A job that only reads deployment status shouldn't receive permission to delete applications or alter channels. If the interface offers organization-level and app-level scope, prefer the smaller boundary that still supports the job.

Copy the secret when the dashboard displays it. Many credential systems show the complete value only during creation. Store it in your CI/CD secret manager, then test retrieval inside the pipeline without printing the value. A local `.env` file can help during development, but it must be excluded from version control and never bundled into a Capacitor web directory.

![Screenshot from https://capgo.app](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/screenshots/154c17b3-54fa-421d-b14d-6c548a75ca8e/public-api-list-capgo-homepage.jpg)

<a id="rotate-without-creating-an-outage"></a>
### Rotate without creating an outage

Maintain an overlap period when rotating a credential. Add the replacement to the secret store, deploy the pipeline configuration that uses it, run a harmless authenticated read, and only then revoke the old key. If the service supports multiple active keys, keep the old value available until every worker and scheduled job has moved.

For a team, record the key owner, purpose, environment, creation date, and revocation procedure in an internal access register. Don't place the secret itself in that register. This makes an incident response practical without turning documentation into another secret repository.

The [UK government API standards](https://www.gov.uk/guidance/gds-api-technical-and-data-standards) recommend designing an OpenAPI document early, validating inputs, rejecting unknown attributes, using TLS 1.2 or above, and applying OAuth 2.0 for access control. Those principles are useful even when the integration uses API keys: define the contract before building automation, reject unexpected input, and treat transport security as essential.

For pipeline storage and rotation patterns, use [Capgo guidance on managing secrets in CI/CD pipelines](https://capgo.app/blog/managing-secrets-in-cicd-pipelines/).

<a id="core-endpoints-for-app-management"></a>
## Core Endpoints for App Management

App management is the control plane for everything that follows. Release creation, channel assignment, bundle distribution, and diagnostics all need a stable application identifier. The practical mistake is to pass a human-readable app name through every job and assume it will remain unique. Resolve the app once, persist the canonical identifier, and use that identifier for subsequent operations.

A production integration should model the app lifecycle around four capabilities:

| Operation | HTTP intent | Integration concern |
|---|---|---|
| List applications | `GET` | Pagination, organization scope, stable identifiers |
| Retrieve one application | `GET` | Configuration version and deployment relationship |
| Update configuration | `PATCH` or the documented update method | Partial changes versus full replacement |
| Delete an application | `DELETE` | Irreversible action, approval and audit controls |

Don't invent endpoint paths from a blog post or an old SDK. Read the current machine-readable definition and generate a typed client or request wrapper from that contract. The [OpenAPI Specification](https://spec.openapis.org/oas/v3.2.1.html) describes a programming-language-independent format for HTTP APIs, allowing people and tools to discover endpoints, authentication, request schemas, responses, and behavior without inspecting source code or network traffic.

<a id="build-an-identifier-first-workflow"></a>
### Build an identifier-first workflow

A deployment worker should perform a read before it performs a mutation:

1. Resolve the organization and application context.
2. Retrieve the app record and confirm it belongs to the expected account.
3. Compare the intended platform and environment with the returned configuration.
4. Store the canonical app identifier in the job state.
5. Submit the release or configuration change using that identifier.
6. Persist the response identifier for later polling and diagnostics.

This sequence prevents a surprisingly expensive class of errors, where a valid key updates the wrong app because a pipeline variable points to an old project. Add an explicit environment assertion, such as requiring a staging job to target the staging app, before allowing a write.

Use response schemas rather than loose JSON access. If the API returns an app object with an identifier, name, status, and configuration fields, validate the fields your job needs and tolerate unrelated additions. Rejecting unknown request attributes protects you from accidentally sending misspelled configuration keys, while tolerant response parsing helps a client survive non-breaking response expansion.

For rollback design, keep app identity separate from release identity. [Capgo's version-control and rollback documentation](https://capgo.app/blog/how-capgo-handles-version-control-and-rollbacks/) is the relevant operational reference. A rollback should select a known-good release or channel state, not recreate an application configuration from memory.

<a id="creating-and-managing-releases"></a>
## Creating and Managing Releases

A production release can fail after the upload succeeds. The artifact may be stored correctly while processing remains incomplete, channel assignment has not happened, or eligible devices have not received the update. Treat the workflow as a sequence of observable state changes, with a durable identifier and a retry plan for every operation.

<a id="prepare-the-release-payload"></a>
### Prepare the release payload

Use the current Capgo schema for property names, request paths, and required fields. A request body copied from a similarly named endpoint can be accepted partially or rejected for an unexpected reason. At a practical level, the payload contains three areas:

- **Application identity:** The application identifier returned by the relevant control-plane operation.
- **Release metadata:** The version, bundle identity, build context, and compatibility information expected by the API.
- **Distribution intent:** The channel or rollout context, when the release operation supports it.

Validate the bundle before sending it. Check that the Capacitor build contains the expected web assets, that its version matches CI metadata, and that the job is not reading a partially written file. Compute a local checksum when the API accepts one. Keep the build URL, commit reference, and server-issued release identifier in the deployment record so later jobs can correlate upload, processing, and distribution events.

A dependable sequence is:

1. Build the application in a clean workspace.
2. Run unit, integration, and platform-specific checks.
3. Create or upload the bundle through the documented release operation.
4. Poll the returned operation or release resource until it reaches a terminal state.
5. Associate the completed release with its intended channel.
6. Check adoption and failure signals before promotion.

An upload response confirms acceptance by the service, not delivery to users. Processing status, device eligibility, connectivity, and channel membership still determine whether an update reaches a device.

<a id="make-retries-safe"></a>
### Make retries safe

A timeout does not reveal whether the server rejected the request or completed it before the connection failed. Resubmitting the same release can therefore create duplicates or conflicting versions. Use an idempotency key when Capgo supports one. Without that facility, query using release metadata or a client-generated build identifier before retrying a mutation.

Batch uploads need item-level state. Put each app variant in a durable queue and record its outcome independently. A worker retry should select only unfinished items, rather than replaying the whole batch after one failure. If a bulk endpoint is available, confirm whether its response includes a result for every item. One aggregate success status can hide a failed variant, while one aggregate error can obscure completed work.

> **Operational rule:** Store the server's release identifier immediately, then reference that identifier for processing checks, channel assignment, and diagnostics.

Rate limits affect both uploads and polling. [API rate-limiting guidance](https://www.geetest.com/en/article/api-rate-limiting) notes that quotas should reflect the action being performed and that clients need usable headers and retry behavior. Apply separate handling to release creation, status polling, searches, and sensitive mutations. A polling loop that retries at upload speed can consume the quota needed for a corrective action.

Read rate-limit headers when they are returned, honor a server-provided retry interval, and use increasing delays when they are absent. Add jitter so multiple CI workers do not retry together. Bound polling, stop at a terminal state, and include the final response body in CI logs after removing credentials and tokens. If someone cancels a deployment, record the actor or automation job, the current release state, and whether the artifact remains available for a later retry.

<a id="channel-strategy-and-rollout-patterns"></a>
## Channel Strategy and Rollout Patterns

Channel design is a release-governance decision, not just a naming exercise. Staging, beta, and production channels serve different audiences and should have different promotion rules. The right choice depends on how much uncertainty remains in the bundle and how quickly the team needs feedback.

| Channel | Audience | What to verify | Promotion decision |
|---|---|---|---|
| **Staging** | Internal devices and test accounts | Installation, migrations, native compatibility, logs | Technical checks pass |
| **Beta** | Selected early-access users | Real-world behavior, support feedback, update adoption | No blocking regressions |
| **Production** | General users | Stability, diagnostics, rollback readiness | Release owner approves |

A staging channel should be deterministic. Assign known test devices or accounts, keep the channel protected from casual changes, and make CI promote only after required checks pass. Beta is useful when production-like traffic matters, but it needs a clear audience definition and a support process for reporting failures. Production should be boring: the release has passed earlier gates, the rollback target is known, and monitoring is already connected.

The API workflow should reflect those boundaries. A pipeline can create the release once, assign it to staging, and promote the same release object after validation. Rebuilding between channels weakens traceability because the artifact tested by the team may not be the artifact distributed to users.

The current public API ecosystem also shows why maintenance matters as much as breadth. [API Tracker](https://apitracker.io/) presents a large catalog of APIs and developer resources, while commentary around public API roundups highlights the maintenance burden created when entries cover finance, government, health, machine learning, weather, and transportation. A channel catalog has the same problem: stale entries and unclear ownership make a large list less useful than a smaller, maintained one.

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/veKk5RA8xSc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

For implementation details around controlled testing, see [Capgo staging environments with channels](https://capgo.app/blog/staging-environments-with-capgo-channels/). The key pattern is to make channel movement an explicit API action with an approval boundary, rather than allowing any build job to write directly to production.

<a id="monitoring-and-diagnostics-endpoints"></a>
## Monitoring and Diagnostics Endpoints

A deployment isn't complete when the API returns a successful response. It is complete when the team can explain which release devices discovered, downloaded, installed, and continued to run successfully. That requires a workflow connecting release identifiers, channel membership, device records, logs, and adoption data.

Start with a correlation record in your deployment system. Store the app identifier, release identifier, channel, commit reference, build metadata, request timestamp, and final API status. When a support report arrives, the operator should be able to move from the affected device to its channel and release without searching through unstructured CI logs.

<a id="query-narrowly-before-aggregating"></a>
### Query narrowly before aggregating

Diagnostic endpoints often support filters for a time range, channel, device, platform, or release. Use the narrowest filter that answers the immediate question. A broad query across an entire installation base is slower, harder to interpret, and more likely to encounter pagination or quota constraints.

A practical investigation sequence is:

- **Release view:** Check whether the intended release exists and reached the target channel.
- **Adoption view:** Compare eligible devices with devices that discovered or installed the update.
- **Failure view:** Group errors by release, platform, device class, and installation stage.
- **Device view:** Inspect logs for a specific device only after the aggregate pattern indicates a local issue.
- **Incident view:** Preserve the raw response and the query parameters used for the investigation.

Don't assume a low adoption signal means the bundle is broken. Devices may be offline, excluded from the channel, running an incompatible version, or waiting for the app's update check. Conversely, a high download count doesn't prove successful startup. Separate discovery, download, installation, and runtime health whenever the API exposes those states.

<a id="connect-diagnostics-to-automation"></a>
### Connect diagnostics to automation

A scheduled worker can query release status and raise an alert when a release remains in a non-terminal state longer than the pipeline allows. Another worker can collect failure records, normalize error codes, and attach them to the deployment ticket. Keep the alert payload concise, with links to the release, channel, and filtered diagnostic query.

Authentication and error handling belong in the same client layer as endpoint calls. The worker should refresh or replace credentials according to the credential policy, classify authorization failures separately from malformed requests, and preserve `429` responses for retry scheduling rather than treating them as generic server errors.

Use pagination cursors or documented offsets exactly as specified. A batch diagnostic job must retain its position between pages and avoid repeatedly requesting the first page. If records can change while a query runs, use a stable time boundary or release filter so the resulting report is reproducible.

<a id="rate-limiting-and-security-headers"></a>
## Rate Limiting and Security Headers

Production clients should inspect response headers before choosing a retry path. Capture `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`, and any documented `RateLimit-*` fields in the API client middleware. Pass them to the retry controller and structured logs. Do not hard-code quotas that may differ by account, endpoint, or operation.

The distinction between **capacity information** and **retry instructions** determines the next request. A remaining-count header shows how close the client is to a limit. `Retry-After` specifies when the server permits another attempt. Honor that instruction when it is present. If the response provides no timing guidance, use bounded exponential backoff with jitter and a fixed attempt limit.

![Rows of server racks in a modern data center with blue cables and blinking status lights.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/012bc8e3-6fd4-4c0a-9fd5-e373e40800fa/public-api-list-server-racks.jpg)

<a id="protect-the-management-surface"></a>
### Protect the management surface

Keep Capgo management requests on a trusted backend or CI runner. A Capacitor application may call a narrow application-facing service, but it should never receive credentials that can modify releases, channels, or organization resources. Enforce TLS, validate bodies, and remove authorization headers from traces and error reports.

Apply separate controls by operation. Cache or coalesce read-only metadata requests where safe. Give uploads, exports, login attempts, and release mutations their own limits. Batch independent metadata reads when the API supports batch operations, then account for the batch's request and item limits rather than assuming one batch costs one unit. Behavior-based controls also help detect distributed abuse patterns, as described in the [rate-limiting security guidance](https://www.geetest.com/en/article/api-rate-limiting).

Use timeouts on every request and distinguish transport failures from HTTP responses. A timeout leaves the mutation's outcome unknown, so query its status before retrying. A `429` response is explicit server feedback, and the client should schedule the next attempt from its headers.

For Capacitor deployments, [Capgo's API rate-limiting guidance for app-store compliance](https://capgo.app/blog/api-rate-limiting-for-app-store-compliance/) provides a relevant operational reference. Keep credentials private, honor server headers, and make retries observable instead of silent.

<a id="troubleshooting-common-api-errors"></a>
## Troubleshooting Common API Errors

Most failures fall into three groups: authentication, validation, and throttling. Diagnose the group before changing code. The response status, structured error body, and relevant headers usually provide enough information to choose the next action.

<a id="authentication-failures"></a>
### Authentication failures

A `401` or equivalent authorization response usually means the credential is missing, malformed, expired, revoked, or sent with the wrong scheme. Check the environment variable inside the actual CI job, not only in the local shell. Confirm that the request includes the exact header format from the current API documentation, then test the credential against a read-only operation.

If the response indicates insufficient permission rather than invalid identity, treat it as an authorization problem. Ask an organization administrator to review the key's scope, app access, and environment. Don't solve a permission error by distributing a broadly privileged personal key.

<a id="invalid-request-bodies"></a>
### Invalid request bodies

A validation response means the server received the request but rejected its structure or values. Compare the payload against the current schema, paying attention to required fields, types, enum values, nested objects, and identifiers. Remove unsupported fields rather than hoping the service will ignore them.

Log a redacted payload and the response's field-level errors. Add schema validation to CI so malformed release metadata fails before an upload begins. If the operation is a partial update, confirm that the endpoint expects a patch-style body instead of a complete replacement.

<a id="throttling-and-ambiguous-mutations"></a>
### Throttling and ambiguous mutations

A `429` means the worker must stop sending requests and follow the server's retry guidance. Honor `Retry-After` when present, apply jitter when calculating a fallback delay, and prevent several concurrent workers from retrying at the same instant.

For a timeout during upload or release creation, don't submit another mutation immediately. Search or retrieve the operation using the client-generated build reference or returned identifier if one was received. If no identifier is available, ask the API's documented support or idempotency mechanism whether the original request completed. This avoids duplicate releases and makes the final deployment record trustworthy.

---

Capgo provides a public REST API for managing app delivery resources, releases, channels, devices, and related deployment workflows, so teams can connect live-update operations to their existing CI/CD and monitoring systems. Review the current [Capgo](https://capgo.app) documentation, create a least-privileged test credential, and validate one complete release and rollback path before automating production promotion.
