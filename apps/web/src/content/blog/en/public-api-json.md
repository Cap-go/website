---
slug: public-api-json
title: Capgo Public API JSON Reference Guide
description: 'Complete Capgo public API JSON reference for automating CapacitorJS updates. Covers schemas, authentication, channels, and CI/CD integration patterns.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-09-30T07:30:58.555Z
updated_at: 2026-09-30T07:33:35.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/d38bbe1d-16ca-4f70-856a-0e8ef624c177/public-api-json-api-guide.jpg'
head_image_alt: Capgo Public API JSON Reference Guide
keywords: 'public api json, CapacitorJS updates, API automation, JSON schema, live updates'
tag: 'Mobile, Updates, Capacitor'
published: true
locale: en
next_blog: ''
---
A **public API JSON** interface lets software exchange structured data through HTTP requests and responses. Capgo's typed, RESTful API gives CapacitorJS and Electron teams programmatic control over live updates, channels, bundles, and device delivery.

## Table of Contents
- [Understanding Capgo Public API JSON Fundamentals](#understanding-capgo-public-api-json-fundamentals)
  - [What the Interface Controls](#what-the-interface-controls)
  - [Why Typed JSON Helps](#why-typed-json-helps)

<a id="understanding-capgo-public-api-json-fundamentals"></a>
## Understanding Capgo Public API JSON Fundamentals

Capgo isn't a general-purpose data directory. Its public API JSON interface connects your build system with Capgo's cloud delivery service, so release automation can publish and direct signed web bundles without waiting for App Store or Play review. REST uses familiar HTTP methods such as **GET, POST, PUT, PATCH, and DELETE**, with JSON commonly serving as the response format, as explained in this [REST API guide from Postman](https://blog.postman.com/rest-api-examples/).

![A woman working on a laptop at a desk with a plant, coffee mug, and notebook.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/06511795-a681-4574-9ee3-1544db9994f6/public-api-json-woman-laptop.jpg)

For Capgo, JSON is the shared language between automation scripts, CI/CD jobs, TypeScript clients, and the delivery platform. That consistency makes payloads readable in logs and straightforward to validate before a deployment starts.

<a id="what-the-interface-controls"></a>
### What the Interface Controls

Use the public API JSON endpoints to manage operational release resources, including:

- **Bundles**, the web assets and metadata that make up a deployable update.
- **Channels**, such as staging, beta, production, or customer-specific release streams.
- **Versions**, which identify and track the builds assigned to those channels.
- **Device targeting**, which helps direct releases to selected platforms, app versions, operating systems, or metadata groups.
- **Observability data**, including adoption, failures, rollback activity, and per-device status.

A typical request follows a predictable sequence. Your pipeline creates or prepares a bundle, sends JSON metadata to Capgo, checks the returned status, and then assigns the release to an appropriate channel. A later query can confirm which devices received the update.

> **Key idea:** Treat Capgo JSON as a release-control contract, not merely a data format. Every field should support publishing, targeting, monitoring, or recovering an application update.

<a id="why-typed-json-helps"></a>
### Why Typed JSON Helps

Typed payloads reduce ambiguity in TypeScript codebases. A version identifier should remain a string, a rollout flag should remain a Boolean, and a device count should remain numeric. Before connecting automation, define interfaces for requests and responses, then validate required fields and nullable values.

Read also: [Learn more about using TypeScript with APIs](https://capgo.app/blog/api-in-typescript/).

Keep three habits in every integration:

1. **Inspect status codes and response bodies together**, because HTTP success alone may not describe deployment completion.
2. **Preserve returned identifiers**, especially bundle, version, and channel IDs, for subsequent calls.
3. **Log safely**, excluding API keys and sensitive device data.

The following reference sections use this foundation to explain authentication, upload payloads, channel schemas, targeting queries, and error objects. For current endpoint names and field definitions, verify Capgo's documentation at [capgo.app](https://capgo.app).

{
  "authorization": "Bearer YOUR_CAPGO_API_KEY",
  "contentType": "application/json",
  "accept": "application/json"
}

{
  "success": true,
  "bundleId": "com.example.field-app",
  "version": "2.4.0",
  "status": "uploaded",
  "bundleUuid": "generated-bundle-identifier",
  "createdAt": "2026-01-15T10:30:00Z"
}

{
  "defaultVersion": "2.4.3",
  "autoUpdate": true,
  "rollbackProtection": {
    "enabled": true,
    "fallbackVersion": "2.4.2"
  }
}

{
  "data": [
    {
      "timestamp": "2026-02-04T09:00:00Z",
      "installs": 842,
      "rollbacks": 3,
      "errors": 11
    },
    {
      "timestamp": "2026-02-04T10:00:00Z",
      "installs": 1276,
      "rollbacks": 2,
      "errors": 8
    }
  ],
  "summary": {
    "totalInstalls": 2118,
    "totalRollbacks": 5,
    "totalErrors": 19
  }
}

{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'version' field is required",
    "field": "version",
    "details": {
      "expected": "string",
      "received": "null"
    }
  }
}

{
  "version": "2.4.0",
  "checksum": "sha256-value",
  "encryption": true,
  "externalUrl": "https://storage.example/bundle.zip"
}
