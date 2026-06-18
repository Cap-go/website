---
slug: yarn-clear-cache
title: 'How to Yarn Clear Cache: A Guide for V1, Berry, and CI/CD'
description: >-
  Learn how to yarn clear cache for v1 and Berry (v2+). Fix broken builds with
  step-by-step commands, CI/CD best practices, and troubleshooting tips.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-06-17T08:37:56.714Z
updated_at: 2026-06-18T14:21:30.000Z
head_image: /blog-images/yarn-clear-cache.webp
head_image_alt: >-
  'How to Yarn Clear Cache: A Guide for V1, Berry, and CI/CD' Capgo blog
  illustration
keywords: 'yarn clear cache, yarn cache, yarn berry, node.js, ci/cd'
tag: 'Mobile, Tutorial, CI/CD'
published: true
locale: en
next_blog: ''
---
You run `yarn install`, and the dependency you just updated still resolves to the old build. Or your laptop installs fine while CI suddenly fails after a harmless lockfile change. Or Docker rebuilds drag on, even though you're “using cache.”

That's usually when people search for **Yarn clear cache** and paste the first command they find.

Sometimes that works. Sometimes it fixes nothing. The reason is simple: Yarn's cache behavior depends heavily on which Yarn you're running, and the difference between **Yarn Classic v1** and **Yarn Berry v2+** is big enough to change both the right command and the right troubleshooting strategy.

Most guides stop at `yarn cache clean`. That's only the start. What matters is the cache scope, whether your project uses a local cache or a shared one, and whether your real problem is even the cache at all. In CI and Docker, a bad caching strategy often causes more pain than stale package archives.

<a id="your-build-is-broken-and-yarn-cache-might-be-the-culprit"></a>

