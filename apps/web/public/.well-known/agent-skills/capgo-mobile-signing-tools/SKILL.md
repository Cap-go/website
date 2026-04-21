---
name: capgo-mobile-signing-tools
description: Use Capgo's browser-based signing tools to generate iOS CSRs, create Android keystores, and capture iPhone or iPad UDIDs.
---

# Capgo Mobile Signing Tools

Use this skill when a developer needs release-signing artifacts quickly from the browser.

## Tools

- iOS certificate generator: https://capgo.app/tools/ios-certificate-generator/
- Android keystore generator: https://capgo.app/tools/android-keystore-generator/
- iOS UDID finder: https://capgo.app/tools/ios-udid-finder/
- Overview page: https://capgo.app/tools/

## API endpoints

Base URL: `https://capgo.app`

- `POST /api/tools/ios-certificate-generator`
- `POST /api/tools/android-keystore-generator`
- `GET /api/tools/ios-udid-finder/profile`
- `GET /api/tools/ios-udid-finder/result`

## Outputs

- The iOS tool returns a CSR and a PEM private key.
- The Android tool returns a PKCS#12 keystore, certificate PEM, and fingerprints.
- The UDID flow installs a lightweight Apple profile and then exposes the captured device payload in the browser session.

## Working rules

- Use the browser UI when a human needs to download or install a profile.
- Use the JSON endpoints for automation where browser interaction is not required.
- Keep generated private keys and keystores out of source control.