## Table of Contents
- [Your Build Is Broken and Yarn Cache Might Be the Culprit](#your-build-is-broken-and-yarn-cache-might-be-the-culprit)
- [When and Why to Clear Your Yarn Cache](#when-and-why-to-clear-your-yarn-cache)
  - [The symptoms that point to cache trouble](#the-symptoms-that-point-to-cache-trouble)
  - [When not to reach for Yarn clear cache](#when-not-to-reach-for-yarn-clear-cache)
- [Clearing the Cache in Yarn Classic v1](#clearing-the-cache-in-yarn-classic-v1)
  - [What the command actually removes](#what-the-command-actually-removes)
  - [How to verify the cache location](#how-to-verify-the-cache-location)
- [Modern Cache Management in Yarn Berry v2+](#modern-cache-management-in-yarn-berry-v2)
  - [Berry changed the cache model](#berry-changed-the-cache-model)
  - [The commands that matter in Berry](#the-commands-that-matter-in-berry)
- [Yarn Cache Best Practices for CI/CD and Docker](#yarn-cache-best-practices-for-cicd-and-docker)
  - [Why clearing cache in pipelines is often the wrong move](#why-clearing-cache-in-pipelines-is-often-the-wrong-move)
  - [A better CI and Docker approach](#a-better-ci-and-docker-approach)
- [Troubleshooting Common Yarn Cache Errors](#troubleshooting-common-yarn-cache-errors)
  - [When a targeted clean still leaves stale packages behind](#when-a-targeted-clean-still-leaves-stale-packages-behind)
  - [Permission and environment problems that look like cache issues](#permission-and-environment-problems-that-look-like-cache-issues)
- [Frequently Asked Questions About Clearing the Yarn Cache](#frequently-asked-questions-about-clearing-the-yarn-cache)
  - [Is it safe to clear the Yarn cache](#is-it-safe-to-clear-the-yarn-cache)
  - [How often should you do it](#how-often-should-you-do-it)
  - [Will it affect production builds](#will-it-affect-production-builds)
  - [What's the simplest practical rule to follow](#whats-the-simplest-practical-rule-to-follow)

## Your Build Is Broken and Yarn Cache Might Be the Culprit

A familiar pattern looks like this. You bump a package, pull fresh changes, and run install again. The command completes, but the app still behaves like the old dependency is present. Then someone suggests clearing the cache, and now you're wondering whether that's a real fix or just superstition.

It can be a real fix. It can also be a distraction.

Cache problems usually show up in a few predictable ways. A local package won't refresh. CI pulls something unexpected. A fresh branch behaves differently from the main branch even though the lockfile says everything should match. If you're already chasing broader pipeline instability, it helps to pair cache debugging with a more systematic build review, like this guide on [fixing build failures in Capacitor CI/CD pipelines](https://capgo.app/blog/fixing-build-failures-in-capacitor-ci-cd-pipelines/).

> **Practical rule:** Treat Yarn clear cache as a diagnostic tool, not a maintenance ritual.

The tricky part is that Yarn changed its cache model over time. In older projects, the cache is shared globally. In newer projects, cache cleanup can be local to the project, global, or both, depending on the command flags. So when a teammate says “just clear Yarn cache,” the first question should be: **which Yarn?**

That's why a good cache fix starts with context. Local machine or CI runner. Yarn v1 or Berry. Shared cache or project cache. Once you know that, the command becomes precise instead of hopeful.

<a id="when-and-why-to-clear-your-yarn-cache"></a>
## When and Why to Clear Your Yarn Cache

Clearing Yarn cache makes sense when you have a specific failure mode in mind. It's most useful when you need to remove stale package artifacts, recover from a broken download state, or deliberately wipe stored packages so Yarn rebuilds from scratch.

![An infographic titled Yarn Cache: When & Why to Clear, outlining three reasons to clear and three benefits.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/1168961e-7ddd-453f-85d7-fee2453cdbcf/yarn-clear-cache-infographic.jpg)

<a id="the-symptoms-that-point-to-cache-trouble"></a>
### The symptoms that point to cache trouble

Some cases are strong cache candidates:

- **A dependency refuses to update:** You changed the version, or rebuilt a local package, but installs still pull an older artifact.
- **Installs fail in a way that feels stateful:** One machine works, another doesn't, and rerunning the same command keeps reproducing the same bad result.
- **You need to reclaim local disk space:** This matters more on developer machines than in short-lived CI environments.

Other situations only look like cache trouble. If your lockfile changed unexpectedly, if a workspace setup is inconsistent, or if a Docker build invalidates the wrong layer, clearing cache won't address the root cause. Teams working on app builds often run into this while juggling native tooling, JavaScript dependencies, and plugin updates. In that context, this practical overview of [managing dependencies in Capacitor projects](https://capgo.app/blog/managing-dependencies-in-capacitor-projects/) is worth keeping nearby.

If your goal is broader machine cleanup rather than package troubleshooting, a system-level guide can help too. Mac developers who want to [clean app caches for Mac users](https://crufti.app/blog/how-to-clear-app-cache-on-mac) often discover that package managers are only one part of the storage picture.

<a id="when-not-to-reach-for-yarn-clear-cache"></a>
### When not to reach for Yarn clear cache

Don't use Yarn clear cache as your first response to every install problem.

Use it when there's evidence of stale or corrupted package state. Skip it when the problem is more likely to be:

| Situation | Better first move |
|---|---|
| Lockfile drift | Review `yarn.lock` changes and reinstall consistently |
| Workspace resolution problems | Check workspace config and install behavior |
| Docker rebuild slowness | Review layer ordering and cache persistence |
| CI mismatch | Verify which directories are actually restored |

> If the install is wrong because the environment is wrong, clearing the cache only makes the next wrong install slower.

That distinction saves time. A lot of wasted debugging comes from treating cache like a magic reset button.

<a id="clearing-the-cache-in-yarn-classic-v1"></a>
## Clearing the Cache in Yarn Classic v1

Yarn Classic behaves the way many developers still assume all Yarn versions behave. It uses a **global cache** in the user directory, and `yarn cache clean` clears that shared cache. Yarn Classic's own documentation describes it that way, and notes that the cache is repopulated on the next `yarn` or `yarn install` run in the user directory model documented in [the Yarn Classic cache CLI docs](https://classic.yarnpkg.com/lang/en/docs/cli/cache/).

![A close-up view of a dusty, vintage computer keyboard sitting on a light wooden desk surface.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/c0b80353-9b00-4131-b9da-ddcfd1d0f7a9/yarn-clear-cache-vintage-keyboard.jpg)

<a id="what-the-command-actually-removes"></a>
### What the command actually removes

For Yarn v1, the default cleanup command is straightforward:

> `yarn cache clean`

That command wipes the shared cache, not just the current project. If you work across several repositories on the same machine, that matters. The next install in any of them may need to fetch packages again.

This shared-cache design is one reason Yarn v1 can produce confusing cross-project behavior. A stale artifact in the global cache can survive long enough to affect different repos, especially when local package development is involved.

A practical sequence for Yarn Classic usually looks like this:

1. **Run the clean command first:** `yarn cache clean`
2. **Remove local install artifacts if needed:** `node_modules` is often the next candidate when state still looks inconsistent.
3. **Reinstall from scratch:** Run `yarn install` again and confirm the dependency graph resolves as expected.

<a id="how-to-verify-the-cache-location"></a>
### How to verify the cache location

When you want to inspect or remove the cache directory directly, Yarn Classic gives you the path:

> `yarn cache dir`

That's useful when the CLI command doesn't appear to fix the issue, or when you need to confirm which user account owns the cache directory in a shared or containerized environment.

If you're working in an older toolchain and trying to keep local setup predictable, this walkthrough on [installing Capacitor CLI step by step](https://capgo.app/blog/installing-capacitor-cli-step-by-step-guide/) pairs well with a clean dependency reset.

> A manual cache inspection is often more valuable than a second blind cleanup command.

For v1 projects, the mental model is simple. One shared cache, one broad cleanup command, and the next install repopulates what you removed.

<a id="modern-cache-management-in-yarn-berry-v2"></a>
## Modern Cache Management in Yarn Berry v2+

Yarn Berry changed the conversation. If you're used to Yarn v1, the biggest adjustment is that cache cleanup is no longer just “wipe the global store and try again.” Berry supports more precise control, which is useful once you know what you're targeting.

![A comparison chart showing the key differences between Yarn Classic and Yarn Berry dependency management systems.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/9a078657-235e-4f6d-89b6-d621264d730c/yarn-clear-cache-yarn-comparison.jpg)

<a id="berry-changed-the-cache-model"></a>
### Berry changed the cache model

In modern Yarn, cache behavior is tied much more closely to the project itself. That fits Berry's broader approach around project-level control, Plug'n'Play, and workflows where dependencies can live alongside the repo rather than in a single machine-wide cache model.

That's why old advice can mislead you. A teammate who learned Yarn on v1 may expect one command to purge everything globally. In Berry, you need to think in terms of **scope**.

If you're dealing with different build outputs across mobile and web pipelines, that same scope mindset applies outside package management too. This comparison of [types of builds](https://capgo.app/blog/types-of-builds/) is a useful reminder that environment assumptions tend to leak into debugging.

Here's a quick visual explainer before the command details:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/L4gNYmlPCc4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="the-commands-that-matter-in-berry"></a>
### The commands that matter in Berry

Modern Yarn documents `yarn cache clean` as removing **shared cache files**, and it exposes two important switches in [the current Yarn cache clean command reference](https://yarnpkg.com/cli/cache/clean):

- **`yarn cache clean`** removes Yarn's shared cache files.
- **`yarn cache clean --mirror`** clears the global cache instead of the local project cache.
- **`yarn cache clean --all`** removes both the global cache files and the current project's local cache files.

That gives you a more intentional workflow than Yarn v1.

| Goal | Command |
|---|---|
| Clean the default shared cache scope | `yarn cache clean` |
| Target the global mirror cache | `yarn cache clean --mirror` |
| Do a full reset across local and global cache files | `yarn cache clean --all` |

Use `--all` when you want the closest equivalent to “start over completely.” Use `--mirror` when you know the issue sits in the global cache layer and don't want to wipe everything in the project.

> **Decision point:** In Berry, choosing the wrong scope is one of the main reasons a cache clean appears to “do nothing.”

That's the practical difference. Yarn Classic was broad by default. Berry is explicit by design.

<a id="yarn-cache-best-practices-for-cicd-and-docker"></a>
## Yarn Cache Best Practices for CI/CD and Docker

In CI/CD, blindly clearing the Yarn cache is usually a mistake. It feels safe because it removes state, but it often removes the very state your pipeline depends on for speed and repeatability.

The more useful question is this: **what exactly are you caching, and what exactly are you restoring?**

![A four-step diagram illustrating the Yarn cache workflow for CI/CD and Docker build processes.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/d153f165-7bff-4e0b-bae6-2a88d1a768c5/yarn-clear-cache-workflow-diagram.jpg)

<a id="why-clearing-cache-in-pipelines-is-often-the-wrong-move"></a>
### Why clearing cache in pipelines is often the wrong move

A CircleCI discussion captured a failure pattern many teams hit in real projects. Slow installs weren't fixed by cache cleanup because the bottleneck wasn't stale package archives. It was fetch and link behavior, cache-directory mismatch, and missing `node_modules` paths in the cached set, as described in that [CircleCI Yarn caching thread](https://discuss.circleci.com/t/yarn-cached-install-slow/34823).

That matters because CI systems often hide the underlying cause behind one vague symptom: “install is slow” or “dependency step is flaky.” Developers then clear cache, rerun, and get no meaningful improvement.

Common pipeline mistakes include:

- **Caching the wrong directory:** The restore step completes, but Yarn doesn't use the restored location.
- **Ignoring workspace paths:** Root dependencies may restore while workspace install work still has to be relinked.
- **Building Docker layers in the wrong order:** A source code copy invalidates the dependency layer, so package installation reruns every time.

> In CI, a cache miss caused by bad configuration looks a lot like a corrupt cache.

If you're building mobile apps in automated environments, this is also where release tooling enters the picture. Teams often combine GitHub Actions or CircleCI with distribution and update systems. One option in that broader workflow is [Capgo's CI/CD setup for Capacitor apps](https://capgo.app/blog/setting-up-cicd-for-capacitor-apps/), alongside your package-manager and build-cache strategy.

<a id="a-better-ci-and-docker-approach"></a>
### A better CI and Docker approach

Use cache invalidation deliberately, not emotionally.

For CI, a reliable pattern looks like this:

1. **Cache based on dependency state:** Tie cache keys to `yarn.lock` and relevant Yarn config files.
2. **Restore before install:** Make sure the restored paths match the paths Yarn will use in that environment.
3. **Install consistently:** In immutable setups, use the install mode that enforces lockfile correctness.
4. **Invalidate on real changes:** A Yarn version change, lockfile update, or cache-path change is a good reason to rebuild cache.

For Docker, the principles are similar:

- **Copy dependency manifests first:** Keep the dependency install layer separate from application source when possible.
- **Avoid unnecessary cleanup in the image build:** Deleting cache inside the same build often removes useful layer reuse.
- **Be explicit about user ownership:** Cache directories created by root can create later install failures for a non-root runtime user.

A short decision table helps:

| Scenario | Better action than `yarn cache clean` |
|---|---|
| CI install is slow after restore | Verify cache path and restore order |
| Workspaces still relink heavily | Cache the relevant workspace install artifacts |
| Docker rebuild reruns installs | Reorder layers around dependency files |
| One bad build after dependency change | Invalidate the cache key, then rebuild cleanly |

Use Yarn clear cache in CI only when you've confirmed stale cache content is the actual problem. Most of the time, the fix is better cache design.

<a id="troubleshooting-common-yarn-cache-errors"></a>
## Troubleshooting Common Yarn Cache Errors

The most frustrating cache bug is the one that survives a cache clean. You run a targeted cleanup, reinstall, and Yarn still pulls the old package. At that point, it's tempting to assume the registry is wrong or the lockfile is haunted.

A documented historical issue in Yarn shows why that happens. Developers reported that `yarn cache clean <package-name>` could leave an old copy behind in `cache/.tmp`, which meant installs kept using the stale version until that temporary directory was removed or a full cleanup was run, as discussed in [the Yarn issue about stale cache artifacts in `.tmp`](https://github.com/yarnpkg/yarn/issues/5357).

<a id="when-a-targeted-clean-still-leaves-stale-packages-behind"></a>
### When a targeted clean still leaves stale packages behind

The lesson is simple. **Partial clean is not always enough.**

If you suspect version staleness rather than broad corruption, use this order:

- **Start with the obvious check:** Confirm you're debugging the expected package version and source.
- **Don't trust a package-specific clean too much:** Targeted cleanup can leave temporary artifacts behind.
- **Escalate to a full cache wipe:** If the stale version persists, clean the broader cache scope.
- **Inspect temp cache paths manually:** In older setups, `cache/.tmp` can be the missing piece.

> When a package keeps resolving to an old artifact, temporary cache files are often the first place I'd inspect after a failed targeted clean.

<a id="permission-and-environment-problems-that-look-like-cache-issues"></a>
### Permission and environment problems that look like cache issues

Not every “cache error” is a cache-content problem.

In Docker, multi-user Linux systems, or CI runners, you can hit permission failures because the cache directory is owned by a different user than the process running Yarn. In that case, clearing cache won't help until the ownership problem is fixed. The practical move is to run Yarn as the correct user, or repair directory ownership before reinstalling.

That kind of issue often presents like stale cache because installs fail inconsistently across environments. The fix is operational, not package-related.

<a id="frequently-asked-questions-about-clearing-the-yarn-cache"></a>
## Frequently Asked Questions About Clearing the Yarn Cache

<a id="is-it-safe-to-clear-the-yarn-cache"></a>
### Is it safe to clear the Yarn cache

Yes. In normal development, it's a safe operation because you're removing cached package artifacts, not deleting your application source. Yarn can fetch what it needs again on the next install.

The trade-off is time. A clean cache means the next install may need to download or rebuild more than usual.

<a id="how-often-should-you-do-it"></a>
### How often should you do it

Only when you have a reason.

Yarn clear cache shouldn't be routine maintenance on a healthy project. If you put it into every workflow by habit, you'll slow down local installs and undermine CI caching. Use it when dependencies are stale, installs look corrupted, or you need a deliberate reset during debugging.

<a id="will-it-affect-production-builds"></a>
### Will it affect production builds

Not directly. Clearing your local or CI cache doesn't change the application code you've committed.

What it does change is the environment that prepares the build. If your production pipeline depends on cached install artifacts, clearing them can make builds slower or expose hidden reproducibility problems. That's useful during troubleshooting, but it's not something to sprinkle into release scripts without a reason.

<a id="whats-the-simplest-practical-rule-to-follow"></a>
### What's the simplest practical rule to follow

Use the smallest cleanup that matches the problem.

For local debugging, start with the cache scope Yarn uses in that project. For CI and Docker, fix cache design before you start wiping caches. And when a package-specific clean doesn't work, assume temporary artifacts or environment mismatch before assuming Yarn is broken.

---

If your team ships Capacitor apps and needs a cleaner release pipeline after dependency or build issues, [Capgo](https://capgo.app) is one option for delivering JavaScript and asset updates without waiting for store review, while keeping your build and rollout process separate from package-cache troubleshooting.
